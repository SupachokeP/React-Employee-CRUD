import React, { useState, useEffect } from "react";
import "./App.css";
// Component for list employee page
function ListEmployeePage() {
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    employeeID: "",
    email: "",
    status: "",
    firstName: "",
    lastName: "",
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployeesFromDatabase();
  }, [searchCriteria]);

  const loadEmployeesFromDatabase = () => {
    fetch("http://localhost:5219/api/Data/GetEmployee")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error("Error loading employees:", error);
      });
  };

  const handleEditEmployee = (employeeId) => {
    // Find the employee by ID
    const employeeToEdit = employees.find(
      (employee) => employee.employeeID === employeeId
    );
    // Open the add employee form with the data
    setShowAddEmployeeForm({ mode: "edit", data: employeeToEdit });
  };

  const handleDeleteEmployee = (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      // Send DELETE request to the API endpoint
      fetch(`http://localhost:5219/api/Data/DeleteEmployee/${employeeId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            loadEmployeesFromDatabase();
          } else {
            console.error("Failed to delete employee");
            alert("Failed to delete employee");
          }
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          alert("Failed to delete employee");
        });
    }
  };

  const handleAddEmployee = () => {
    // Show add employee form
    setShowAddEmployeeForm(true);
  };
  const [inputValues, setInputValues] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    email: "",
    status: "",
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchCriteria(inputValues);
    loadEmployeesFromDatabase();
  };

  const filterEmployees = (employee) => {
    const { employeeID, email, status, firstName, lastName } = searchCriteria;
    return (
      employee.employeeID.toLowerCase().includes(employeeID.toLowerCase()) &&
      employee.email.toLowerCase().includes(email.toLowerCase()) &&
      (status === "" || employee.status === status) &&
      employee.firstName.toLowerCase().includes(firstName.toLowerCase()) &&
      employee.lastName.toLowerCase().includes(lastName.toLowerCase())
    );
  };

  const filteredEmployees = employees.filter(filterEmployees);

  return (
    <div className="container">
      <h1>List Employee Page</h1>
      <form className="form-container" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="employeeID"
          placeholder="Employee ID"
          value={inputValues.employeeID}
          onChange={handleSearchChange}
          className="form-input"
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={inputValues.firstName}
          onChange={handleSearchChange}
          className="form-input"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={inputValues.lastName}
          onChange={handleSearchChange}
          className="form-input"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={inputValues.email}
          onChange={handleSearchChange}
          className="form-input"
        />
        <select
          name="status"
          value={inputValues.status}
          onChange={handleSearchChange}
          className="form-input"
        >
          <option value="">All</option>
          <option value="Y">Active</option>
          <option value="N">Inactive</option>
        </select>
        <div className="btn-container">
          <button type="submit" className="btn btn-success">
            Submit Search
          </button>
          <button onClick={handleAddEmployee} className="btn btn-success">
            Add Employee
          </button>
        </div>
      </form>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.employeeID}>
              <td>{employee.employeeID}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.status === "Y" ? "Active" : "Inactive"}</td>
              <td>
                <button
                  onClick={() => handleEditEmployee(employee.employeeID)}
                  className="btn btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee.employeeID)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddEmployeeForm && (
        <AddEmployeeForm
          onClose={() => setShowAddEmployeeForm(false)}
          mode={showAddEmployeeForm.mode}
          employeeData={showAddEmployeeForm.data}
          loadEmployeesFromDatabase={loadEmployeesFromDatabase} // Pass the function as prop
        />
      )}
    </div>
  );
}

// Component for add employee form
function AddEmployeeForm({
  onClose,
  mode,
  employeeData,
  loadEmployeesFromDatabase,
}) {
  const [firstName, setFirstName] = useState(employeeData?.firstName || "");
  const [employeeID, setEmployeeID] = useState(employeeData?.employeeID || "");
  const [lastName, setLastName] = useState(employeeData?.lastName || "");
  const [email, setEmail] = useState(employeeData?.email || "");
  const [activeStatus, setActiveStatus] = useState(employeeData?.status || "N");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("You have to complete the form before submit");
      return;
    }
    const generatedEmail = `${firstName.toLowerCase()}.${lastName
      .toLowerCase()
      .slice(0, 2)}@ztest.com`;
    setEmail(generatedEmail);

    // Prepare data object to send to the API
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: generatedEmail,
      status: activeStatus,
      employeeID: employeeID,
    };

    // Send data to the API endpoint
    fetch("http://localhost:5219/api/Data/UpsertEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add employee");
        }
        alert("Employee added successfully");
        loadEmployeesFromDatabase();
        onClose();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        alert("Failed to add employee");
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h1>{mode === "edit" ? "Edit Employee" : "Add Employee"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First name:</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last name:</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              value={email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-check-label">Active status:</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={activeStatus === "Y"}
              onChange={(e) => setActiveStatus(e.target.checked ? "Y" : "N")}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <ListEmployeePage />
    </div>
  );
}

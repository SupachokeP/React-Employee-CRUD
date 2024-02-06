using Microsoft.AspNetCore.Mvc;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Dapper;
namespace Ang_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase 
    {
        
        private static string connectionString = "Server=(localdb)\\localDB1;Database=Agl_Product;Integrated Security=True;";

        protected SqlConnection GetOpenConnection()
        {
            SqlConnection connection = null;
            if (!string.IsNullOrEmpty(connectionString))
            {
                connection = new SqlConnection(connectionString);
                connection.Open();
            }

            return connection;
        }

        [HttpGet("GetEmployee")]
        public async Task<IActionResult> GetProductData()
        {
            try
            {
                using (IDbConnection dbConnection = GetOpenConnection())
                {
                    var data = await dbConnection.QueryAsync<ProductRes>("SELECT * FROM TB_Employee with(nolock)");
                    return Ok(data.ToList());
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching Employee data.");
            }
        }
        [HttpPost("UpsertEmployee")]
        public string UpsertEmployee(ProductRes employee)
        {
            using (IDbConnection dbConnection = GetOpenConnection())
            {
                IDbTransaction transaction = null;
                try
                {
                    transaction = dbConnection.BeginTransaction();
                    int insetUpdateChk = 0;
                    
                    string Query = @"if exists(select * from TB_Employee WITH (NOLOCK) where EmployeeID = @EmployeeId)	
                                begin UPDATE TB_Employee SET FirstName = @FirstName, LastName = @LastName, Status = @Status ,Email = @Email WHERE EmployeeID = @EmployeeId end
                                else 
                                begin INSERT INTO TB_Employee (FirstName, LastName, Email, Status)
                                VALUES (@FirstName, @LastName, @Email, @Status) end ";
                    insetUpdateChk = dbConnection.Execute(Query, employee, transaction);                    
                    if (insetUpdateChk == 0)
                    {
                        transaction?.Rollback();
                    }
                    else
                    {
                        transaction.Commit();
                    }                    

                    return $"Employee Insert/Update successfully";
                }
                catch (Exception ex)
                {
                    transaction?.Rollback();
                    return $"Error upserting Employee: {ex.Message}";
                }
            }
        }
        [HttpDelete("DeleteEmployee/{EmployeeId}")]
        public IActionResult DeleteEmployee(string EmployeeId)
        {
            try
            {
                using (IDbConnection dbConnection = GetOpenConnection())
                {
                    string query = "DELETE FROM TB_Employee WHERE EmployeeID = @EmployeeId";
                    int rowsAffected = dbConnection.Execute(query, new { EmployeeId = EmployeeId });
                    if (rowsAffected == 0)
                    {
                        return NotFound("Employee not found");
                    }
                    return Ok("Employee deleted successfully");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting Employee: {ex.Message}");
            }
        }
       

    }

}

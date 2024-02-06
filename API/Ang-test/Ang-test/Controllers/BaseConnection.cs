
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Ang_test.Controllers
{
    public class BaseConnection
    {
        private static string connectionString ="Server=(localdb)\\localDB1;Database=Agl_Product;Integrated Security=True;";

        protected SqlConnection GetOpenConnection(string ConnName = null)
        {
            SqlConnection connection = null;
            if (!string.IsNullOrEmpty(connectionString))
            {
                connection = new SqlConnection(connectionString);
                connection.Open();
            }

            return connection;
        }
    }
}

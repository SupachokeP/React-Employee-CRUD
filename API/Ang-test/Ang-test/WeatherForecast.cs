namespace Ang_test
{
    public class WeatherForecast
    {
        public DateOnly Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
    public class ProductRes
    {
        public string? EmployeeID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
        public string Status { get; set; }
    }
    public class ProductUpdateModel
    {
        public string Status { get; set; }
        public string ProductId { get; set; }
    }
}

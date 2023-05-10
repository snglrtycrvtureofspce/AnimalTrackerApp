using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LocationsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var query = @"SELECT LocationID, LocationName, LocationDescription, Latitude, Longitude FROM Locations";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    var sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Locations locations)
        {
            var query = @"INSERT INTO Locations VALUES (@LocationName, @LocationDescription, @Latitude, @Longitude)";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@LocationName", locations.LocationName);
                    myCommand.Parameters.AddWithValue("@LocationDescription", locations.LocationDescription);
                    myCommand.Parameters.AddWithValue("@Latitude", locations.Latitude);
                    myCommand.Parameters.AddWithValue("@Longitude", locations.Longitude);
                    var sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Успешно добавлено!");
        }

        [HttpPut]
        public JsonResult Put(Locations locations)
        {
            var query = @"UPDATE Locations SET LocationName=@LocationName, LocationDescription=@LocationDescription, Latitude=@Latitude, Longitude=@Longitude WHERE LocationID=@LocationID";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@LocationID", locations.LocationID);
                    myCommand.Parameters.AddWithValue("@LocationName", locations.LocationName);
                    myCommand.Parameters.AddWithValue("@LocationDescription", locations.LocationDescription);
                    myCommand.Parameters.AddWithValue("@Latitude", locations.Latitude);
                    myCommand.Parameters.AddWithValue("@Longitude", locations.Longitude);
                    var sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Успешно обновлено!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var query = @"DELETE FROM Locations WHERE LocationID=@LocationID";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@LocationID", id);
                    var sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Успешно удалено!");
        }
    }
}

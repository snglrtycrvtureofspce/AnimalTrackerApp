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
            string query = @"SELECT LocationID, LocationName, LocationDescription, Latitude, Longitude FROM Locations";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Locations locations)
        {
            string query = @"INSERT INTO Locations VALUES (@LocationName, @LocationDescription, @Latitude, @Longitude)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@LocationName", locations.LocationName);
                    myCommand.Parameters.AddWithValue("@LocationDescription", locations.LocationDescription);
                    myCommand.Parameters.AddWithValue("@Latitude", locations.Latitude);
                    myCommand.Parameters.AddWithValue("@Longitude", locations.Longitude);
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Added Successfully!");
        }

        [HttpPut]
        public JsonResult Put(Locations locations)
        {
            string query = @"UPDATE Locations SET LocationName=@LocationName, LocationDescription=@LocationDescription, Latitude=@Latitude, Longitude=@Longitude WHERE LocationID=@LocationID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
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
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Updated Successfully!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM Locations WHERE LocationID=@LocationID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@LocationID", id);
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }
    }
}

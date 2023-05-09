using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovementPointsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MovementPointsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT MovementPointID, AnimalID, LocationID, DateTime FROM MovementPoints";
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
        public JsonResult Post(MovementPoints movementPoints)
        {
            string query = @"INSERT INTO MovementPoints VALUES (@AnimalID, @LocationID, @DateTime)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalID", movementPoints.AnimalID);
                    myCommand.Parameters.AddWithValue("@LocationID", movementPoints.LocationID);
                    myCommand.Parameters.AddWithValue("@DateTime", movementPoints.DateTime);
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Added Successfully!");
        }

        [HttpPut]
        public JsonResult Put(MovementPoints movementPoints)
        {
            string query = @"UPDATE MovementPoints SET AnimalID=@AnimalID, LocationID=@LocationID, DateTime=@DateTime WHERE MovementPointID=@MovementPointID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@MovementPointID", movementPoints.MovementPointID);
                    myCommand.Parameters.AddWithValue("@AnimalID", movementPoints.AnimalID);
                    myCommand.Parameters.AddWithValue("@LocationID", movementPoints.LocationID);
                    myCommand.Parameters.AddWithValue("@DateTime", movementPoints.DateTime);
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
            string query = @"DELETE FROM MovementPoints WHERE MovementPointID=@MovementPointID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@MovementPointID", id);
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }
    }
}

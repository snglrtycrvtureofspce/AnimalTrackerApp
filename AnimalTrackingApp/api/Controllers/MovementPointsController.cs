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
            var query = @"SELECT MovementPointID, AnimalID, LocationID, DateTime FROM MovementPoints";
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
        public JsonResult Post(MovementPoints movementPoints)
        {
            var query = @"INSERT INTO MovementPoints VALUES (@AnimalID, @LocationID, @DateTime)";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalID", movementPoints.AnimalID);
                    myCommand.Parameters.AddWithValue("@LocationID", movementPoints.LocationID);
                    myCommand.Parameters.AddWithValue("@DateTime", movementPoints.DateTime);
                    var sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Успешно добавлено!");
        }

        [HttpPut]
        public JsonResult Put(MovementPoints movementPoints)
        {
            var query = @"UPDATE MovementPoints SET AnimalID=@AnimalID, LocationID=@LocationID, DateTime=@DateTime WHERE MovementPointID=@MovementPointID";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@MovementPointID", movementPoints.MovementPointID);
                    myCommand.Parameters.AddWithValue("@AnimalID", movementPoints.AnimalID);
                    myCommand.Parameters.AddWithValue("@LocationID", movementPoints.LocationID);
                    myCommand.Parameters.AddWithValue("@DateTime", movementPoints.DateTime);
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
            var query = @"DELETE FROM MovementPoints WHERE MovementPointID=@MovementPointID";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@MovementPointID", id);
                    var sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Успешно удалено!");
        }
    }
}

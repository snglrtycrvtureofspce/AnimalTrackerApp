using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AnimalsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT AnimalID, AnimalTypeID, AnimalName, AnimalDescription FROM Animals";
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
        public JsonResult Post(Animals animals)
        {
            string query = @"INSERT INTO Animals VALUES (@AnimalTypeID, @AnimalName, @AnimalDescription)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalTypeID", animals.AnimalTypeID);
                    myCommand.Parameters.AddWithValue("@AnimalName", animals.AnimalName);
                    myCommand.Parameters.AddWithValue("@AnimalDescription", animals.AnimalDescription);
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Added Successfully!");
        }

        [HttpPut]
        public JsonResult Put(Animals animals)
        {
            string query = @"UPDATE Animals SET AnimalTypeID=@AnimalTypeID, AnimalName=@AnimalName, AnimalDescription=@AnimalDescription WHERE AnimalID=@AnimalID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalID", animals.AnimalID);
                    myCommand.Parameters.AddWithValue("@AnimalTypeID", animals.AnimalTypeID);
                    myCommand.Parameters.AddWithValue("@AnimalName", animals.AnimalName);
                    myCommand.Parameters.AddWithValue("@AnimalDescription", animals.AnimalDescription);
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
            string query = @"DELETE FROM Animals WHERE AnimalID=@AnimalID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalID", id);
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }
    }
}

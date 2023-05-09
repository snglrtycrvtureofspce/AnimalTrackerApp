using System.Data;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.Data.SqlClient;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalTypesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AnimalTypesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT AnimalTypeID, TypeName, TypeDescription FROM AnimalTypes";
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
        public JsonResult Post(AnimalTypes animalTypes)
        {
            string query = @"INSERT INTO AnimalTypes VALUES (@TypeName, @TypeDescription)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@TypeName", animalTypes.TypeName);
                    myCommand.Parameters.AddWithValue("@TypeDescription", animalTypes.TypeDescription);
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Added Successfully!");
        }

        [HttpPut]
        public JsonResult Put(AnimalTypes animalTypes)
        {
            string query = @"UPDATE AnimalTypes SET TypeName=@TypeName, TypeDescription=@TypeDescription WHERE AnimalTypeID=@AnimalTypeID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalTypeID", animalTypes.AnimalTypeID);
                    myCommand.Parameters.AddWithValue("@TypeName", animalTypes.TypeName);
                    myCommand.Parameters.AddWithValue("@TypeDescription", animalTypes.TypeDescription);
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
            string query = @"DELETE FROM AnimalTypes WHERE AnimalTypeID=@AnimalTypeID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalTypeID", id);
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }
    }
}

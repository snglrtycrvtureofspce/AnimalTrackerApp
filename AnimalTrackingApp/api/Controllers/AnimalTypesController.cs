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
            var query = @"SELECT AnimalTypeID, TypeName, TypeDescription FROM AnimalTypes";
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
        public JsonResult Post(AnimalTypes animalTypes)
        {
            var query = @"INSERT INTO AnimalTypes VALUES (@TypeName, @TypeDescription)";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@TypeName", animalTypes.TypeName);
                    myCommand.Parameters.AddWithValue("@TypeDescription", animalTypes.TypeDescription);
                    var sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Успешно добавлено!");
        }

        [HttpPut]
        public JsonResult Put(AnimalTypes animalTypes)
        {
            var query = @"UPDATE AnimalTypes SET TypeName=@TypeName, TypeDescription=@TypeDescription WHERE AnimalTypeID=@AnimalTypeID";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalTypeID", animalTypes.AnimalTypeID);
                    myCommand.Parameters.AddWithValue("@TypeName", animalTypes.TypeName);
                    myCommand.Parameters.AddWithValue("@TypeDescription", animalTypes.TypeDescription);
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
            var query = @"DELETE FROM AnimalTypes WHERE AnimalTypeID=@AnimalTypeID";
            DataTable table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("AnimalTrackerCon");
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myCommand.Parameters.AddWithValue("@AnimalTypeID", id);
                    var sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                }
            }

            return new JsonResult("Успешно удалено!");
        }
    }
}

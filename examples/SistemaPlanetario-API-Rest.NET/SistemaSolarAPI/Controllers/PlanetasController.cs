
using Microsoft.AspNetCore.Mvc;
using SistemaSolarAPI.Data;
using SistemaSolarAPI.Entities;

namespace SistemaSolarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanetasController : ControllerBase
    {
       
        // GET: api/Planetas
        [HttpGet]
        public ActionResult<IEnumerable<Planeta>> GetPlaneta()
        {
            return PlanetaData.GetPlaneta().ToList();
        }

        // GET: api/Planetas/5
        [HttpGet("{id}")]
        public ActionResult<Planeta> GetPlaneta(int id)
        {
            var planeta = PlanetaData.GetPlaneta(id);

            if (planeta == null)
            {
                return NotFound();
            }

            return planeta;
        }

        // PUT: api/Planetas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<Planeta> PutPlaneta(int id, Planeta planeta)
        {
            if (id != planeta.Id)
            {
                return BadRequest();
            }

            var plnta = PlanetaData.AlterarPlaneta(id, planeta);

            if (planeta == null)
            {
                return NotFound();
            }

            return Ok();
        }

        // POST: api/Planetas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult<Planeta> PostPlaneta(Planeta planeta)
        {
            PlanetaData.CreatePlaneta(planeta);

            return CreatedAtAction("GetPlaneta", new { id = planeta.Id }, planeta);
        }


        // DELETE: api/SistemaSolars/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSistemaSolar(int id)
        {
            var planeta = PlanetaData.DeletePlaneta(id);
            if (planeta == null)
            {
                return NotFound();
            }

            return Ok();
        }

    }
}

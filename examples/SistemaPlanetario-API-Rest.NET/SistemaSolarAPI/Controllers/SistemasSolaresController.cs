
using Microsoft.AspNetCore.Mvc;
using SistemaSolarAPI.Data;
using SistemaSolarAPI.Entities;

namespace SistemaSolarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SistemasSolaresController : ControllerBase
    {
        // GET: api/SistemaSolars
        [HttpGet]
        public ActionResult<IEnumerable<SistemaSolar>> GetSistemaSolar()
        {
            return SistamaSolarData.GetSistemaSolar().ToList();
        }

        // GET: api/SistemaSolars/5
        [HttpGet("{id}")]
        public ActionResult<SistemaSolar> GetSistemaSolar(int id)
        {
            var sistemaSolar = SistamaSolarData.GetSistemaSolar(id);

            if (sistemaSolar == null)
            {
                return NotFound();
            }

            return sistemaSolar;
        }

        // PUT: api/SistemaSolars/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<SistemaSolar> PutSistemaSolar(int id, SistemaSolar sistemaSolar)
        {
            if (id != sistemaSolar.Id)
            {
                return BadRequest();
            }

            var sistema = SistamaSolarData.AlterarSistemaSolar(id, sistemaSolar);

            if (sistema == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/SistemaSolars
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult<SistemaSolar> PostSistemaSolar(SistemaSolar sistemaSolar)
        {
            SistamaSolarData.CriarSistemaSolar(sistemaSolar);

            return CreatedAtAction("GetSistemaSolar", new { id = sistemaSolar.Id }, sistemaSolar);
        }

        // DELETE: api/SistemaSolars/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSistemaSolar(int id)
        {
            var sistemaSolar = SistamaSolarData.DeleteSistemaSolar(id);
            if (sistemaSolar == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
   
 }
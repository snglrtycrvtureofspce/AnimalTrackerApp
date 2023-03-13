using System.Web.Http;
using AnimalTrackingApp.Component;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AnimalTrackingApp.Controllers
{
    [RoutePrefix("animals")]
    public class AnimalController : Controller
    {
        private readonly AnimalContext  _context;
        [Microsoft.AspNetCore.Mvc.HttpGet("/animals/types/{typeId}")]
        public IActionResult GetAnimalType(long typeId)
        {
            // Проверка наличия типа животного в базе данных
            var animalType = _context.AnimalTypes.FirstOrDefault(t => t.Id == typeId);
            if (animalType == null)
            {
                return NotFound();
            }

            // Возвращаем информацию о типе животного
            return Ok(new
            {
                id = animalType.Id,
                type = animalType.Type
            });
        }

        [Microsoft.AspNetCore.Mvc.HttpPost("/animals/types")]
        public IActionResult AddAnimalType([Microsoft.AspNetCore.Mvc.FromBody] AnimalType animalType)
        {
            // Проверка наличия типа животного в базе данных
            if (_context.AnimalTypes.Any(t => t.Type == animalType.Type))
            {
                return Conflict();
            }

            // Добавление типа животного в базу данных
            _context.AnimalTypes.Add(animalType);
            _context.SaveChanges();

            // Возвращаем информацию о добавленном типе животного
            return Created($"/animals/types/{animalType.Id}", new
            {
                id = animalType.Id,
                type = animalType.Type
            });
        }
        [Microsoft.AspNetCore.Mvc.HttpPut("/animals/types/{typeId}")]
        public IActionResult UpdateAnimalType(long typeId, [Microsoft.AspNetCore.Mvc.FromBody] AnimalType animalType)
        {
            // Проверка наличия типа животного в базе данных
            var existingType = _context.AnimalTypes.FirstOrDefault(t => t.Id == typeId);
            if (existingType == null)
            {
                return NotFound();
            }

            // Изменение типа животного в базе данных
            existingType.Type = animalType.Type;
            _context.SaveChanges();

            // Возвращаем информацию об измененном типе животного
            return Ok(new
            {
                id = existingType.Id,
                type = existingType.Type
            });
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("animals/{animalId}")]
        public IActionResult GetAnimalById(long animalId)
        {
            // Проверяем наличие животного с указанным идентификатором
            var animal = _context.Animals.FirstOrDefault(a => a.Id == animalId);
            if (animal == null)
            {
                return NotFound();
            }

            // Формируем ответ
            var response = new
            {
                id = animal.Id,
                animalTypes = animal.AnimalTypes.Select(at => at),
                weight = animal.Weight,
                length = animal.Length,
                height = animal.Height,
                gender = animal.Gender.ToString(),
                lifeStatus = animal.LifeStatus.ToString(),
                chippingDateTime = animal.ChippingDateTime,
                chipperId = animal.ChipperId,
                chippingLocationId = animal.ChippingLocationId,
                visitedLocations = animal.VisitedLocations.Select(vl => vl),
                deathDateTime = animal.DeathDateTime
            };

            return Ok(response);
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("search")]
        public IActionResult SearchAnimals(
            DateTime? startDateTime,
            DateTime? endDateTime,
            int? chipperId,
            long? chippingLocationId,
            string lifeStatus,
            string gender,
            int from = 0,
            int size = 10)
        {
            var animals = _context.Animals.AsQueryable();

            // Фильтрация по дате чипирования
            if (startDateTime != null)
            {
                animals = animals.Where(a => a.ChippingDateTime >= startDateTime);
            }

            if (endDateTime != null)
            {
                animals = animals.Where(a => a.ChippingDateTime <= endDateTime);
            }

            // Фильтрация по id чипера
            if (chipperId != null)
            {
                animals = animals.Where(a => a.ChipperId == chipperId);
            }

            // Фильтрация по id точки локации
            if (chippingLocationId != null)
            {
                animals = animals.Where(a => a.ChippingLocationId == chippingLocationId);
            }

            // Фильтрация по жизненному статусу
            if (lifeStatus != null)
            {
                animals = animals.Where(a => a.LifeStatus == lifeStatus);
            }

            // Фильтрация по гендеру
            if (gender != null)
            {
                animals = animals.Where(a => a.Gender == gender);
            }

            // Сортировка и пагинация
            animals = animals.OrderBy(a => a.Id).Skip(from).Take(size);

            var result = animals.Select(a => new
            {
                Id = a.Id,
                AnimalTypes = a.AnimalTypes,
                Weight = a.Weight,
                Length = a.Length,
                Height = a.Height,
                Gender = a.Gender,
                LifeStatus = a.LifeStatus,
                ChippingDateTime = a.ChippingDateTime
            });

            return Ok(result);
        }
        //[Microsoft.AspNetCore.Mvc.HttpPost("/animals")]
        //public async Task<ActionResult<Animal>> AddAnimal([Microsoft.AspNetCore.Mvc.FromBody] AnimalDto animalDto)
        //{
        //    var animal = new Animal
        //    {
        //        AnimalTypes = animalDto.AnimalTypes,
        //        Weight = animalDto.Weight,
        //        Length = animalDto.Length,
        //        Height = animalDto.Height,
        //        Gender = animalDto.Gender,
        //        ChippingDateTime = DateTime.Now,
        //        ChipperId = animalDto.ChipperId,
        //        ChippingLocationId = animalDto.ChippingLocationId,
        //        LifeStatus = "ALIVE"
        //    };

        //    if (animalDto.AnimalTypes == null || animalDto.AnimalTypes.Length == 0)
        //    {
        //        return BadRequest("At least one animal type must be provided.");
        //    }

        //    try
        //    {
        //        await _context.Animals.AddAsync(animal);
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Error adding animal: {ex.Message}");
        //    }

        //    return CreatedAtAction(nameof(GetAnimalById), new { id = animal.Id }, animal);
        //}
        // + API 4-8

    }
}

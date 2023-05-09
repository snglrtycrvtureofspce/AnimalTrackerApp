    using AnimalTrackingApp.Component;
using Microsoft.AspNetCore.Mvc;

// Класс, представляющий пользователя
public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;

    public AccountController(ILogger<AccountController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Route("registration")]
    public IActionResult Registration(Account account)
    {
        // Проверяем входные параметры
        if (string.IsNullOrWhiteSpace(account.FirstName)
            || string.IsNullOrWhiteSpace(account.LastName)
            || string.IsNullOrWhiteSpace(account.Email)
            || string.IsNullOrWhiteSpace(account.Password)
            || !IsValidEmail(account.Email))
        {
            return BadRequest();
        }

        // Проверка, что аккаунт с таким email не существует
        bool isEmailExist = false; // добавить логику наличия аккаунта в БД
        if (isEmailExist)
        {
            return Conflict();
        }

        // Создание нового аккаунта
        account.Id = 1; // логика создания аккаунта в БД
        return CreatedAtAction(nameof(GetAccount), new { id = account.Id }, account);
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult GetAccount(int id)
    {
        // логика получения аккаунта из БД по его идентификатору
        Account account = new Account { Id = id, FirstName = "Aleksandr", LastName = "Zenevich", Email = "aleksandr.zenevich@example.com" };

        if (account == null)
        {
            return NotFound();
        }

        return Ok(account);
    }

    private static List<User> Users = new List<User>()
    {
        new User { Id = 1, FirstName = "Aleksandr", LastName = "Zenevich", Email = "aleksandr.zenevich@example.com", Password = "password" },
        new User { Id = 2, FirstName = "Oleg", LastName = "Zenevich", Email = "oleg.zenevich@example.com", Password = "password" },
        new User { Id = 3, FirstName = "Dasha", LastName = "Zenevich", Email = "dasha.zenevich@example.com", Password = "password" }
    };

    // Метод для поиска аккаунтов пользователей по заданным параметрам
    [HttpGet("search")]
    public IActionResult Search(string firstName = null, string lastName = null, string email = null, int from = 0,
        int size = 10)
    {
        // Фильтруем список пользователей по заданным параметрам
        var filteredUsers = Users
            .Where(u => firstName == null || u.FirstName.ToLower().Contains(firstName.ToLower()))
            .Where(u => lastName == null || u.LastName.ToLower().Contains(lastName.ToLower()))
            .Where(u => email == null || u.Email.ToLower().Contains(email.ToLower()))
            .OrderBy(u => u.Id)
            .Skip(from)
            .Take(size)
            .ToList();

        return Ok(filteredUsers); // возвращаем результат поиска
    }

    // Метод для обновления данных аккаунта пользователя
    [HttpPut("{accountId}")]
    public IActionResult Update(int accountId, User updatedUser)
    {
        // Ищем пользователя с заданным идентификатором
        var user = Users.FirstOrDefault(u => u.Id == accountId);

        // Если пользователь не найден, возвращаем 404 ошибку
        if (user == null)
        {
            return NotFound();
        }

        user.FirstName = updatedUser.FirstName;
        user.LastName = updatedUser.LastName;
        user.Email = updatedUser.Email;
        user.Password = updatedUser.Password;
        return Ok(user);
    }

    // Метод для удаления аккаунта пользователя
    [HttpDelete("{accountId}")]
    public IActionResult Delete(int accountId)
    {
        // Ищем пользователя с заданным идентификатором
        var user = Users.FirstOrDefault(u => u.Id == accountId);

        // Если пользователь не найден, возвращаем 404 ошибку
        if (user == null)
        {
            return NotFound();
        }

        // Удаляем пользователя из списка
        Users.Remove(user);

        return NoContent();
    }

}
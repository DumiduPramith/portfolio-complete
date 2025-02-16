using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using porfolio_mongo_db.Areas.Users.Models;
using porfolio_mongo_db.Data;

namespace porfolio_mongo_db.Areas.Users.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;
        public RegisterController(MongoDbService mongoDbService)
        {
            _users = mongoDbService.Database.GetCollection<User>("Users");
        }

        [HttpPost]
        public async Task<ActionResult> RegisterCustomer(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            await _users.InsertOneAsync(user);
            return Ok(new { message = "Register Success" });
        }
    }
}

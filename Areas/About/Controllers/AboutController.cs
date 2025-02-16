using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using porfolio_mongo_db.Areas.Profiles.Models;
using porfolio_mongo_db.Data;

namespace porfolio_mongo_db.Areas.About.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly IMongoCollection<Profile> _profile;

        public AboutController(MongoDbService mongoDbService)
        {
            _profile = mongoDbService.Database.GetCollection<Profile>("Profiles");
        }

        [HttpGet("about/retrieve")]
        public IActionResult GetAbout()
        {
            var filter = Builders<Profile>.Filter.Eq(p => p.IsActive, true);
            var activeProfile = _profile.Find(filter).FirstOrDefault();
            if (activeProfile == null)
            {
                return NotFound("No Active profile found");
            }
            var aboutOptions = activeProfile.AboutOptions;
            aboutOptions.TechStack = aboutOptions.TechStack.Where(t => t.IsActive).ToArray();
            aboutOptions.Tools = aboutOptions.Tools.Where(t => t.IsActive).ToArray();
            return Ok(aboutOptions);
        }
    }
}


using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using porfolio_mongo_db.Areas.Profiles.Models;
using porfolio_mongo_db.Data;

namespace porfolio_mongo_db.Areas.Home.Controllers
{
    [Route("api/admin/")]
    [ApiController]
    public class AdminRetrieveHomeController : ControllerBase
    {
        private IMongoCollection<Profile> _profile;
        public AdminRetrieveHomeController(MongoDbService mongoDbService)
        {
            _profile = mongoDbService.Database.GetCollection<Profile>("Profiles");
        }

        [HttpGet("home/retrieve")]
        public ActionResult<Profile> Get()
        {
            var filter = Builders<Profile>.Filter.Where(x => x.ProfileName == "default");
            var existingProfile = _profile.Find(filter).FirstOrDefault();
            if (existingProfile == null)
            {
                return NotFound("No Active profile found");
            }
            var homeOptions = existingProfile.HomeOptions;
            return Ok(homeOptions);
        }
    }
}

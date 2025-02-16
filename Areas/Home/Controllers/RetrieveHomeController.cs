using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using porfolio_mongo_db.Areas.Home.Models;
using porfolio_mongo_db.Areas.Profiles.Models;
using porfolio_mongo_db.Data;

namespace porfolio_mongo_db.Areas.Home.Controllers
{
    [Route("api/")]
    [ApiController]
    public class RetrieveHomeController : ControllerBase
    {
        private readonly IMongoCollection<Profile> _profile;
        public RetrieveHomeController(MongoDbService mongoDbService)
        {
            _profile = mongoDbService.Database.GetCollection<Profile>("Profiles");
        }
        [HttpGet("home/retrieve")]
        public ActionResult<HomeOptions> Get()
        {
            var filter = Builders<Profile>.Filter.Eq(p => p.IsActive, true);
            var activeProfile = _profile.Find(filter).FirstOrDefault();
            if (activeProfile == null)
            {
                return NotFound("No Active profile found");
            }
            var homeOptions = activeProfile.HomeOptions;

            homeOptions.Professions = homeOptions.Professions.Where(p => p.IsActive).ToArray();
            homeOptions.SocialMedias = homeOptions.SocialMedias.Where(s => s.isActive).ToArray();
            homeOptions.Resume = homeOptions.Resume.IsActive ? homeOptions.Resume : null;
            homeOptions.Github = homeOptions.Github.IsActive ? homeOptions.Github : null;

            var filteredHomeOptions = new
            {
                homeOptions.ProfilePictureUrl,
                homeOptions.BrandName,
                homeOptions.FirstName,
                homeOptions.LastName,
                Professions = homeOptions.Professions?.Select(p => p.ProfessionName).ToArray(),
                SocialMedias = homeOptions.SocialMedias?.Select(s => new { s.name, s.url, s.iconUrl }),
                Resume = homeOptions.Resume != null ? new { homeOptions.Resume.ResumeUrl } : null,
                Github = homeOptions.Github != null ? new { homeOptions.Github.GithubUrl } : null
            };
            return Ok(filteredHomeOptions);
        }
    }
}

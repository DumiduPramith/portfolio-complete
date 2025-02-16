using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using porfolio_mongo_db.Areas.Index.Models;
using porfolio_mongo_db.Areas.Profiles.Models;
using porfolio_mongo_db.Data;

namespace porfolio_mongo_db.Areas.Index.Controllers
{
    [Route("api/")]
    [ApiController]
    public class IndexController : ControllerBase
    {
        private readonly IMongoCollection<Profile> _profile;

        public IndexController(MongoDbService mongoDbService)
        {
            _profile = mongoDbService.Database.GetCollection<Profile>("Profiles");
        }

        [HttpGet("index/retrieve")]
        public ActionResult<IndexResponse> Get()
        {
            var filter = Builders<Profile>.Filter.Eq(p => p.IsActive, true);
            var activeProfile = _profile.Find(filter).FirstOrDefault();
            if (activeProfile == null)
            {
                return NotFound("No Active profile found");
            }
            var indexResponse = new IndexResponse
            {
                BrandName = activeProfile.HomeOptions.BrandName,
                Github = new Github
                {
                    GithubUrl = activeProfile.HomeOptions.Github.GithubUrl,
                    GithubIconUrl = "/static/icons/github_1.png"
                }
            };
            return Ok(indexResponse);
        }
    }
}

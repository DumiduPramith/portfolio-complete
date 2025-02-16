using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using porfolio_mongo_db.Areas.Profiles.Models;
using porfolio_mongo_db.Data;

namespace porfolio_mongo_db.Areas.Portfolio.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly IMongoCollection<Profile> _profile;
        public PortfolioController(MongoDbService mongoDbService)
        {
            _profile = mongoDbService.Database.GetCollection<Profile>("Profiles");
        }

        [HttpGet("portfolio/retrieve")]
        public IActionResult GetPortfolio()
        {
            var filter = Builders<Profile>.Filter.Eq(p => p.IsActive, true);
            var activeProfile = _profile.Find(filter).FirstOrDefault();
            if (activeProfile == null)
            {
                return NotFound("No Active profile found");
            }
            var portfolioOptions = activeProfile.portfolioOptions;
            portfolioOptions.Projects = portfolioOptions.Projects.Where(p => p.IsActive).ToArray();
            return Ok(portfolioOptions);
        }
    }
}

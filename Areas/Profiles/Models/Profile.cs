using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using porfolio_mongo_db.Areas.About.Models;
using porfolio_mongo_db.Areas.Home.Models;
using porfolio_mongo_db.Areas.Portfolio.Models;

namespace porfolio_mongo_db.Areas.Profiles.Models
{
    public class Profile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ProfileName { get; set; }

        public bool IsActive { get; set; }
        public HomeOptions HomeOptions { get; set; }
        public AboutOptions AboutOptions { get; set; }
        public PortfolioOptions portfolioOptions { get; set; }
    }
}

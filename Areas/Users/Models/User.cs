using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace porfolio_mongo_db.Areas.Users.Models
{
    public class User
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("username"), BsonRepresentation(BsonType.String)]
        public string? Username { get; set; }
        [BsonElement("email"), BsonRepresentation(BsonType.String)]
        public string? Email { get; set; }
        [BsonElement("password"), BsonRepresentation(BsonType.String)]
        public string? Password { get; set; }
    }
}

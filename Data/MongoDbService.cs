using MongoDB.Driver;

namespace porfolio_mongo_db.Data
{
    public class MongoDbService
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoDatabase? _database;
        public MongoDbService(IConfiguration configuration)
        {
            _configuration = configuration;

            var connectionString = _configuration.GetConnectionString("DbConnection");
            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);
            _database = mongoClient.GetDatabase("test_db");

            if (_database == null)
            {
                throw new Exception("MongoDb connection failed");
            }
        }

        public IMongoDatabase? Database => _database;

        public bool IsConnected => _database != null;
    }
}

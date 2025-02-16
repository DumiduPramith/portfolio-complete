namespace porfolio_mongo_db.Areas.Home.Models
{
    public class HomeOptions
    {
        public string ProfilePictureUrl { get; set; }
        public string BrandName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Profession[] Professions { get; set; }
        public SocialMedias[] SocialMedias { get; set; }
        public Resume Resume { get; set; }
        public Github Github { get; set; }
    }
}

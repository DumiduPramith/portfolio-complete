namespace porfolio_mongo_db.Areas.About.Models
{
    public class SkillCard
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string IconUrl { get; set; }
        public bool IsActive { get; set; }
    }

    public enum SkillLevel
    {
        Beginner,
        Intermediate,
        Expert
    }
}

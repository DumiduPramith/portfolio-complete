namespace porfolio_mongo_db.Areas.About.Models
{
    public class AboutOptions
    {
        public string Paragraph1 { get; set; }
        public string Paragraph2 { get; set; }
        public string ProfilePictureUrl { get; set; }
        public SkillCard[] TechStack { get; set; }
        public SkillCard[] Tools { get; set; }
    }
}

namespace porfolio_mongo_db.Areas.Portfolio.Models
{
    public class Project
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Image Image { get; set; }
        public string[] Technologies { get; set; }
        public ProjectUrl[] ProjectUrls { get; set; }
        public bool IsActive { get; set; }
        public int index { get; set; }
    }
}

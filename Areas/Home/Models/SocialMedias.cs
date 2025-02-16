using System.ComponentModel.DataAnnotations;

namespace porfolio_mongo_db.Areas.Home.Models
{
    public class SocialMedias
    {
        [Required]
        public string name { get; set; }
        [Required]
        public string url { get; set; }
        [Required]
        public string iconUrl { get; set; }
        [Required]
        public bool isActive { get; set; }
    }
}

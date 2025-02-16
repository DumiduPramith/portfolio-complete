namespace porfolio_mongo_db.Areas.Home.Networks
{
    public class HomeUpdateRequest
    {
        public string BrandName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public GithubInfo Github { get; set; }
        public Profession[] Professions { get; set; }
        public ProfilePictureInfo ProfilePicture { get; set; }
        public ResumeFileInfo ResumeFile { get; set; }
        public List<SocialMedia> SocialMedias { get; set; }
    }

    public class GithubInfo
    {
        public bool IsActive { get; set; }
        public string Url { get; set; }
    }

    public class Profession
    {
        public int Index { get; set; }
        public bool IsActive { get; set; }
        public string ProfessionName { get; set; }
    }

    public class ProfilePictureInfo
    {
        public bool IsChanged { get; set; }
        public string ProfilePictureUrl { get; set; }
    }

    public class ResumeFileInfo
    {
        public bool IsActive { get; set; }
        public bool IsChanged { get; set; }
        public string ResumeUrl { get; set; }
    }

    public class SocialMedia
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public bool IsActive { get; set; }
        public string IconUrl { get; set; }
    }
}

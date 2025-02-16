namespace porfolio_mongo_db.Data
{
    using MongoDB.Driver;
    using porfolio_mongo_db.Areas.About.Models;
    using porfolio_mongo_db.Areas.Home.Models;
    using porfolio_mongo_db.Areas.Portfolio.Models;
    using porfolio_mongo_db.Areas.Profiles.Models;

    public class InitialDataService
    {
        private readonly IMongoCollection<Profile> _profile;

        public InitialDataService(MongoDbService mongoDbService)
        {
            _profile = mongoDbService.Database.GetCollection<Profile>("Profiles");
        }

        public bool InitializeProfile()
        {
            var filter = Builders<Profile>.Filter.Where(x => x.ProfileName == "default");
            var existingProfile = _profile.Find(filter).FirstOrDefault();
            var homeOptions = new Areas.Home.Models.HomeOptions
            {
                ProfilePictureUrl = "/static/profile_pictures/default.jpg",
                BrandName = "Kevin",
                FirstName = "Kevin",
                LastName = "Kibet",
                Professions = new[]
                {
                    new Profession
                    {
                        ProfessionName = "Developer",
                        IsActive = true,
                        Index = 0,
                    },
                    new Profession
                    {
                        ProfessionName = "Designer",
                        IsActive = true,
                        Index = 1,
                    },
                },
                SocialMedias = new[]
                {
                    new SocialMedias
                    {
                        name = "Linkedin",
                        url = "https://linkedin.com",
                        isActive = true,
                        iconUrl = "/static/SVG/linkedin.svg",
                    },
                    new SocialMedias
                    {
                        name = "X",
                        url = "https://x.com",
                        isActive = true,
                        iconUrl = "/static/SVG/x_logo.svg",
                    },
                    new SocialMedias
                    {
                        name = "Facebook",
                        url = "https://facebook.com",
                        isActive = true,
                        iconUrl = "/static/SVG/facebook.svg",
                    },
                },
                Resume = new Resume { IsActive = true, ResumeUrl = "https://www.resume.com" },
                Github = new Github { IsActive = true, GithubUrl = "https://www.github.com" },
            };
            var aboutOptions = new AboutOptions
            {
                Paragraph1 =
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\r\nmolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\r\nnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\r\noptio,",
                Paragraph2 =
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\r\nmolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\r\nnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\r\noptio,",
                ProfilePictureUrl = "/static/profile_picture/default.png",
                TechStack = new[]
                {
                    new SkillCard
                    {
                        Name = "C#",
                        Description = SkillLevel.Expert.ToString(),
                        IsActive = true,
                        IconUrl = "/static/icons/skills/cs.png",
                    },
                    new SkillCard
                    {
                        Name = "Python",
                        Description = SkillLevel.Intermediate.ToString(),
                        IsActive = true,
                        IconUrl = "/static/icons/skills/python.png",
                    },
                },
                Tools = new[]
                {
                    new SkillCard
                    {
                        Name = "Visual Studio",
                        Description = "code editor",
                        IsActive = true,
                        IconUrl = "/static/icons/tools/vs.png",
                    },
                    new SkillCard
                    {
                        Name = "PyCharm",
                        Description = "code editor",
                        IsActive = true,
                        IconUrl = "/static/icons/tools/pycharm.png",
                    },
                },
            };

            var portfolioOptions = new PortfolioOptions
            {
                Projects = new[]
                {
                    new Project
                    {
                        Title = "Personal Website",
                        Description =
                            "My personal portfolio website design using Figma and its development done using Angularjs. This project i used angular animations too.",
                        Image = new Image
                        {
                            name = "portfolio.png",
                            height = "955",
                            width = "1792",
                            url = "/static/projects/portfolio.png",
                            smallUrl = "/static/projects/small/portfolio.png",
                        },
                        IsActive = true,
                        index=0,
                        Technologies = new[] { "Angular", "Figma" },
                        ProjectUrls = new[]
                        {
                            new ProjectUrl
                            {
                                IconUrl = "/static/icons/github__.png",
                                IsActive = true,
                                Url = "https://github.com",
                                iconName = "github",
                            },
                            new ProjectUrl
                            {
                                IconUrl = "/static/icons/open_new_.png",
                                IsActive = true,
                                Url = "https://website.com",
                                iconName = "open_new",
                            },
                        },
                    },
                },
            };

            var initialProfile = new Profile
            {
                ProfileName = "default",
                IsActive = true,
                HomeOptions = homeOptions,
                AboutOptions = aboutOptions,
                portfolioOptions = portfolioOptions,
            };

            if (existingProfile == null)
            {
                try
                {
                    _profile.InsertOne(initialProfile);
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            return false;
        }
    }
}

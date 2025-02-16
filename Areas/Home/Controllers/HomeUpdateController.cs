using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using porfolio_mongo_db.Areas.Home.Models;
using porfolio_mongo_db.Areas.Home.Networks;
using porfolio_mongo_db.Areas.Home.Services;
using porfolio_mongo_db.Areas.Profiles.Models;
using porfolio_mongo_db.Data;

namespace porfolio_mongo_db.Areas.Home.Controllers
{
    [Route("api/admin/home/")]
    [ApiController]
    public class HomeUpdateController : ControllerBase
    {
        private readonly IMongoCollection<Profile> _profile;
        private readonly IWebHostEnvironment _env;
        public HomeUpdateController(MongoDbService mongoDbService, IWebHostEnvironment env)
        {
            _profile = mongoDbService.Database.GetCollection<Profile>("Profiles");
            _env = env;
        }

        [HttpPut("update")]
        public IActionResult UpdateHomeOptions([FromBody] HomeUpdateRequest homeUpdateRequest)
        {
            if (homeUpdateRequest.ProfilePicture.IsChanged)
            {
                string folderPath = Path.Combine("static", "Profile_Pictures");
                string fileName = "profile_picture.jpg";
                string savedImagePath = ImageHelper.SaveBase64Image(homeUpdateRequest.ProfilePicture.ProfilePictureUrl, folderPath, fileName);
                homeUpdateRequest.ProfilePicture.ProfilePictureUrl = savedImagePath;
            }

            if (homeUpdateRequest.ResumeFile.IsChanged)
            {
                string folderPath = Path.Combine("static", "Resume_Files");
                string fileName = "resume.pdf";
                string savedResumePath = PDFHelper.SavePdf(homeUpdateRequest.ResumeFile.ResumeUrl, folderPath, fileName);
                homeUpdateRequest.ResumeFile.ResumeUrl = savedResumePath;
            }

            HomeOptions homeOptions = new HomeOptions
            {
                BrandName = homeUpdateRequest.BrandName,
                FirstName = homeUpdateRequest.FirstName,
                LastName = homeUpdateRequest.LastName,
                Professions = homeUpdateRequest.Professions.Select(p => new Models.Profession
                {
                    Index = p.Index,
                    IsActive = p.IsActive,
                    ProfessionName = p.ProfessionName
                }).ToArray(),
                ProfilePictureUrl = homeUpdateRequest.ProfilePicture.ProfilePictureUrl,
                SocialMedias = homeUpdateRequest.SocialMedias.Select(s => new SocialMedias
                {
                    name = s.Name,
                    url = s.Url,
                    isActive = s.IsActive,
                    iconUrl = s.IconUrl
                }).ToArray(),
                Resume = new Resume
                {
                    IsActive = homeUpdateRequest.ResumeFile.IsActive,
                    ResumeUrl = homeUpdateRequest.ResumeFile.ResumeUrl
                },
                Github = new Github
                {
                    IsActive = homeUpdateRequest.Github.IsActive,
                    GithubUrl = homeUpdateRequest.Github.Url
                }
            };
            var filter = Builders<Profile>.Filter.Where(x => x.ProfileName == "default");
            var update = Builders<Profile>.Update.Set(x => x.HomeOptions, homeOptions);
            _profile.UpdateOne(filter, update);
            return Ok();
        }
    }
}

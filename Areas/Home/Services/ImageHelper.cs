namespace porfolio_mongo_db.Areas.Home.Services
{
    public static class ImageHelper
    {
        public static string SaveBase64Image(string base64Image, string folderPath, string fileName)
        {
            try
            {
                if (base64Image.Contains(","))
                {
                    base64Image = base64Image.Split(',')[1];
                }

                byte[] imageBytes = Convert.FromBase64String(base64Image);
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                string filePath = Path.Combine(folderPath, fileName);
                File.WriteAllBytes(filePath, imageBytes);
                return filePath;
            }
            catch (Exception ex)
            {
                throw new Exception("Error saving image: " + ex.Message);
            }
        }
    }
}

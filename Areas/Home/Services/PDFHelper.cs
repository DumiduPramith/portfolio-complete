namespace porfolio_mongo_db.Areas.Home.Services
{
    public static class PDFHelper
    {
        public static string SavePdf(string pdfBase64, string path, string fileName)
        {
            string base64String = pdfBase64.Split(",")[1];
            string filePath = Path.Combine(path, fileName);
            try
            {
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                byte[] pdfBytes = Convert.FromBase64String(base64String);
                File.WriteAllBytes(filePath, pdfBytes);
                return filePath;
            }
            catch (Exception e)
            {
                throw new Exception("Error saving pdf file", e);
            }
        }
    }
}

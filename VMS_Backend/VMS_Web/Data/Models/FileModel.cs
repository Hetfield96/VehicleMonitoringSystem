using Microsoft.AspNetCore.Http;

namespace VMS_Web.Data.Models
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
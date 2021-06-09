using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Web.Data.Models;
using VMS_Web.Services.Utils;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttachmentController : ControllerBase
    {

        [HttpGet]
        [Route("{fileName}")]
        public async Task<ActionResult> GetAttachment(string fileName)
        {
            try
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);
                byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(path);
                return File(fileBytes, "application/force-download", fileName);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        // TODO not used for now - need refactoring
        [HttpPost]
        public async Task<ActionResult<string>> UploadAttachment([FromForm] FileModel attachment)
        {
            attachment.FileName = string.IsNullOrEmpty(attachment.FileName) ? attachment.FormFile.FileName : attachment.FileName;
            var savedFileName = await FileSaver.SaveFile(attachment);
            return Ok(savedFileName);
        }
    }
}
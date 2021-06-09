using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Web.Data.DatabaseModels;
using VMS_Web.Data.Models;
using VMS_Web.Services.Database;
using VMS_Web.Services.Utils;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/taskComment")]
    public class WorkTaskCommentController : ControllerBase
    {
        private readonly WorkTaskCommentService _workTaskCommentService;

        public WorkTaskCommentController(WorkTaskCommentService workTaskCommentService)
        {
            _workTaskCommentService = workTaskCommentService;
        }
        
        [HttpPost]
        public async Task<ActionResult<WorkTaskComment>> Create([FromBody] WorkTaskComment taskComment)
        {
            taskComment.Date = DateTime.Now;
            taskComment.Type = "text";
            
            var res = await _workTaskCommentService.AddNewItem(taskComment);
            return Ok(res);
        }
        
        [HttpPost]
        [Route("withAttachment/{companyId}/{authorId}/{taskId}/{text}")]
        public async Task<ActionResult<WorkTaskComment>> UploadFile(int companyId, string authorId, int taskId, string text, [FromForm] FileModel attachment)
        {
            attachment.FileName = string.IsNullOrEmpty(attachment.FileName) ? attachment.FormFile.FileName : attachment.FileName;
            var savedFileName = await FileSaver.SaveFile(attachment);
            var comment = new WorkTaskComment(companyId, authorId, taskId, text, savedFileName);
            var newComment = await _workTaskCommentService.AddNewItem(comment);

            return Ok(newComment);
        }
        
        [HttpGet]
        [Route("getAllForTask/{companyId}/{taskId}")]
        public async Task<ActionResult<List<WorkTaskComment>>> GetAllForTask(int companyId, int taskId)
        {
            return Ok(await _workTaskCommentService.GetAllForTask(companyId, taskId));
        }

        [HttpDelete]
        [Route("{taskCommentId}")]
        public async Task<ActionResult> Delete(string taskId)
        {
            var res = await _workTaskCommentService.DeleteItemById(taskId);
            if (!res)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
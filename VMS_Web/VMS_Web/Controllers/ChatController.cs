using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using VMS_Web.Data.DatabaseModels;
using VMS_Web.Data.Models;
using VMS_Web.Services.Database;
using VMS_Web.Services.SignalR;
using VMS_Web.Services.Utils;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;
        private readonly EmployeeService _employeeService;
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(ChatService chatService, EmployeeService employeeService, IHubContext<ChatHub> hubContext)
        {
            _chatService = chatService;
            _employeeService = employeeService;
            _hubContext = hubContext;
        }

        [HttpPost]
        [Route("withAttachment/{companyId}/{senderId}/{receiverId}/{text}")]
        public async Task<ActionResult<ChatMessage>> UploadFile(int companyId, string senderId, string receiverId, string text, [FromForm] FileModel attachment)
        {
            attachment.FileName = string.IsNullOrEmpty(attachment.FileName) ? attachment.FormFile.FileName : attachment.FileName;
            var savedFileName = await FileSaver.SaveFile(attachment);
            var message = new ChatMessage(companyId, senderId, receiverId, text, savedFileName);
            var newMessage = await _chatService.AddNewItem(message);

            var res = await _chatService.GetMessageById(newMessage.Id);
            
            // SignalR message to client
            await ChatHub.SendMessage(_hubContext, res.ReceiverId, res);
            
            return Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult<ChatMessage>> Create([FromBody] ChatMessage message)
        {
            message.Type = "text";
            message.Date = DateTime.Now;
            message.Unread = true;
            if (string.IsNullOrEmpty(message.SenderId) && string.IsNullOrEmpty(message.ReceiverId))
            {
                message.SenderId = message.Sender.Id;
                message.ReceiverId = message.Receiver.Id;
            }

            // TODO unify and refactor
            var sender = message.Sender;
            var receiver = message.Receiver;
            
            message.Sender = null;
            message.Receiver = null;
            var res = await _chatService.AddNewItem(message);

            res.Sender = sender;
            res.Receiver = receiver;

            if (res.Sender == null || res.Receiver == null)
            {
                res.Sender = await _employeeService.FindItemByIdAsync(res.SenderId);
                res.Receiver = await _employeeService.FindItemByIdAsync(res.ReceiverId);
            }
            // SignalR message to client
            await ChatHub.SendMessage(_hubContext, res.ReceiverId, res);

            return Ok(res);
        }
        
        [HttpGet]
        [Route("getAllEmployeeMessages/{companyId}/{employeeId}")]
        public async Task<ActionResult<List<WorkTask>>> GetAllEmployeeMessages(int companyId, string employeeId)
        {
            return Ok(await _chatService.GetAllEmployeeMessages(companyId, employeeId));
        }
    }
}
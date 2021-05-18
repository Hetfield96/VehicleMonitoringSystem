using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using VMS_Backend.Data;
using VMS_Backend.Data.DatabaseModels;
using VMS_Backend.Data.Migrations;

namespace VMS_Backend.Services.Database
{
    public class ChatService : BaseDatabaseService<ChatMessage>
    {
        private string DefaultConnectionString { get; }

        public ChatService(ApplicationDbContext dbContext, IConfiguration configuration) : base(dbContext)
        {
            DefaultConnectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<ChatMessage>> GetAllEmployeeMessages(int companyId, string employeeId)
        {
            var messages = await _dbContext.ChatMessage
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Where(m => m.CompanyId.Equals(companyId) && (m.ReceiverId == employeeId || m.SenderId == employeeId))
                .OrderBy(m => m.Date)
                .ToListAsync();
            return messages;
        }
        
        public async Task<ChatMessage> GetMessageById(long messageId)
        {
            var message = await _dbContext.ChatMessage
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Where(m => m.Id.Equals(messageId))
                .FirstOrDefaultAsync();
            return message;
        }
    }
}
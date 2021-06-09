using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using VMS_Web.Data.DatabaseModels;

namespace VMS_Web.Services.SignalR
{
    /// <summary>
    /// SignalR hub for real-time chatting
    /// </summary>
    public class ChatHub : Hub
    {
        // EmployeeId -> [connectionsId]
        private static readonly HubConnectionMapping<string> ConnectionsMapping = 
            new HubConnectionMapping<string>();

        public async Task EstablishConnection(string dbUserId)
        {
            var connectionId = Context.ConnectionId;
            ConnectionsMapping.Add(dbUserId, connectionId);
            await Clients.Caller.SendAsync("connectionEstablished", connectionId);
        }
        
        public void CloseConnection(string dbUserId)
        {
            var connectionId = Context.ConnectionId;
            ConnectionsMapping.Remove(dbUserId, connectionId);
        }
        
        public static async Task SendMessage(IHubContext<ChatHub> context, string dbUserId, ChatMessage chatMessage)
        {
            var connectionsList = ConnectionsMapping.GetConnections(dbUserId);
            foreach (var connectionId in connectionsList)
            {
                await context.Clients.Client(connectionId).SendAsync("receiveChatMessage", chatMessage);
            }
        }
    }
}
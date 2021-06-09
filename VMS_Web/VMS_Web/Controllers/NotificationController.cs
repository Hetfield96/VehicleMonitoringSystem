using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Web.Services.Database;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly NotificationService _notificationService;

        public NotificationController(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }
        
        [HttpGet]
        [Route("{notificationTypeId}/{companyId}/{startDateTime}/{endDateTime}")]
        public async Task<ActionResult> Generate(int notificationTypeId, int companyId, string startDateTime, string endDateTime, [FromQuery] int? vehicleId = null)
        { 
            return Ok(await _notificationService.GenerateNotificationsData(notificationTypeId, companyId, vehicleId, startDateTime, endDateTime));
        }
    }
}
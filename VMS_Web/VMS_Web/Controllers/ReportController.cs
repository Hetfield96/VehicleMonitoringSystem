using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Web.Services.Database;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ReportService _reportService;

        public ReportController(ReportService reportService)
        {
            _reportService = reportService;
        }
        
        [HttpGet]
        [Route("{reportId}/{companyId}/{startDateTime}/{endDateTime}")]
        public async Task<ActionResult> Generate(int reportId, int companyId, string startDateTime, string endDateTime, [FromQuery] int? vehicleId = null)
        {
            switch (reportId)
            {
                case 1:
                    return Ok(await _reportService.GenerateReportAllData(companyId, vehicleId, startDateTime, endDateTime));
                case 2:
                    return Ok(await _reportService.GenerateReportVehicleWorkingTime(companyId, vehicleId, startDateTime, endDateTime));
                default:
                    return NotFound($"Report with id = {reportId} not found");
            }
        }
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.DatabaseModels;
using VMS_Backend.Services.Database.Reports;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
                    return Ok(await _reportService.GenerateReportAllData(companyId, vehicleId, startDateTime,
                        endDateTime));
                default:
                    return NotFound($"Report with id = {reportId} not found");
            }
        }
        
        [HttpGet]
        [Route("allData/{companyId}/{startDateTime}/{endDateTime}")]
        public async Task<ActionResult<List<Vehicle>>> GetAll(int companyId, string startDateTime, string endDateTime, [FromQuery] int? vehicleId = null)
        {
            return Ok(await _reportService.GenerateReportAllData(companyId, vehicleId, startDateTime, endDateTime));
        }
    }
}
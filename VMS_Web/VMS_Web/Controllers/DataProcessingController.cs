using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Web.Data.DatabaseModels;
using VMS_Web.Services.Database;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataProcessingController : ControllerBase
    {
        private readonly VehicleDataService _vehicleDataService;

        public DataProcessingController(VehicleDataService vehicleDataService)
        {
            _vehicleDataService = vehicleDataService;
        }

        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] VehicleData[] vehicleData)
        {
            foreach (var vd in vehicleData)
            {
                vd.Datetime = DateTime.ParseExact(vd.DatetimeString, "yyMMddHHmmss", CultureInfo.InvariantCulture);
            }
            
            await _vehicleDataService.InsertVehicleData(vehicleData);
            
            var msg = $"DataProcessingController: synced, length = {vehicleData.Length}, datetime = {DateTime.Now:yyyy-MM-dd HH:mm}";
            Console.WriteLine(msg);
            return Ok(new List<string> {msg});
        }
    }
}
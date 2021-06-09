using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Web.Data.DatabaseModels;
using VMS_Web.Services.Database;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleDriverLinkController : ControllerBase
    {
        private readonly VehicleDriverLinkService _vehicleDriverLinkService;

        public VehicleDriverLinkController(VehicleDriverLinkService vehicleDriverLinkServiceService)
        {
            _vehicleDriverLinkService = vehicleDriverLinkServiceService;
        }
        
        [HttpPost]
        [Route("{vehicleId}")]
        public async Task<ActionResult> Create(int vehicleId, [FromBody] List<string> driverIds)
        {
            var now = DateTime.Now;
            
            var currentDriversLinks = await _vehicleDriverLinkService.GetCurrentDriversLinks(vehicleId);
            var currentDriversLinksDict = currentDriversLinks.ToDictionary(vdl => vdl.DriverId);
            
            // Adding new links
            foreach (var driverId in driverIds)
            {
                if (!currentDriversLinksDict.ContainsKey(driverId))
                {
                    var vehicleDriverLink = new VehicleDriverLink(driverId, vehicleId, now);
                    await _vehicleDriverLinkService.AddNewItem(vehicleDriverLink, now);
                }
            }

            // Editing old links
            foreach (var currentDriverLink in currentDriversLinks)
            {
                if (!driverIds.Contains(currentDriverLink.DriverId))
                {
                    currentDriverLink.EndDate = now;
                    await _vehicleDriverLinkService.Edit(currentDriverLink);
                }
            }
            
            return Ok();
        }
        
        [HttpGet]
        [Route("getCurrentVehiclesDriversMap/{companyId}")]
        public async Task<ActionResult<Dictionary<int, List<Employee>>>> GetCurrentVehiclesDriversMap(int companyId)
        {
            var res = await _vehicleDriverLinkService.GetCurrentVehiclesDriversMap(companyId);
            return Ok(res);
        }

        [HttpGet]
        [Route("getCurrentDriversLinks/{vehicleId}")]
        public async Task<ActionResult<List<VehicleDriverLink>>> GetCurrentDriverLink(int vehicleId)
        {
            var res = await _vehicleDriverLinkService.GetCurrentDriversLinks(vehicleId);
            return Ok(res);
        }
        
        [HttpGet]
        [Route("getCurrentDrivers/{vehicleId}")]
        public async Task<ActionResult<List<Employee>>> GetCurrentDriver(int vehicleId)
        {
            var res = await _vehicleDriverLinkService.GetCurrentDrivers(vehicleId);
            return Ok(res);
        }
        
        [HttpGet]
        [Route("getCurrentVehicle/{driverId}")]
        public async Task<ActionResult<Vehicle>> GetCurrentVehicle(string driverId)
        {
            var res = await _vehicleDriverLinkService.GetCurrentVehicle(driverId);
            return Ok(res);
        }
    }
}
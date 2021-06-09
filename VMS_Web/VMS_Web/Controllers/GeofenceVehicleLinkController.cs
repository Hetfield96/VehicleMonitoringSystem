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
    public class GeofenceVehicleLinkController : ControllerBase
    {
        private readonly GeofenceVehicleLinkService _geofenceVehicleLinkService;

        public GeofenceVehicleLinkController(GeofenceVehicleLinkService geofenceVehicleLinkService)
        {
            _geofenceVehicleLinkService = geofenceVehicleLinkService;
        }
        
        [HttpPost]
        [Route("{geofenceId}")]
        public async Task<ActionResult> Create(int geofenceId, [FromBody] List<int> vehicleIds)
        {
            var now = DateTime.Now;
            
            var currentVehiclesLinks = await _geofenceVehicleLinkService.GetCurrentVehiclesLinks(geofenceId);
            var currentVehiclesLinksDict = currentVehiclesLinks.ToDictionary(gvl => gvl.VehicleId);
            
            // Adding new links
            foreach (var vehicleId in vehicleIds)
            {
                if (!currentVehiclesLinksDict.ContainsKey(vehicleId))
                {
                    var geofenceVehicleLink = new GeofenceVehicleLink(geofenceId, vehicleId, now);
                    await _geofenceVehicleLinkService.AddNewItem(geofenceVehicleLink, now);
                }
            }
        
            // Editing old links
            foreach (var currentVehicleLink in currentVehiclesLinks)
            {
                if (!vehicleIds.Contains(currentVehicleLink.VehicleId))
                {
                    currentVehicleLink.EndDate = now;
                    await _geofenceVehicleLinkService.Edit(currentVehicleLink);
                }
            }
            
            return Ok();
        }
        
        [HttpGet]
        [Route("getCurrentVehicles/{geofenceId}")]
        public async Task<ActionResult<List<Employee>>> GetCurrentVehicles(int geofenceId)
        {
            var res = await _geofenceVehicleLinkService.GetCurrentVehicles(geofenceId);
            return Ok(res);
        }
        
        [HttpGet]
        [Route("getCurrentGeofenceVehiclesMap/{companyId}")]
        public async Task<ActionResult<Dictionary<int, List<Vehicle>>>> GetCurrentGeofenceVehiclesMap(int companyId)
        {
            var res = await _geofenceVehicleLinkService.GetCurrentGeofenceVehiclesMap(companyId);
            return Ok(res);
        }
    }
}
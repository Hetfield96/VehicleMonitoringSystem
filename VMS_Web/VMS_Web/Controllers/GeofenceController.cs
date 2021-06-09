using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Web.Data.DatabaseModels;
using VMS_Web.Services.Database;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeofenceController : ControllerBase
    {
        private readonly GeofenceService _geofenceService;

        public GeofenceController(GeofenceService geofenceService)
        {
            _geofenceService = geofenceService;
        }
        
        [HttpPost]
        public async Task<ActionResult<Geofence>> Create([FromBody] Geofence geofence)
        {
            var res = await _geofenceService.AddNewItem(geofence);
            return Ok(res);
        }

        [HttpGet]
        [Route("getAll/{companyId}")]
        public async Task<ActionResult<List<Geofence>>> GetAll(int companyId)
        {
            return Ok(await _geofenceService.GetAll(companyId));
        }

        [HttpDelete]
        [Route("{geofenceId}")]
        public async Task<ActionResult> Delete(string geofenceId)
        {
            var res = await _geofenceService.DeleteItemById(geofenceId);
            if (!res)
            {
                return NotFound();
            }
        
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Edit([FromBody] Geofence geofence)
        {
            var res = await _geofenceService.Edit(geofence);
            if (res != null)
            {
                return Ok(res);
            }
        
            return NotFound();
        }
    }
}
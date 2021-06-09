using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VMS_Web.Data;
using VMS_Web.Data.DatabaseModels;

namespace VMS_Web.Services.Database
{
    public class GeofenceVehicleLinkService : BaseDatabaseService<GeofenceVehicleLink>
    {
        public GeofenceVehicleLinkService(ApplicationDbContext dbContext) : base(dbContext) { }

        public async Task<GeofenceVehicleLink> AddNewItem(GeofenceVehicleLink item, DateTime now)
        {
            item.StartDate = now;
            item.EndDate = null;
            return await base.AddNewItem(item);
        }
        
        public async Task<List<GeofenceVehicleLink>> GetCurrentVehiclesLinks(int geofenceId)
        {
            var geofenceVehicleLinks = await _dbContext.GeofenceVehicleLinks
                .Where(gvl => gvl.GeofenceId == geofenceId && gvl.EndDate == null)
                .OrderByDescending(gvl => gvl.StartDate)
                .ToListAsync();
            return geofenceVehicleLinks;
        }
        
        public async Task<List<Vehicle>> GetCurrentVehicles(int geofenceId)
        {
            var drivers = await _dbContext.GeofenceVehicleLinks
                .Where(gvl => gvl.GeofenceId == geofenceId && gvl.EndDate == null)
                .Include(gvl => gvl.Vehicle)
                .Select(gvl => gvl.Vehicle)
                .ToListAsync();
        
            return drivers;
        }

        public async Task<GeofenceVehicleLink> Edit(GeofenceVehicleLink geofenceVehicleLink)
        {
            var dbGeofenceVehicleLink = await _dbContext.FindAsync<GeofenceVehicleLink>(geofenceVehicleLink.Id);
            if (dbGeofenceVehicleLink == null)
            {
                return null;
            }
        
            dbGeofenceVehicleLink.VehicleId = geofenceVehicleLink.VehicleId;
            dbGeofenceVehicleLink.GeofenceId = geofenceVehicleLink.GeofenceId;
            dbGeofenceVehicleLink.StartDate = geofenceVehicleLink.StartDate;
            dbGeofenceVehicleLink.EndDate = geofenceVehicleLink.EndDate;
            await _dbContext.SaveChangesAsync();
            return dbGeofenceVehicleLink;
        }
        
        public async Task<Dictionary<int, List<Vehicle>>> GetCurrentGeofenceVehiclesMap(int companyId)
        {
            var res = new Dictionary<int, List<Vehicle>>();
            var links = await _dbContext.GeofenceVehicleLinks
                .Include(gvl => gvl.Vehicle)
                .Include(gvl => gvl.Geofence)
                .Where(gvl => gvl.Vehicle.CompanyId == companyId && gvl.EndDate == null)
                .ToListAsync();
            foreach (var link in links)
            {
                if (res.ContainsKey(link.GeofenceId))
                {
                    res[link.GeofenceId].Add(link.Vehicle);
                } else 
                {
                    res.Add(link.GeofenceId, new List<Vehicle>() {link.Vehicle});
                }
            }

            return res;
        }
    }
}
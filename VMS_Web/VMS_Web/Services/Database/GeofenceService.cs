using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VMS_Web.Data;
using VMS_Web.Data.DatabaseModels;

namespace VMS_Web.Services.Database
{
    public class GeofenceService : BaseDatabaseService<Geofence>
    {
        public GeofenceService(ApplicationDbContext dbContext) : base(dbContext) { }
        
        public async Task<List<Geofence>> GetAll(int companyId)
        {
            var geofences = await _dbContext.Geofence
                .Where(v => v.CompanyId.Equals(companyId))
                .ToListAsync();
            return geofences;
        }
        
        public async Task<Geofence> Edit(Geofence geofence)
        {
            var dbGeofence = await _dbContext.FindAsync<Geofence>(geofence.Id);
            if (dbGeofence == null)
            {
                return null;
            }
            
            dbGeofence.Name = geofence.Name;
            dbGeofence.Coords = geofence.Coords;
            dbGeofence.RestrictionId = geofence.RestrictionId;
            dbGeofence.Color = geofence.Color;
            await _dbContext.SaveChangesAsync();
            return dbGeofence;
        }
    }
}
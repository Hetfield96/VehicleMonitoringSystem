using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data;
using VMS_Backend.Data.DatabaseModels;

namespace VMS_Backend.Services.Database
{
    public class VehicleDriverLinkService : BaseDatabaseService<VehicleDriverLink>
    {
        public VehicleDriverLinkService(ApplicationDbContext dbContext) : base(dbContext) { }

        public async Task<VehicleDriverLink> AddNewItem(VehicleDriverLink item, DateTime now)
        {
            item.StartDate = now;
            item.EndDate = null;
            return await base.AddNewItem(item);
        }
        
        public async Task<List<VehicleDriverLink>> GetCurrentDriversLinks(int vehicleId)
        {
            var vehicleDriversLinks = await _dbContext.VehicleDriverLink
                .Where(vdl => vdl.VehicleId == vehicleId && vdl.EndDate == null)
                .OrderByDescending(vdl => vdl.StartDate)
                .ToListAsync();
            return vehicleDriversLinks;
        }
        
        public async Task<List<Employee>> GetCurrentDrivers(int vehicleId)
        {
            var drivers = await _dbContext.VehicleDriverLink
                .Where(vdl => vdl.VehicleId == vehicleId && vdl.EndDate == null)
                .Include(vdl => vdl.Driver)
                .Select(vdl => vdl.Driver)
                .ToListAsync();

            return drivers;
        }
        
        public async Task<Dictionary<int, List<Employee>>> GetCurrentVehiclesDriversMap(int companyId)
        {
            var res = new Dictionary<int, List<Employee>>();
            var links = await _dbContext.VehicleDriverLink
                .Include(vdl => vdl.Vehicle)
                .Include(vdl => vdl.Driver)
                .Where(vdl => vdl.Vehicle.CompanyId == companyId && vdl.EndDate == null)
                .ToListAsync();
            foreach (var link in links)
            {
                if (res.ContainsKey(link.VehicleId))
                {
                    res[link.VehicleId].Add(link.Driver);
                } else 
                {
                    res.Add(link.VehicleId, new List<Employee>() {link.Driver});
                }
            }

            return res;
        }
        
        public async Task<VehicleDriverLink> Edit(VehicleDriverLink vehicleDriverLink)
        {
            var dbVehicleDriverLink = await _dbContext.FindAsync<VehicleDriverLink>(vehicleDriverLink.Id);
            if (dbVehicleDriverLink == null)
            {
                return null;
            }

            dbVehicleDriverLink.VehicleId = vehicleDriverLink.VehicleId;
            dbVehicleDriverLink.DriverId = vehicleDriverLink.DriverId;
            dbVehicleDriverLink.StartDate = vehicleDriverLink.StartDate;
            dbVehicleDriverLink.EndDate = vehicleDriverLink.EndDate;
            await _dbContext.SaveChangesAsync();
            return dbVehicleDriverLink;
        }
    }
}
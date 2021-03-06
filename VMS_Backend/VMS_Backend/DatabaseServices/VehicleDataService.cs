using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class VehicleDataService : BaseDatabaseService<VehicleData>
    {
        private IConfiguration Configuration { get; }

        public VehicleDataService(ApplicationDbContext dbContext, IConfiguration configuration) : base(dbContext)
        {
            Configuration = configuration;
        }

        public async Task<List<VehicleData>> GetVehiclesLastData()
        {
            await using var con = new NpgsqlConnection(Configuration.GetConnectionString("DefaultConnection"));
            var res = await con.QueryAsync<VehicleData, Vehicle, VehicleData>(
                @"SELECT DISTINCT ON (vd.vehicle_id)
                    vd.*, v.*
                    FROM vehicle_data vd
                    JOIN vehicle v on v.id = vd.vehicle_id
                    ORDER BY vd.vehicle_id, vd.datetime DESC",
                (vehicleData, vehicle) =>
                {
                    vehicleData.vehicle = vehicle;
                    return vehicleData;
                });
            return res.ToList();
        }
    }
}
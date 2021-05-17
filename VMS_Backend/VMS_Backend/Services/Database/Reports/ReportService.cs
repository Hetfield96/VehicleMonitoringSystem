using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using VMS_Backend.Data;
using VMS_Backend.Data.DatabaseModels;

namespace VMS_Backend.Services.Database.Reports
{
    public class ReportService
    {
        private ApplicationDbContext _dbContext;
        private string DefaultConnectionString { get; }

        public ReportService(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            DefaultConnectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<VehicleData>> GenerateReportAllData(int companyId, int? vehicleId, string startDateTime, string endDateTime)
        {
            var vehicleFilter = vehicleId.HasValue ? "and vd.vehicle_id = @vehicleId" : string.Empty;
        
            await using var con = new NpgsqlConnection(DefaultConnectionString);
            var res = await con.QueryAsync<VehicleData, Vehicle, Employee, VehicleData>(
                $@"select vd.id, vd.vehicle_id as vehicleId, vd.employee_id as employeeId, vd.datetime, vd.latitude, vd.longitude, vd.rpm_engine as rpmEngine
                               ,v.id, v.name, v.number
                               ,e.id, e.first_name as firstName, e.last_name as lastName
                    from vehicle_data vd
                    join vehicle v on v.id = vd.vehicle_id and v.company_id = @companyId {vehicleFilter}
                    join employee e on e.id = vd.employee_id
                    where vd.datetime >= to_timestamp(@startDateTime, 'YYYY-MM-DD hh24:mi')
                          and vd.datetime <= to_timestamp(@endDateTime, 'YYYY-MM-DD hh24:mi')
                    order by vd.datetime, vd.vehicle_id desc;",
                (vehicleData, vehicle, employee) =>
                {
                    vehicleData.Vehicle = vehicle;
                    vehicleData.Employee = employee;
                    return vehicleData;
                },
            new {companyId, vehicleId, startDateTime, endDateTime});
            return res.ToList();
        }


    }
}
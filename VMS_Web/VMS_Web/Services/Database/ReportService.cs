using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using VMS_Web.Data;
using VMS_Web.Data.DatabaseModels;
using VMS_Web.Data.Models;

namespace VMS_Web.Services.Database
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
                $@"select vd.id, vd.vehicle_id as vehicleId, vd.employee_id as employeeId, vd.datetime, vd.latitude, vd.longitude
                               ,vd.distance_mil_control as DistanceMilControl
                               ,vd.distance_since_cc_control as DistanceSinceCcControl
                               ,vd.dtc_number as DtcNumber
                               ,vd.pending_trouble_codes as PendingTroubleCodes
                               ,vd.permanent_trouble_codes as PermanentTroubleCodes
                               ,vd.trouble_codes as TroubleCodes
                               ,vd.rpm_engine as rpmEngine
                               ,vd.absolute_load as AbsoluteLoad
                               ,vd.load as Load
                               ,vd.level_fuel as LevelFuel
                               ,vd.air_fuel_ratio as AirFuelRatio
                               ,vd.engine_coolant_temperature as EngineCoolantTemperature
                               ,vd.air_intake_temperature as AirIntakeTemperature
                               ,vd.ambient_air_temperature as AmbientAirTemperature
                               ,vd.speed as Speed
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

        public async Task<List<VehicleWorkingTimeRecord>> GenerateReportVehicleWorkingTime(int companyId, int? vehicleId, string startDateTime, string endDateTime)
        {
            var vehicleFilter = vehicleId.HasValue ? "and v.id = @vehicleId" : string.Empty;
            
            await using var con = new NpgsqlConnection(DefaultConnectionString);
            var res = await con.QueryAsync<VehicleWorkingTimeRecord>(
                $@"select 
                           concat(v.name, ' ', v.number) as vehicleName,
                           concat(e.first_name, ' ', e.last_name) as employeeName,
                           get_working_hours(vd.vehicle_id, vd.employee_id, @startDateTime, @endDateTime) as workingHours
                    from vehicle_data vd
                    join vehicle v on vd.vehicle_id = v.id 
                    join employee e on e.id = vd.employee_id
                    where v.company_id = @companyId {vehicleFilter}
                    group by vd.vehicle_id, vd.employee_id, v.name, v.number, e.first_name, e.last_name
                    order by vd.vehicle_id, vd.employee_id asc",
                new {companyId, vehicleId, startDateTime, endDateTime});
            return res.ToList();
        }
    }
}
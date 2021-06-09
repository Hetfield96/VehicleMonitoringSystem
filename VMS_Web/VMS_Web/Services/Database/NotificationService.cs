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
    public class NotificationService
    {
        private ApplicationDbContext _dbContext;
        private string DefaultConnectionString { get; }

        public NotificationService(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            DefaultConnectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<Notification>> GenerateNotificationsData(int notificationType, int companyId, int? vehicleId, string startDateTime, string endDateTime)
        {
            var vehicleFilter = vehicleId.HasValue ? "and n.vehicle_id = @vehicleId" : string.Empty;
            var notificationTypeFilter = notificationType != 0 ? "and n.type = @notificationType" : string.Empty;
        
            await using var con = new NpgsqlConnection(DefaultConnectionString);
            var res = await con.QueryAsync<Notification, Vehicle, Employee, Notification>(
                $@"select n.id, n.vehicle_id as vehicleId, n.employee_id as employeeId, n.datetime, n.latitude, n.longitude
                               ,n.message
                               ,n.type
                               ,n.geofence_id as GeofenceId
                               ,n.level_fuel as LevelFuel
                               ,n.speed as Speed
                               ,v.id, v.name, v.number
                               ,e.id, e.first_name as firstName, e.last_name as lastName
                    from notifications n
                    join vehicle v on v.id = n.vehicle_id and v.company_id = @companyId {vehicleFilter}
                    join employee e on e.id = n.employee_id
                    where n.datetime >= to_timestamp(@startDateTime, 'YYYY-MM-DD hh24:mi')
                          and n.datetime <= to_timestamp(@endDateTime, 'YYYY-MM-DD hh24:mi')
                        {notificationTypeFilter}
                    order by n.datetime, n.vehicle_id desc;",
                (notification, vehicle, employee) =>
                {
                    notification.Vehicle = vehicle;
                    notification.Employee = employee;
                    return notification;
                },
            new {companyId, vehicleId, startDateTime, endDateTime, notificationType});
            return res.ToList();
        }
    }
}
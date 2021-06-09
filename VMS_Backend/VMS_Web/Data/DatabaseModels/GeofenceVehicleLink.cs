using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Web.Data.DatabaseModels
{
    [Table("geofence_vehicle_link")]
    public class GeofenceVehicleLink
    {
        public GeofenceVehicleLink(int geofenceId, int vehicleId, DateTime startDate)
        {
            GeofenceId = geofenceId;
            VehicleId = vehicleId;
            StartDate = startDate;
            EndDate = null;
        }
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("geofence_id")]
        public int GeofenceId { get; set; }
        [ForeignKey("GeofenceId")]
        public Geofence Geofence { get; set; }
        
        [Column("vehicle_id")]
        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; }
        
        [Column("start_date")] 
        public DateTime StartDate { get; set; }
        
        [Column("end_date")] 
        public DateTime? EndDate { get; set; }
    }
}
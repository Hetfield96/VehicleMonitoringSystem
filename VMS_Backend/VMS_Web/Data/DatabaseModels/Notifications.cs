using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Web.Data.DatabaseModels
{
    [Table("notifications")]
    public class Notification
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        
        [Column("message")]
        public string Message { get; set; }
        
        [Column("type")]
        public byte Type { get; set; }
        
        [Column("geofence_id")]
        public byte GeofenceId { get; set; }
        
        [Column("vehicle_id")]
        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; }
        
        [Column("employee_id")]
        public string EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }

        [Column("datetime")] 
        public DateTime Datetime { get; set; }
        
        [Column("latitude", TypeName = "numeric")] 
        public decimal Latitude { get; set; }
        
        [Column("longitude", TypeName = "numeric")] 
        public decimal Longitude { get; set; }

        // Fuel
        [Column("level_fuel")]
        public decimal? LevelFuel { get; set; }
        
        // Speed 
        [Column("speed")]
        public byte? Speed { get; set; }
    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Web.Data.DatabaseModels
{
    [Table("vehicle_driver_link")]
    public class VehicleDriverLink
    {
        public VehicleDriverLink(string driverId, int vehicleId, DateTime startDate)
        {
            DriverId = driverId;
            VehicleId = vehicleId;
            StartDate = startDate;
            EndDate = null;
        }
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("driver_id")]
        public string DriverId { get; set; }
        [ForeignKey("DriverId")]
        public Employee Driver { get; set; }
        
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
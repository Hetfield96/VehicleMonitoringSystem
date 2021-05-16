using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.DatabaseModels
{
    [Table("vehicle_data")]
    public class VehicleData
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        
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
        
        // OBD data
        
        // Control
        // [Column("distance_mil_control")]
        // public int DistanceMilControl { get; set; }
        //
        // [Column("distance_since_cc_control")]
        // public int DistanceSinceCcControl { get; set; }
        
        // Engine
        [Column("rpm_engine")]
        public int? RpmEngine { get; set; }
        //
        // // Fuel
        // [Column("level_fuel")]
        // public byte LevelFuel { get; set; }
        //
        // [Column("consumption_rate_fuel")]
        // public byte ConsumptionRateFuel { get; set; }
        //
        // // Pressure
        // [Column("fuel_pressure")]
        // public byte FuelPressure { get; set; }
        //
        // // Temperature
        // [Column("engine_coolant_temperature")]
        // public byte EngineCoolantTemperature { get; set; }
        //
        // // Speed 
        // [Column("speed")]
        // public byte Speed { get; set; }
    }
}
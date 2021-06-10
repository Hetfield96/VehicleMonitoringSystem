using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Web.Data.DatabaseModels
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
        
        public string DatetimeString { get; set; }
        
        [Column("latitude", TypeName = "numeric")] 
        public decimal Latitude { get; set; }
        
        [Column("longitude", TypeName = "numeric")] 
        public decimal Longitude { get; set; }
        
        // OBD data
        
        // Control
        [Column("distance_mil_control")]
        public int? DistanceMilControl { get; set; }
        
        [Column("distance_since_cc_control")]
        public int? DistanceSinceCcControl { get; set; }
        
        [Column("dtc_number")]
        public byte? DtcNumber { get; set; }
        
        [Column("pending_trouble_codes")]
        public string PendingTroubleCodes { get; set; }
        
        [Column("permanent_trouble_codes")]
        public string PermanentTroubleCodes { get; set; }
        
        [Column("trouble_codes")]
        public string TroubleCodes { get; set; }
        
        // Engine
        [Column("rpm_engine")]
        public int? RpmEngine { get; set; }
        
        [Column("absolute_load")]
        public decimal? AbsoluteLoad { get; set; }
        
        [Column("load")]
        public decimal? Load { get; set; }
        
        // Fuel
        [Column("level_fuel")]
        public decimal? LevelFuel { get; set; }
        
        [Column("air_fuel_ratio")]
        public decimal? AirFuelRatio { get; set; }
        
        // Temperature
        [Column("engine_coolant_temperature")]
        public decimal? EngineCoolantTemperature { get; set; }
        
        [Column("air_intake_temperature")]
        public decimal? AirIntakeTemperature { get; set; }
        
        [Column("ambient_air_temperature")]
        public decimal? AmbientAirTemperature { get; set; }
        
        // Speed 
        [Column("speed")]
        public byte? Speed { get; set; }
    }
}
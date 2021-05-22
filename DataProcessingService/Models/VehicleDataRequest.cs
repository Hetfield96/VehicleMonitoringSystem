using System;

namespace DataProcessingService.Models
{
    public class VehicleDataRequest
    {
        public int vehicle_id { get; set; }
        
        public string employee_id { get; set; }
        
        public string datetime { get; set; }
        
        public decimal latitude { get; set; }
        
        public decimal longitude { get; set; }
        
        // OBD data 
        // Control
        public int? distance_mil_control { get; set; }
        
        public int? distance_since_cc_control { get; set; }
        
        public byte? dtc_number { get; set; }
        
        public string pending_trouble_codes { get; set; }
        
        public string permanent_trouble_codes { get; set; }
        
        public string trouble_codes { get; set; }
        
        // Engine
        public int? rpm_engine { get; set; }
        
        public decimal? absolute_load { get; set; }
        
        public decimal? load { get; set; }
        
        // Fuel
        public decimal? level_fuel { get; set; }
        
        public decimal? air_fuel_ratio { get; set; }
        
        // Temperature
        public decimal? engine_coolant_temperature { get; set; }
        
        public decimal? air_intake_temperature { get; set; }
        
        public decimal? ambient_air_temperature { get; set; }
        
        // Speed 
        public byte? speed { get; set; }

    }
}
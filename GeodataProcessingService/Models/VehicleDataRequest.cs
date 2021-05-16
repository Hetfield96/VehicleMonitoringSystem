using System;

namespace GeodataProcessingService.Models
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
        // public int DistanceMilControl { get; set; }
        //
        // public int DistanceSinceCcControl { get; set; }
        
        // Engine
        public int? rpm_engine { get; set; }
        
        // // Fuel
        // public byte LevelFuel { get; set; }
        //
        // public byte ConsumptionRateFuel { get; set; }
        //
        // // Pressure
        // public byte FuelPressure { get; set; }
        //
        // // Temperature
        // public byte EngineCoolantTemperature { get; set; }
        //
        // // Speed 
        // public byte Speed { get; set; }
    }
}
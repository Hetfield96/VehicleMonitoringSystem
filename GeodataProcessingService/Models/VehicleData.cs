using System;
using System.Globalization;

namespace GeodataProcessingService.Models
{
    [Dapper.Contrib.Extensions.Table ("vehicle_data")]
    public class VehicleData
    {
        public int vehicle_id { get; set; }
        
        public string employee_id { get; set; }
        
        public DateTime datetime { get; set; }
        
        public decimal latitude { get; set; }
        
        public decimal longitude { get; set; }
        
        // OBD data 
        
        // Control
        // public int DistanceMilControl { get; set; }
        //
        // public int DistanceSinceCcControl { get; set; }
        
        // Engine
        public int? rpm_engine { get; set; }
        //
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

        public VehicleData(VehicleDataRequest vehicleDataRequest)
        {
            this.vehicle_id = vehicleDataRequest.vehicle_id;
            this.employee_id = vehicleDataRequest.employee_id;
            this.datetime = DateTime.ParseExact(vehicleDataRequest.datetime, "yyMMddHHmmss", CultureInfo.InvariantCulture);
            this.latitude = vehicleDataRequest.latitude;
            this.longitude = vehicleDataRequest.longitude;
            // this.DistanceMilControl = vehicleDataRequest.DistanceMilControl;
            // this.DistanceSinceCcControl = vehicleDataRequest.DistanceSinceCcControl;
            this.rpm_engine = vehicleDataRequest.rpm_engine;
            // this.LevelFuel = vehicleDataRequest.LevelFuel;
            // this.ConsumptionRateFuel = vehicleDataRequest.ConsumptionRateFuel;
            // this.FuelPressure = vehicleDataRequest.FuelPressure;
            // this.EngineCoolantTemperature = vehicleDataRequest.EngineCoolantTemperature;
            // this.Speed = vehicleDataRequest.Speed;
        }

        public static VehicleData[] GetArray(VehicleDataRequest[] vehicleDataRequests)
        {
            VehicleData[] res = new VehicleData[vehicleDataRequests.Length];
            for (int i = 0; i < vehicleDataRequests.Length; ++i)
            {
                res[i] = new VehicleData(vehicleDataRequests[i]);
            }

            return res;
        }
    }
}
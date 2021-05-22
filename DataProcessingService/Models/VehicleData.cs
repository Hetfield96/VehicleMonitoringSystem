using System;
using System.Globalization;

namespace DataProcessingService.Models
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

        public VehicleData(VehicleDataRequest vehicleDataRequest)
        {
            vehicle_id = vehicleDataRequest.vehicle_id;
            employee_id = vehicleDataRequest.employee_id;
            datetime = DateTime.ParseExact(vehicleDataRequest.datetime, "yyMMddHHmmss", CultureInfo.InvariantCulture);
            latitude = vehicleDataRequest.latitude;
            longitude = vehicleDataRequest.longitude;

            distance_mil_control = vehicleDataRequest.distance_mil_control;
            distance_since_cc_control = vehicleDataRequest.distance_since_cc_control;
            dtc_number = vehicleDataRequest.dtc_number;
            pending_trouble_codes = vehicleDataRequest.pending_trouble_codes;
            permanent_trouble_codes = vehicleDataRequest.permanent_trouble_codes;
            trouble_codes = vehicleDataRequest.trouble_codes;
            rpm_engine = vehicleDataRequest.rpm_engine;
            absolute_load = vehicleDataRequest.absolute_load;
            load = vehicleDataRequest.load;
            level_fuel = vehicleDataRequest.level_fuel;
            air_fuel_ratio = vehicleDataRequest.air_fuel_ratio;
            engine_coolant_temperature = vehicleDataRequest.engine_coolant_temperature;
            air_intake_temperature = vehicleDataRequest.air_intake_temperature;
            ambient_air_temperature = vehicleDataRequest.ambient_air_temperature;
            speed = vehicleDataRequest.speed;
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
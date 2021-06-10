using System;
using System.Globalization;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using VMS_Web.Data.DatabaseModels;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataProcessingController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DataProcessingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public ActionResult<string> Post([FromBody] VehicleData[] vehicleData)
        {
            foreach (var vd in vehicleData)
            {
                vd.Datetime = DateTime.ParseExact(vd.DatetimeString, "yyMMddHHmmss", CultureInfo.InvariantCulture);
            }
            
            using var con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            con.Insert(vehicleData);
            
            var msg = $"DataProcessingController: synced, length = {vehicleData.Length}, datetime = {DateTime.Now:YYYY-MM-DD HH:mm}";
            Console.WriteLine(msg);
            return Ok(msg);
        }
    }
}
using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Backend.Data.Migrations
{
    public partial class obdStatistics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "absolute_load",
                table: "vehicle_data",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "air_fuel_ratio",
                table: "vehicle_data",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "air_intake_temperature",
                table: "vehicle_data",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ambient_air_temperature",
                table: "vehicle_data",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "distance_mil_control",
                table: "vehicle_data",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "distance_since_cc_control",
                table: "vehicle_data",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "dtc_number",
                table: "vehicle_data",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "engine_coolant_temperature",
                table: "vehicle_data",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "level_fuel",
                table: "vehicle_data",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "load",
                table: "vehicle_data",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "pending_trouble_codes",
                table: "vehicle_data",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "permanent_trouble_codes",
                table: "vehicle_data",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "speed",
                table: "vehicle_data",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "trouble_codes",
                table: "vehicle_data",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "absolute_load",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "air_fuel_ratio",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "air_intake_temperature",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "ambient_air_temperature",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "distance_mil_control",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "distance_since_cc_control",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "dtc_number",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "engine_coolant_temperature",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "level_fuel",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "load",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "pending_trouble_codes",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "permanent_trouble_codes",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "speed",
                table: "vehicle_data");

            migrationBuilder.DropColumn(
                name: "trouble_codes",
                table: "vehicle_data");
        }
    }
}

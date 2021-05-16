using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Backend.Data.Migrations
{
    public partial class vehicleObdData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "rpm_engine",
                table: "vehicle_data",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_vehicle_driver_link_driver_id",
                table: "vehicle_driver_link",
                column: "driver_id");

            migrationBuilder.AddForeignKey(
                name: "FK_vehicle_driver_link_employee_driver_id",
                table: "vehicle_driver_link",
                column: "driver_id",
                principalTable: "employee",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_vehicle_driver_link_employee_driver_id",
                table: "vehicle_driver_link");

            migrationBuilder.DropIndex(
                name: "IX_vehicle_driver_link_driver_id",
                table: "vehicle_driver_link");

            migrationBuilder.DropColumn(
                name: "rpm_engine",
                table: "vehicle_data");
        }
    }
}

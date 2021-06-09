using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Web.Data.Migrations
{
    public partial class geofenceRestrictionId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_enter_restricted",
                table: "geofence");

            migrationBuilder.DropColumn(
                name: "is_leave_restricted",
                table: "geofence");

            migrationBuilder.AddColumn<byte>(
                name: "restriction_id",
                table: "geofence",
                type: "smallint",
                nullable: false,
                defaultValue: (byte)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "restriction_id",
                table: "geofence");

            migrationBuilder.AddColumn<bool>(
                name: "is_enter_restricted",
                table: "geofence",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "is_leave_restricted",
                table: "geofence",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}

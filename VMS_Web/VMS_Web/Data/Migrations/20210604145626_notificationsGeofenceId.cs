using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Web.Data.Migrations
{
    public partial class notificationsGeofenceId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "geofence_id",
                table: "notifications",
                type: "smallint",
                nullable: false,
                defaultValue: (byte)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "geofence_id",
                table: "notifications");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Web.Data.Migrations
{
    public partial class geofenceColor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "color",
                table: "geofence",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "color",
                table: "geofence");
        }
    }
}

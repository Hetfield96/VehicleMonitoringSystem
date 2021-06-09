using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Web.Data.Migrations
{
    public partial class geofenceCompanyId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "company_id",
                table: "geofence",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_geofence_company_id",
                table: "geofence",
                column: "company_id");

            migrationBuilder.AddForeignKey(
                name: "FK_geofence_company_company_id",
                table: "geofence",
                column: "company_id",
                principalTable: "company",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_geofence_company_company_id",
                table: "geofence");

            migrationBuilder.DropIndex(
                name: "IX_geofence_company_id",
                table: "geofence");

            migrationBuilder.DropColumn(
                name: "company_id",
                table: "geofence");
        }
    }
}

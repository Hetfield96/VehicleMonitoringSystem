using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Web.Data.Migrations
{
    public partial class geofenceCoordsString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "coords",
                table: "geofence",
                type: "text",
                nullable: true,
                oldClrType: typeof(decimal[]),
                oldType: "numeric[]",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal[]>(
                name: "coords",
                table: "geofence",
                type: "numeric[]",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}

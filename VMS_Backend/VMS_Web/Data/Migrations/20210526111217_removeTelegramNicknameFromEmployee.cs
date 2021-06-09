using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Web.Data.Migrations
{
    public partial class removeTelegramNicknameFromEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "telegram_nickname",
                table: "employee");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "telegram_nickname",
                table: "employee",
                type: "character varying(34)",
                maxLength: 34,
                nullable: true);
        }
    }
}

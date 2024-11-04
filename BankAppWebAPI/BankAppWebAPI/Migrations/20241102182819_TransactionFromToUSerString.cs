using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankAppWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class TransactionFromToUSerString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromUserId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ToUserId",
                table: "Transactions");

            migrationBuilder.AddColumn<string>(
                name: "FromUser",
                table: "Transactions",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ToUser",
                table: "Transactions",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromUser",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ToUser",
                table: "Transactions");

            migrationBuilder.AddColumn<int>(
                name: "FromUserId",
                table: "Transactions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ToUserId",
                table: "Transactions",
                type: "int",
                nullable: true);
        }
    }
}

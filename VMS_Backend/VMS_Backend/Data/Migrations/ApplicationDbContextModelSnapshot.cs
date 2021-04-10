﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using VMS_Backend.Data;

namespace VMS_Backend.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("VMS_Backend.Data.Models.ChatMessage", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CompanyId")
                        .HasColumnType("integer")
                        .HasColumnName("company_id");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("date");

                    b.Property<string>("ReceiverId")
                        .HasColumnType("text")
                        .HasColumnName("receiver_id");

                    b.Property<string>("SenderId")
                        .HasColumnType("text")
                        .HasColumnName("sender_id");

                    b.Property<string>("Text")
                        .HasMaxLength(2000)
                        .HasColumnType("character varying(2000)")
                        .HasColumnName("text");

                    b.Property<bool>("Unread")
                        .HasColumnType("boolean")
                        .HasColumnName("unread");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("chat_message");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("company");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.CompanySettings", b =>
                {
                    b.Property<int>("CompanyId")
                        .HasColumnType("integer")
                        .HasColumnName("company_id");

                    b.Property<int>("AndroidIntervalRecording")
                        .HasColumnType("integer")
                        .HasColumnName("android_interval_recording");

                    b.Property<int>("AndroidIntervalSynchronization")
                        .HasColumnType("integer")
                        .HasColumnName("android_interval_synchronization");

                    b.HasKey("CompanyId");

                    b.ToTable("company_settings");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.Employee", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<int>("CompanyId")
                        .HasColumnType("integer")
                        .HasColumnName("company_id");

                    b.Property<string>("Email")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("last_name");

                    b.Property<short>("RoleId")
                        .HasColumnType("smallint")
                        .HasColumnName("role_id");

                    b.Property<string>("TelegramNickname")
                        .HasMaxLength(34)
                        .HasColumnType("character varying(34)")
                        .HasColumnName("telegram_nickname");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("RoleId");

                    b.ToTable("employee");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.Role", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("role");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.Vehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CompanyId")
                        .HasColumnType("integer")
                        .HasColumnName("company_id");

                    b.Property<string>("Model")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("model");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("name");

                    b.Property<string>("Number")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)")
                        .HasColumnName("number");

                    b.Property<short>("ProductionYear")
                        .HasColumnType("smallint")
                        .HasColumnName("production_year");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("vehicle");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.VehicleData", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("datetime")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("datetime");

                    b.Property<decimal>("latitude")
                        .HasColumnType("numeric")
                        .HasColumnName("latitude");

                    b.Property<decimal>("longitude")
                        .HasColumnType("numeric")
                        .HasColumnName("longitude");

                    b.Property<string>("user_id")
                        .HasColumnType("text")
                        .HasColumnName("user_id");

                    b.Property<int>("vehicle_id")
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    b.HasKey("id");

                    b.HasIndex("user_id");

                    b.HasIndex("vehicle_id");

                    b.ToTable("vehicle_data");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.VehicleDriverLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("DriverId")
                        .HasColumnType("text")
                        .HasColumnName("driver_id");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("end_date");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("start_date");

                    b.Property<int>("VehicleId")
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId");

                    b.ToTable("vehicle_driver_link");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.WorkTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Comment")
                        .HasColumnType("text")
                        .HasColumnName("comment");

                    b.Property<int>("CompanyId")
                        .HasColumnType("integer")
                        .HasColumnName("company_id");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("create_date");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<string>("DriverId")
                        .HasColumnType("text")
                        .HasColumnName("driver_id");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("due_date");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("OperatorId")
                        .HasColumnType("text")
                        .HasColumnName("operator_id");

                    b.Property<short>("StatusId")
                        .HasColumnType("smallint")
                        .HasColumnName("status_id");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("DriverId");

                    b.HasIndex("OperatorId");

                    b.HasIndex("StatusId");

                    b.ToTable("work_task");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.WorkTaskStatus", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("work_task_status");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.ChatMessage", b =>
                {
                    b.HasOne("VMS_Backend.Data.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VMS_Backend.Data.Models.Employee", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId");

                    b.HasOne("VMS_Backend.Data.Models.Employee", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");

                    b.Navigation("Company");

                    b.Navigation("Receiver");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.CompanySettings", b =>
                {
                    b.HasOne("VMS_Backend.Data.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.Employee", b =>
                {
                    b.HasOne("VMS_Backend.Data.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VMS_Backend.Data.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.Vehicle", b =>
                {
                    b.HasOne("VMS_Backend.Data.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.VehicleData", b =>
                {
                    b.HasOne("VMS_Backend.Data.Models.Employee", "employee")
                        .WithMany()
                        .HasForeignKey("user_id");

                    b.HasOne("VMS_Backend.Data.Models.Vehicle", "vehicle")
                        .WithMany()
                        .HasForeignKey("vehicle_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("employee");

                    b.Navigation("vehicle");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.VehicleDriverLink", b =>
                {
                    b.HasOne("VMS_Backend.Data.Models.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("VMS_Backend.Data.Models.WorkTask", b =>
                {
                    b.HasOne("VMS_Backend.Data.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VMS_Backend.Data.Models.Employee", "Driver")
                        .WithMany()
                        .HasForeignKey("DriverId");

                    b.HasOne("VMS_Backend.Data.Models.Employee", "Operator")
                        .WithMany()
                        .HasForeignKey("OperatorId");

                    b.HasOne("VMS_Backend.Data.Models.WorkTaskStatus", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Driver");

                    b.Navigation("Operator");

                    b.Navigation("Status");
                });
#pragma warning restore 612, 618
        }
    }
}

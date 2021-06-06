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

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.ChatMessage", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AttachmentName")
                        .HasMaxLength(60)
                        .HasColumnType("character varying(60)")
                        .HasColumnName("attachment_name");

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
                        .HasColumnType("text")
                        .HasColumnName("text");

                    b.Property<string>("Type")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)")
                        .HasColumnName("type");

                    b.Property<bool>("Unread")
                        .HasColumnType("boolean")
                        .HasColumnName("unread");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("chat_message");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Company", b =>
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

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.CompanySettings", b =>
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

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Employee", b =>
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

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("RoleId");

                    b.ToTable("employee");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Geofence", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Color")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)")
                        .HasColumnName("color");

                    b.Property<int>("CompanyId")
                        .HasColumnType("integer")
                        .HasColumnName("company_id");

                    b.Property<string>("Coords")
                        .HasColumnType("text")
                        .HasColumnName("coords");

                    b.Property<bool>("IsEnterRestricted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_enter_restricted");

                    b.Property<bool>("IsLeaveRestricted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_leave_restricted");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("geofence");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.GeofenceVehicleLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("end_date");

                    b.Property<int>("GeofenceId")
                        .HasColumnType("integer")
                        .HasColumnName("geofence_id");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("start_date");

                    b.Property<int>("VehicleId")
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    b.HasKey("Id");

                    b.HasIndex("GeofenceId");

                    b.HasIndex("VehicleId");

                    b.ToTable("geofence_vehicle_link");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Notification", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("Datetime")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("datetime");

                    b.Property<string>("EmployeeId")
                        .HasColumnType("text")
                        .HasColumnName("employee_id");

                    b.Property<byte>("GeofenceId")
                        .HasColumnType("smallint")
                        .HasColumnName("geofence_id");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("numeric")
                        .HasColumnName("latitude");

                    b.Property<decimal?>("LevelFuel")
                        .HasColumnType("numeric")
                        .HasColumnName("level_fuel");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("numeric")
                        .HasColumnName("longitude");

                    b.Property<string>("Message")
                        .HasColumnType("text")
                        .HasColumnName("message");

                    b.Property<byte?>("Speed")
                        .HasColumnType("smallint")
                        .HasColumnName("speed");

                    b.Property<byte>("Type")
                        .HasColumnType("smallint")
                        .HasColumnName("type");

                    b.Property<int>("VehicleId")
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("VehicleId");

                    b.ToTable("notifications");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Role", b =>
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

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Vehicle", b =>
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

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.VehicleData", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<decimal?>("AbsoluteLoad")
                        .HasColumnType("numeric")
                        .HasColumnName("absolute_load");

                    b.Property<decimal?>("AirFuelRatio")
                        .HasColumnType("numeric")
                        .HasColumnName("air_fuel_ratio");

                    b.Property<decimal?>("AirIntakeTemperature")
                        .HasColumnType("numeric")
                        .HasColumnName("air_intake_temperature");

                    b.Property<decimal?>("AmbientAirTemperature")
                        .HasColumnType("numeric")
                        .HasColumnName("ambient_air_temperature");

                    b.Property<DateTime>("Datetime")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("datetime");

                    b.Property<int?>("DistanceMilControl")
                        .HasColumnType("integer")
                        .HasColumnName("distance_mil_control");

                    b.Property<int?>("DistanceSinceCcControl")
                        .HasColumnType("integer")
                        .HasColumnName("distance_since_cc_control");

                    b.Property<byte?>("DtcNumber")
                        .HasColumnType("smallint")
                        .HasColumnName("dtc_number");

                    b.Property<string>("EmployeeId")
                        .HasColumnType("text")
                        .HasColumnName("employee_id");

                    b.Property<decimal?>("EngineCoolantTemperature")
                        .HasColumnType("numeric")
                        .HasColumnName("engine_coolant_temperature");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("numeric")
                        .HasColumnName("latitude");

                    b.Property<decimal?>("LevelFuel")
                        .HasColumnType("numeric")
                        .HasColumnName("level_fuel");

                    b.Property<decimal?>("Load")
                        .HasColumnType("numeric")
                        .HasColumnName("load");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("numeric")
                        .HasColumnName("longitude");

                    b.Property<string>("PendingTroubleCodes")
                        .HasColumnType("text")
                        .HasColumnName("pending_trouble_codes");

                    b.Property<string>("PermanentTroubleCodes")
                        .HasColumnType("text")
                        .HasColumnName("permanent_trouble_codes");

                    b.Property<int?>("RpmEngine")
                        .HasColumnType("integer")
                        .HasColumnName("rpm_engine");

                    b.Property<byte?>("Speed")
                        .HasColumnType("smallint")
                        .HasColumnName("speed");

                    b.Property<string>("TroubleCodes")
                        .HasColumnType("text")
                        .HasColumnName("trouble_codes");

                    b.Property<int>("VehicleId")
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("VehicleId");

                    b.ToTable("vehicle_data");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.VehicleDriverLink", b =>
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

                    b.HasIndex("DriverId");

                    b.HasIndex("VehicleId");

                    b.ToTable("vehicle_driver_link");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.WorkTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.WorkTaskComment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AttachmentName")
                        .HasMaxLength(60)
                        .HasColumnType("character varying(60)")
                        .HasColumnName("attachment_name");

                    b.Property<string>("AuthorId")
                        .HasColumnType("text")
                        .HasColumnName("author_id");

                    b.Property<int>("CompanyId")
                        .HasColumnType("integer")
                        .HasColumnName("company_id");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("date");

                    b.Property<int>("TaskId")
                        .HasColumnType("integer")
                        .HasColumnName("task_id");

                    b.Property<string>("Text")
                        .HasMaxLength(5000)
                        .HasColumnType("character varying(5000)")
                        .HasColumnName("text");

                    b.Property<string>("Type")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)")
                        .HasColumnName("type");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("TaskId");

                    b.ToTable("work_task_comment");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.WorkTaskStatus", b =>
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

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.ChatMessage", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Employee", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId");

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Employee", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");

                    b.Navigation("Company");

                    b.Navigation("Receiver");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.CompanySettings", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Employee", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Geofence", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.GeofenceVehicleLink", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Geofence", "Geofence")
                        .WithMany()
                        .HasForeignKey("GeofenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Geofence");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Notification", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId");

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.Vehicle", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.VehicleData", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId");

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.VehicleDriverLink", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Employee", "Driver")
                        .WithMany()
                        .HasForeignKey("DriverId");

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Driver");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.WorkTask", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Employee", "Driver")
                        .WithMany()
                        .HasForeignKey("DriverId");

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Employee", "Operator")
                        .WithMany()
                        .HasForeignKey("OperatorId");

                    b.HasOne("VMS_Backend.Data.DatabaseModels.WorkTaskStatus", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Driver");

                    b.Navigation("Operator");

                    b.Navigation("Status");
                });

            modelBuilder.Entity("VMS_Backend.Data.DatabaseModels.WorkTaskComment", b =>
                {
                    b.HasOne("VMS_Backend.Data.DatabaseModels.Employee", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.HasOne("VMS_Backend.Data.DatabaseModels.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VMS_Backend.Data.DatabaseModels.WorkTask", "Task")
                        .WithMany()
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Company");

                    b.Navigation("Task");
                });
#pragma warning restore 612, 618
        }
    }
}

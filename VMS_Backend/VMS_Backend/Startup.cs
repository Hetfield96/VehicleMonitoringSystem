using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VMS_Backend.Data;
using VMS_Backend.Services.Database;
using VMS_Backend.Services.Database.Reports;
using VMS_Backend.Services.SignalR;
using Microsoft.OpenApi.Models;


namespace VMS_Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // CORS
            services.AddCors();
            
            // Database services
            services.AddScoped<CompanyService>();
            services.AddScoped<CompanySettingsService>();
            services.AddScoped<EmployeeService>();
            services.AddScoped<RoleService>();
            services.AddScoped<VehicleDataService>();
            services.AddScoped<VehicleDriverLinkService>();
            services.AddScoped<VehicleService>();
            services.AddScoped<WorkTaskService>();
            services.AddScoped<WorkTaskCommentService>();
            services.AddScoped<ChatService>();
            services.AddScoped<ReportService>();
            services.AddScoped<GeofenceService>();

            // SignalR services
            // services.AddScoped<ChatHub>();
            
            // SignalR - for chat
            services.AddSignalR();

            services.AddControllers();
            
            // Swagger
            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });

            
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ApplicationDbContext>(opt =>
                opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            
            // Dapper mapping configuration
            // DapperMappingConfiguration.Configure();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime hostApplicationLifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            // CORS
            // CORS middleware
            app.UseCors(builder =>
            {
                // TODO hide ips
                builder
                    .WithOrigins("http://localhost:3000") //Web-frontend Source
                    .WithOrigins("http://192.168.1.71") // Mobile source
                    .WithOrigins("http://localhost")
                    .WithOrigins("http://192.168.104.6:5000") // Mobile source
                    .AllowAnyHeader()
                    .WithMethods("GET", "POST", "DELETE", "PUT")
                    .AllowCredentials();
            });

            // app.UseHttpsRedirection();

            app.UseRouting();
            
            // Swagger
            app.UseSwagger();
            
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "My API V1");
            });

            // app.UseAuthorization();
            
            // hostApplicationLifetime.ApplicationStarted.Register(() =>
            // {
            //     var serviceProvider = app.ApplicationServices;
            //     var chatHub = (IHubContext<ChatHub>)serviceProvider.GetService(typeof(IHubContext<ChatHub>));
            //
            //     var timer = new System.Timers.Timer(1000);
            //     timer.Enabled = true;
            //     timer.Elapsed += delegate (object sender, System.Timers.ElapsedEventArgs e) {
            //         chatHub.Clients.All.SendAsync("setTime", DateTime.Now.ToString("dddd d MMMM yyyy HH:mm:ss"));
            //     };
            //     timer.Start();                
            // });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chatHub");
                endpoints.MapControllers();
            });
        }
    }
}
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VMS_Web.Data;
using VMS_Web.Services.Database;
using VMS_Web.Services.SignalR;
using Microsoft.OpenApi.Models;

namespace VMS_Web
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
            services.AddScoped<NotificationService>();
            services.AddScoped<GeofenceService>();
            services.AddScoped<GeofenceVehicleLinkService>();

            // SignalR services
            // services.AddScoped<ChatHub>();
            
            // SignalR - for chat
            services.AddSignalR();

            services.AddControllers();
            
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            
            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
            
            services.AddMvc();

            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ApplicationDbContext>(opt =>
                opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime hostApplicationLifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // CORS middleware
            app.UseCors(builder =>
            {
                builder
                    .AllowAnyHeader()
                    .WithMethods("GET", "POST", "DELETE", "PUT")
                    .AllowCredentials()
                    .SetIsOriginAllowed(hostName => true);
            });

            // app.UseHttpsRedirection();
            
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            
            // app.UseAuthorization();
            
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("api/chatHub");
                endpoints.MapControllers();
            });
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
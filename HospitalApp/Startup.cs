using HospitalApp.Dal;
using HospitalApp.Dal.Models;
using HospitalApp.Services;
using HospitalApp.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace HospitalApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddDbContext<HospitalDbContext>();
            services.AddTransient<IHospitalService, HospitalService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            using (var db = new HospitalDbContext())
            {
                db.Hospitals.Add(new Hospital()
                {
                    Address = $"8616 Lawrence St. West Deptford, NJ 08096",
                    HospitalCode = Guid.NewGuid().ToString(),
                    ManagerName = "Macdara Anne-Marie",
                    Name = "West Hospital",
                    HealthcareIndustryNumber = new Random().Next(100000000, 999999999).ToString()
                });

                db.Hospitals.Add(new Hospital()
                {
                    Address = $"7242 Fremont Ave. Lake Worth, FL 33460",
                    HospitalCode = Guid.NewGuid().ToString(),
                    ManagerName = "Kaniehtiio Talia",
                    Name = "Fremont Ave Hospital",
                    HealthcareIndustryNumber = new Random().Next(100000000, 999999999).ToString()
                });

                db.Hospitals.Add(new Hospital()
                {
                    Address = $"645 Joy Ridge Rd. Rosemount, MN 55068",
                    HospitalCode = Guid.NewGuid().ToString(),
                    ManagerName = "Lyubochka Noël",
                    Name = "Ridge Center Hospital",
                    HealthcareIndustryNumber = new Random().Next(100000000, 999999999).ToString()
                });

                db.Hospitals.Add(new Hospital()
                {
                    Address = $"284 Highland Court Satellite Beach, FL 32937",
                    HospitalCode = Guid.NewGuid().ToString(),
                    ManagerName = "Ashwin Guðrøðr",
                    Name = "Court Hospital",
                    HealthcareIndustryNumber = new Random().Next(100000000, 999999999).ToString()
                });

                db.SaveChanges();
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
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

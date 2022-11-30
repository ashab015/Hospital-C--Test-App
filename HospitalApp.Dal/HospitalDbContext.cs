using System;
using HospitalApp.Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalApp.Dal
{
    public class HospitalDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "HospitalDb");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Hospital> Hospitals { get; set; }
    }
}

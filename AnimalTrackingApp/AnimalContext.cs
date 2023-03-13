using AnimalTrackingApp.Component;
using Microsoft.EntityFrameworkCore;

namespace AnimalTrackingApp
{
    public class AnimalContext : DbContext
    {
        public DbSet<Animal> Animals { get; set; }
        public DbSet<AnimalType> AnimalTypes { get; set; }
        //public DbSet<LocationPoint> LocationPoints { get; set; }
        //public DbSet<AnimalVisitedLocation> AnimalVisitedLocations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=your_server;Initial Catalog=your_database;Integrated Security=True");
        }
    }
}

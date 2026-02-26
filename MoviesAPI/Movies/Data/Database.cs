using Microsoft.EntityFrameworkCore;
using Movies.Models;

namespace Movies.Data;

public class Database
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }

        public DbSet<Movie> Movies => Set<Movie>();
        public DbSet<Actor>  Actors => Set<Actor>();
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Movie>()
                .HasIndex(m => m.Title);

            builder.Entity<Movie>()
                .HasIndex(m => m.Genre);

            builder.Entity<Actor>()
                .HasIndex(a => a.Name);
        }
    }
}
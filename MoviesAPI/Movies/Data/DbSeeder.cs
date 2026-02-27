using Bogus;
using Microsoft.EntityFrameworkCore;
using Movies.Models;

namespace Movies.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(Database.DatabaseContext context)
    {
        var availableMovies = await context.Movies.ToListAsync();
        if (availableMovies.Count > 0) return;

        var actorGenerator = new Faker<Actor>()
            .RuleFor(a => a.Name, f => f.Name.FullName());
        var mockActors = actorGenerator.Generate(100);

        var movieGenerator = new Faker<Movie>()
            .RuleFor(movie => movie.Title, f => string.Join(" ", f.Lorem.Words()))
            .RuleFor(movie => movie.Genre, f => f.PickRandom(new[] { "Action", "Drama", "Comedy", "Sci-Fi", "Horror" }))
            .RuleFor(movie => movie.Year,  f => f.Random.Int(1980, 2026))
            .RuleFor(movie => movie.ImageUrl, f => f.Image.PicsumUrl(300, 400))
            .RuleFor(movie => movie.Actors, f => 
            {
                var randomActorPerMovie = f.Random.Int(1, 5);
                return f.PickRandom(mockActors, randomActorPerMovie).ToList();
            });
        var mockMovies = movieGenerator.Generate(100);
        await context.Actors.AddRangeAsync(mockActors);
        await context.Movies.AddRangeAsync(mockMovies);
        await context.SaveChangesAsync();
        

    }
}
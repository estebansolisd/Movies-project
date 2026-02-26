using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Movies.Data;
using Movies.Models;

namespace Movies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly Database.DatabaseContext _context;
        public MoviesController(Database.DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Movie>>> SearchMovies(
            [FromQuery]string? title,
            [FromQuery]string? genre,
            [FromQuery]string? actor
        )
        {
            var result = await _context.Movies
                .Where(movie => string.IsNullOrWhiteSpace(title) || movie.Title.Contains(title))
                .Where(movie => string.IsNullOrWhiteSpace(genre) || movie.Genre.Contains(genre))
                .Where(movie => string.IsNullOrWhiteSpace(actor) || movie.Actors.Any(act => act.Name.Contains(actor)))
                .Include(movie => movie.Actors)
                .ToListAsync();
            
            return Ok(result);
        }

    }
}
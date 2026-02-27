using System.ComponentModel.DataAnnotations;

namespace Movies.Models;

public class Movie
{
    
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(150)]
    public string Genre { get; set; } = String.Empty;
    
    [Required]
    [MaxLength(150)]
    public string Title { get; set; } =  string.Empty;
    
    public int Year { get; set; }
    
    public string ImageUrl { get; set; } = String.Empty;
    
    public ICollection<Actor> Actors { get; set; } = new List<Actor>();
}   
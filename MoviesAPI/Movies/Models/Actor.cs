namespace Movies.Models;

public class Actor
{
    public Guid Id { get; set; }
    public string Name  { get; set; } = String.Empty;
    
    public ICollection<Movie> Movies { get; set; } = new HashSet<Movie>();
}
namespace Movies.DTOs;

public class MovieDto
{
    public Guid Id { get; set; }
    public string Genre { get; set; } = String.Empty;
    public string Title { get; set; } =  string.Empty;
    public int Year { get; set; }
    public List<ActorDto> Actors { get; set; } = new();
}
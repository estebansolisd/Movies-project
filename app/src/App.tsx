import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { fetchMovies } from "@/features/moviesSlice";
import store, { StateType } from "@/store";
import { useSelector } from "react-redux";
import { GENRE } from "./constants";
// To accomplish the requirements
import styled from "styled-components";

const Container = styled.div`
  flexGrow: 1
`

const App: React.FC = () => {
  const [search, setSearch] = useState({
    actor: "",
    title: "",
    genre: "",
  });

  const { status, movies } = useSelector((state: StateType) => state.movies);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    store.dispatch(fetchMovies(search));
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            placeholder="Search title of movie..."
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            name="actor"
            label="Actor"
            variant="outlined"
            placeholder="Search actor..."
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label-genre">Genre</InputLabel>
            <Select
              labelId="select-label-genre"
              id="demo-simple-select"
              value={search.genre}
              label="Genre"
              onChange={handleChange}
              name="genre"
            >
              {GENRE.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <LinearProgress
            sx={{ visibility: status === "loading" ? "unset" : "hidden" }}
          />
        </Grid>
        <Grid size={{ xs: 12 }} display="flex" gap={2}>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid size={{ xs: 12, md: 3 }} key={movie.id}>
                <Card sx={{ height: 200 }}>
                  <CardHeader title={movie.title} />
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.primary" }}
                    >
                      <b>Genre:</b> {movie.genre}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.primary" }}
                    >
                      <b>Year:</b>  {movie.year}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      <b>Actors:</b>{" "}
                      {movie.actors.map((a) => a.name).join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;

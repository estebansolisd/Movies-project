import { Movie, SearchQuery } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// omit imports and state

const initialState = {
  movies: [] as Movie[],
  status: "idle",
};

const API_URL = "http://localhost:5001/api/movies"

export const fetchMovies = createAsyncThunk<Movie[], SearchQuery>(
  "todos/fetchMovies",
  async (params) => {
    const response = await axios.get<Movie[]>(`${API_URL}/search`, { params });
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // omit reducer cases
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "success";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.movies = [];
        state.status = "error";
      });
  },
});


export default moviesSlice;
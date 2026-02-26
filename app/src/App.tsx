import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const App: React.FC = () => {
  const [search, setSearch] = useState({
    actor: "",
    title: "",
    genre: ""    
  })

  const handleChange = e => {
    const { name, value } = e.target;

    setSearch(prev => ({...prev, [name]: value}));
  }

  return (
    <Box sx={{  flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4}}>
          <TextField 
            name="title"
            label="Title"
            variant="outlined"
            placeholder="Search title of movie..."
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4}}>
          <TextField 
            name="actor"
            label="Actor"
            variant="outlined"
            placeholder="Search actor..."
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2}}>
          <TextField 
            name="genre"
            label="Genre"
            variant="outlined"
            placeholder="Search genre..."
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2}}>
          <Button color="primary" variant="contained" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { API_URL } from "../index";
import { Grid, Typography } from "@mui/material";
import TutorialOverview from "./TutorialOverview";
import formatDate from "../functions";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Frontpage(props) {
  const { loggedIn, setLoggedIn } = props;
  const [tutorials, setTutorials] = useState([]);
  const [tutorialsInitial, setTutorialsInitial] = useState([]);
  const [rating, setRating] = React.useState("");

  const handleChanges = (event) => {
    setRating(event.target.value);
    let filteredSearch = tutorialsInitial.filter((item) => {
      if (item.ratingStats) {
        return item.ratingStats.avgRating >= event.target.value;
      }
    });
    setTutorials(filteredSearch);
  };
  const handleClick = (e) => {
    // console.log("com", tutorialsInitial.init_array);
     console.log("original", tutorialsInitial);

    let filteredSearch = tutorialsInitial.filter((item) => {
      if (item.owner) {
        console.log("original", e.toLowerCase());

        return (
          item.title.toLowerCase().includes(e.toLowerCase()) ||
          item.content.toLowerCase().includes(e.toLowerCase()) ||
          item.owner.username.toLowerCase().includes(e.toLowerCase()) ||
          item.tags.includes(e.toLowerCase())
        );
      } else {
        return (
          item.title.toLowerCase().includes(e.toLowerCase()) ||
          item.content.toLowerCase().includes(e.toLowerCase())
        );
      }
    });
    setTutorials(filteredSearch);
  };

  useEffect(() => {
    axios.get(`${API_URL}/tutorial/list`).then((response) => {
      if (response.status === 200) {
        setTutorials(response.data.tutorialList);
        setTutorialsInitial(response.data.tutorialList);
      }
    });
  }, []);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Header
            handleChange={handleClick}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          spacing={1}
          xs={10}
        >
          <Grid item xs={0.5}>
            <Box sx={{ minWidth: 80 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rating || 0}
                  label="Rating"
                  onChange={handleChanges}
                >
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={1}>≥1</MenuItem>
                  <MenuItem value={2}>≥2</MenuItem>
                  <MenuItem value={3}>≥3</MenuItem>
                  <MenuItem value={4}>≥4</MenuItem>
                  <MenuItem value={5}>≥5</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={11.5}/>
          {tutorials.length === 0 ? (
            <Typography>Couldn't find any tutorials!</Typography>
          ) : (
            tutorials.map((tutorial) => (
              <Grid item key={tutorial._id} xs={12}>
                <TutorialOverview
                  id={tutorial._id}
                  ratingStats={tutorial.ratingStats}
                  numberOfRatings={tutorial.ratings.length}
                  title={tutorial.title}
                  date={formatDate(tutorial.createdAt)}
                  tags={tutorial.tags}
                  author={tutorial.owner || ""}
                ></TutorialOverview>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
}

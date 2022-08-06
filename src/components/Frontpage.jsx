import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { API_URL } from "../index";
import {
  Button,
  Grid,
  InputBase,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import TutorialOverview from "./TutorialOverview";
import formatDate from "../functions";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate } from "react-router-dom";

export default function Frontpage(props) {
  const { loggedIn, setLoggedIn } = props;
  const [tutorials, setTutorials] = useState([]);
  const [tutorialsInitial, setTutorialsInitial] = useState([]);
  const [rating, setRating] = React.useState("");

  const navigate = useNavigate();

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

  const handleClickCreateTutorial = () => {
    navigate("/create");
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
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Grid>
        <Grid item container alignItems="center" spacing={1} xs={10}>
          <Grid item container justifyContent="flex-end" xs={2}>
            <Box sx={{ width: 80 }}>
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
          <Grid item xs={8} sx={{ height: "100%" }}>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                margin: "auto",
              }}
            >
              <SearchIcon
                sx={{ color: "#000000", margin: "0px 5px 0px 10px" }}
              />
              <InputBase
                sx={{ flex: 1, margin: "0px 10px 0px 0px" }}
                placeholder="Search Raccoomender..."
                onChange={(e) => handleClick(e.target.value)}
              />
            </Paper>
          </Grid>
          <Grid item container xs={2} justifyContent="flex-start">
            {loggedIn ? (
              <Button
                sx={{ backgroundColor: "#4B6584", height: 50 }}
                variant="contained"
                onClick={handleClickCreateTutorial}
              >
                New Tutorial
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={12} />
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

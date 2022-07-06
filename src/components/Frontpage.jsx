import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { API_URL } from "../index";
import { Grid, Typography } from "@mui/material";
import TutorialOverview from "./TutorialOverview";
import formatDate from "../functions";

export default function Frontpage(props) {
  const { loggedIn, setLoggedIn } = props;
  const [tutorials, setTutorials] = useState([]);
  const [tutorialsInitial, setTutorialsInitial] = useState({ init_array: [] });

  const handleClick = (e) => {
    console.log("com", tutorialsInitial.init_array);
    console.log("original", tutorials);

    let filteredSearch = tutorialsInitial.init_array.filter((item) => {
      return (
        item.title.toLowerCase().includes(e.toLowerCase()) ||
        item.content.toLowerCase().includes(e.toLowerCase()) || 
        item.owner.username.toLowerCase().includes(e.toLowerCase())
      );
    });
    setTutorials(filteredSearch);
  };

  useEffect(() => {
    axios.get(`${API_URL}/tutorial/list`).then((response) => {
      if (response.status === 200) {
        console.log(response.data.tutorialList);
        setTutorials(response.data.tutorialList);
        setTutorialsInitial({
          ...tutorialsInitial,
          init_array: response.data.tutorialList,
        });
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

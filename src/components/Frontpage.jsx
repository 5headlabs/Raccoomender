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
  const [tutorialsInitial, setTutorialsInitial] = useState({init_array: []});

  const handleClick = (e) => {

    console.log("com",tutorialsInitial.init_array)
    console.log("original",tutorials)

    let filteredSearch = tutorialsInitial.init_array.filter(
      (item) => {
        return (
          item
          .title
          .toLowerCase()
          .includes(e.toLowerCase()) || 
          item
          .content
          .toLowerCase()
          .includes(e.toLowerCase())
          || 
          item
          .owner.username
          .toLowerCase()
          .includes(e.toLowerCase())
        
        );
      }
    );
    let i = 0;

    let con=[];
    while (i < filteredSearch.length) {
      con.push(
        <Grid item key={filteredSearch[i]._id}>
          <TutorialOverview
            id={filteredSearch._id}
            rating={0} // should be "response.data.tutorialList[i].ratingStats.avgRating"
            numberOfRatings={filteredSearch.length}
            title={filteredSearch.title}
            date={formatDate(filteredSearch[i].createdAt)}
            tags={filteredSearch[i].tags}
            author={filteredSearch[i].owner || ""}
          ></TutorialOverview>
        </Grid>
      );
      i += 1;
    }
 
    setTutorials(con);
  };

 
 useEffect(() => {

    const handleGetTutorials = async () => {
      let response = await axios.get(`${API_URL}/tutorial/list`);
      let content = [];
      if (response.status === 200) {
        let i = 0;

        while (i < response.data.tutorialList.length) {
          content.push(
            <Grid item key={response.data.tutorialList[i]._id} xs={12}>
              <TutorialOverview
                id={response.data.tutorialList[i]._id}
                rating={response.data.tutorialList[i].ratingStats.avgRating}
                numberOfRatings={response.data.tutorialList[i].ratings.length}
                title={response.data.tutorialList[i].title}
                date={formatDate(response.data.tutorialList[i].createdAt)}
                tags={response.data.tutorialList[i].tags}
                author={response.data.tutorialList[i].owner || ""}
              ></TutorialOverview>
            </Grid>
          );
          i += 1;
        }
      } else {
        content.push(
          <Typography>Error: Could not fetch tutorials!</Typography>
        );
      }
      setTutorials(content);
      setTutorialsInitial({...tutorialsInitial,init_array:response.data.tutorialList})
      
    };

    handleGetTutorials();
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Header handleChange={handleClick} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          spacing={1}
          xs={10}
        >
          {tutorials}
        </Grid>
      </Grid>
    </>
  );
}

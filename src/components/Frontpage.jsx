import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { API_URL } from "../index";
import { Grid, Typography } from "@mui/material";
import TutorialOverview from "./TutorialOverview";
import formatDate from "../functions";

export default function Frontpage(props) {
  const { loggedIn } = props;
  const [tutorials, setTutorials] = useState([]);
  // const [tutorialsInitial, setTutorialsInitial] = useState([]);

  const handleClick = (e) => {

    let filteredSearch = tutorials.filter(
      (item) => {
        return (
          item.props.children.props
          .title
          .toLowerCase()
          .includes(e.toLowerCase()) 
        );
      }
    );

    setTutorials(filteredSearch);
  };

 
 useEffect(() => {

    const handleGetTutorials = async () => {
      let response = await axios.get(`${API_URL}/tutorial/list`);
      let content = [];
      if (response.status === 200) {
        let i = 0;

        while (i < response.data.tutorialList.length) {
          content.push(
            <Grid item key={response.data.tutorialList[i]._id}>
              <TutorialOverview
                id={response.data.tutorialList[i]._id}
                rating={0} // should be "response.data.tutorialList[i].ratingStats.avgRating"
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
      // setTutorialsInitial(response.data.tutorialList);
      
    };

    handleGetTutorials();
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Header handleChange={handleClick} loggedIn={loggedIn} />
        </Grid>
        <Grid
          item
          container
          direction="column"
          spacing={1}
          sx={{
            width: "80%",
          }}
        >
          {tutorials}
        </Grid>
      </Grid>
    </>
  );
}

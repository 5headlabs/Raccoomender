import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_URL } from "../index";
import { useParams } from "react-router-dom";
import TutorialContent from "./TutorialView/TutorialContent";
import TutorialRatings from "./TutorialView/TutorialRatings";
import TutorialCommentCreation from "./TutorialView/TutorialCommentCreation";
import TutorialCommentList from "./TutorialView/TutorialCommentList";

export default function TutorialView(props) {
  const { loggedIn , setLoggedIn } = props;
  const { id } = useParams();

  const [values, setValues] = useState({
    comments: [],
    content: "",
    createdAt: "",
    owner: {},
    ratings: [],
    ratingStats: {avgRating: 0, starRating: [0,0,0,0,0]},
    tags: [],
    title: "",
  });

  const [updatedComments, setUpdatedComments] = useState(false);
  const [updatedRatings, setUpdatedRatings] = useState(false);

  const getTutorial = () => {
    axios
      .get(`${API_URL}/tutorial/view/` + id)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setValues({
            ...values,
            comments: response.data.tutorial.comments,
            content: response.data.tutorial.content,
            createdAt: response.data.tutorial.createdAt,
            owner: response.data.tutorial.owner,
            ratings: response.data.tutorial.ratings,
            ratingStats: response.data.tutorial.ratingStats,
            tags: response.data.tutorial.tags,
            title: response.data.tutorial.title,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === 500) {
        }
      });
  };

  useEffect(() => {
    getTutorial();
    setUpdatedComments(false);
    setUpdatedRatings(false);
    // eslint-disable-next-line
  }, [updatedComments, updatedRatings]);

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Grid
        container
        margin="auto"
        maxWidth="67%"
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <TutorialContent values={values} />
        </Grid>
          <Grid item xs={6}>
            <TutorialRatings
              values={values}
              updatedRatings={updatedRatings}
              setUpdatedRatings={setUpdatedRatings}
              loggedIn={loggedIn}
            />
          </Grid>
          <Grid item xs={6}>
            <TutorialCommentCreation
              values={values}
              updatedComments={updatedComments}
              setUpdatedComments={setUpdatedComments}
              loggedIn={loggedIn}
            />
        </Grid>
        <Grid item xs={12}>
          <TutorialCommentList values={values} />
        </Grid>
      </Grid>
    </>
  );
}

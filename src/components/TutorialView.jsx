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
  const { loggedIn } = props;
  const { id } = useParams();

  const [values, setValues] = useState({
    comments: [],
    content: "",
    createdAt: "",
    owner: {},
    ratings: [],
    tags: [],
    title: "",
    id: "",
  });

  useEffect(() => {
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
            tags: response.data.tutorial.tags,
            title: response.data.tutorial.title,
            id: response.data.tutorial._id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === 500) {
        }
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header></Header>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={2} />
        <Grid item xs={8}>
          <TutorialContent values={values} />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={2} />
        <Grid item xs={4}>
          <TutorialRatings values={values} loggedIn={loggedIn} />
        </Grid>
        <Grid item xs={4}>
          <TutorialCommentCreation values={values} loggedIn={loggedIn} />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={2} />
        <Grid item xs={8}>
          <TutorialCommentList values={values} />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
}

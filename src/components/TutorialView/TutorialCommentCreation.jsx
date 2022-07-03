import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  TextField,
  Typography,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { API_URL } from "../../index";

export default function TutorialCommentCreation(props) {
  const { values, loggedIn } = props;
  const navigate = useNavigate();

  const [commentValues, setCommentValues] = useState({
    pressedPost: false,
    headline: "",
    comment: "",
    errorCreateComment: false,
    successCreateComment: false,
    errorCreateCommentMessage: null,
    successCreateCommentMessage: null,
  });

  const handlePost = () => {
    setCommentValues({
      ...commentValues,
      pressedPost: true,
    });

    axios
      .post(
        `${API_URL}/api/tutorial/${values.id}/add/comment`,
        {
          headline: commentValues.headline,
          comment: commentValues.comment,
        },
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setCommentValues({
            ...commentValues,
            successCreateComment: true,
            successCreateCommentMessage: "Tutorial Successfully added",
          });
          navigate("/");
        }
      })
      .catch(function (error) {
        if (error.response.status === 500) {
          console.log(error, "Something went wong");
          setCommentValues({
            ...commentValues,
            errorCreateComment: true,
            errorCreateCommentMessage: "Cannot save tutorial please try again",
          });
        }
      });
  };

  const handleChange = (prop) => (event) => {
    setCommentValues({ ...commentValues, [prop]: event.target.value });
  };

  return (
    <>
      <Card>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item />
          <Grid item>
            <Typography variant="h6">Write a comment</Typography>
          </Grid>
          <Grid item>
            <Typography
              marginLeft="2.5%"
              sx={{
                float: "left",
              }}
              variant="h7"
            >
              Headline
            </Typography>
            <TextField
              placeholder="My Example Headline"
              required
              sx={{
                width: "95%",
              }}
              onChange={handleChange("title")}
            ></TextField>
            <Typography
              marginLeft="2.5%"
              sx={{
                float: "left",
              }}
              variant="h7"
            >
              Comment
            </Typography>
            <TextField
              minRows="4"
              multiline
              placeholder="Example Comment"
              required
              sx={{
                width: "95%",
              }}
              onChange={handleChange("content")}
            ></TextField>
          </Grid>
          <Grid item>
            {values.pressedCreate ? (
              <LoadingButton
                loading
                sx={{
                  backgroundColor: "#4b6584",
                  height: "36px",
                  width: 300,
                }}
                variant="contained"
              ></LoadingButton>
            ) : (
              <Button
                onClick={handlePost}
                variant="filled"
                disabled={!loggedIn}
                sx={{
                  backgroundColor: "#4b6584",
                  color: "#ffffff",
                  height: "36px",
                  width: 300,
                }}
              >
                Post
              </Button>
            )}
          </Grid>
          <Grid item>
            {values.successCreateTutorial ? (
              <Alert severity="success">
                {values.successCreateTutorialMessage}
              </Alert>
            ) : null}
            {values.errorCreateTutorial ? (
              <Alert severity="error">
                {values.errorCreateTutorialMessage}
              </Alert>
            ) : null}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

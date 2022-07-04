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
            successCreateCommentMessage: "Comment successfully added.",
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
            errorCreateCommentMessage:
              "Cannot save comment. Please try again later.",
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
        <Grid container spacing={1} sx={{ p: 2 }}>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            xs={12}
          >
            <Typography variant="h6">Write a comment</Typography>
          </Grid>
          <Typography marginLeft="2%" variant="h7">
            Headline
          </Typography>
          <Grid item xs={12}>
            <TextField
              placeholder="My Example Headline"
              required
              sx={{
                width: "100%",
              }}
              onChange={handleChange("title")}
            ></TextField>
          </Grid>
          <Grid item xs={12} />
          <Typography marginLeft="2%" variant="h7">
            Comment
          </Typography>
          <Grid item xs={12}>
            <TextField
              minRows="2"
              multiline
              placeholder="Example Comment"
              required
              sx={{
                width: "100%",
              }}
              onChange={handleChange("content")}
            ></TextField>
          </Grid>
          <Grid
            item
            container
            alignItems="flex-end"
            justifyContent="flex-end"
            xs={12}
          >
            <Grid item>
              {values.pressedCreate ? (
                <LoadingButton
                  loading
                  sx={{
                    backgroundColor: "#4b6584",
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
                  }}
                >
                  Post
                </Button>
              )}
            </Grid>
          </Grid>
          {values.successCreateTutorial ? (
            <Alert severity="success">
              {values.successCreateTutorialMessage}
            </Alert>
          ) : null}
          {values.errorCreateTutorial ? (
            <Alert severity="error">{values.errorCreateTutorialMessage}</Alert>
          ) : null}
        </Grid>
      </Card>
    </>
  );
}

import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  TextField,
  Typography,
  Grid,
  Alert,
  Tooltip
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { API_URL } from "../../index";

export default function TutorialCommentCreation(props) {
  const { values, setUpdatedComments, loggedIn } = props;

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
        `${API_URL}/tutorial/${values.id}/add/comment`,
        {
          title: commentValues.headline,
          content: commentValues.comment,
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
          setUpdatedComments(true);
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
        <Grid container spacing={1} sx={{ p: 2, minHeight: "350px"}}>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            xs={12}
          >
            <Typography variant="h5" color="#4B6584" fontWeight="bold">
              Write a comment
            </Typography>
          </Grid>
          <Typography marginLeft="2%" variant="h7">
            Headline
          </Typography>
          <Grid item xs={12}>
            <TextField
              placeholder="My Example Headline"
              required
              disabled={!loggedIn}
              sx={{
                width: "100%",
              }}
              onChange={handleChange("headline")}
            ></TextField>
          </Grid>
          <Grid item xs={12} />
          <Typography marginLeft="2%" variant="h7">
            Comment
          </Typography>
          <Grid item xs={12}>
            <TextField
              minRows="3"
              multiline
              placeholder="Example Comment"
              required
              disabled={!loggedIn}
              sx={{
                width: "100%",
              }}
              onChange={handleChange("comment")}
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
              {values.pressedPost ? (
                <LoadingButton
                  loading
                  sx={{
                    backgroundColor: "#4b6584",
                  }}
                  variant="contained"
                ></LoadingButton>
              ) : (
                loggedIn ? (
                  <Button
                    onClick={handlePost}
                    variant="filled"
                    sx={{
                      backgroundColor: "#4b6584",
                      color: "#ffffff",
                    }}
                  >
                    Post
                  </Button>
                ) : (
                  <Tooltip title="Log in to comment!" placement="left" arrow>
                    <Grid>
                  <Button
                    onClick={handlePost}
                    variant="filled"
                    disabled
                    sx={{
                      backgroundColor: "#4b6584",
                      color: "#ffffff",
                    }}
                  >
                    Post
                  </Button>
                  </Grid>
                </Tooltip>
                )
              )}
            </Grid>
          </Grid>
          {commentValues.successCreateComment ? (
            <Grid item xs={12}>
              <Alert severity="success">
                {commentValues.successCreateCommentMessage}
              </Alert>
            </Grid>
          ) : null}
          {commentValues.errorCreateComment ? (
            <Grid item xs={12}>
              <Alert severity="error">
                {commentValues.errorCreateCommentMessage}
              </Alert>
            </Grid>
          ) : null}
        </Grid>
      </Card>
    </>
  );
}

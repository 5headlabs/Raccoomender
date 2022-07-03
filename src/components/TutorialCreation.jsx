import {
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Header from "./Header";
import axios from "axios";
import { API_URL } from "../index";
import { useNavigate } from "react-router-dom";

export default function TutorialCreation(props) {
  const { loggedIn } = props;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    pressedCreate: false,
    title: "",
    content: "",
    tags: "",
    errorCreateTutorial: false,
    successCreateTutorial: false,
    errorCreateTutorialMessage: null,
    successCreateTutorialMessage: null,
  });

  const handleCreate = () => {
    setValues({
      ...values,
      pressedCreate: true,
    });

    axios
      .post(
        `${API_URL}/tutorial/create`,
        {
          title: values.title,
          content: values.content,
          tags: values.tags,
        },
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setValues({
            ...values,
            successCreateTutorial: true,
            successCreateTutorialMessage: "Tutorial Sucessfully added",
          });
          navigate("/");
        }
      })
      .catch(function (error) {
        if (error.response.status === 500) {
          console.log(error, "Something went wong");
          setValues({
            ...values,
            errorCreateTutorial: true,
            errorCreateTutorialMessage: "Cannot save tutorial please try again",
          });
        }
      });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Card
            sx={{
              backgroundColor: "#ffffff",
              minWidth: "50ch",
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Grid item />
              <Grid item>
                <Typography variant="h4">Create a Tutorial</Typography>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Divider variant="middle" />
              </Grid>
              <Grid item>
                <Typography
                  marginLeft="2.5%"
                  sx={{
                    float: "left",
                  }}
                  variant="h6"
                >
                  Title
                </Typography>
                <TextField
                  placeholder="My Example Title"
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
                  variant="h6"
                >
                  Tutorial Content
                </Typography>
                <TextField
                  minRows="4"
                  multiline
                  placeholder="Example Content"
                  required
                  sx={{
                    width: "95%",
                  }}
                  onChange={handleChange("content")}
                ></TextField>
                <Typography
                  marginLeft="2.5%"
                  sx={{
                    float: "left",
                  }}
                  variant="h6"
                >
                  Tags
                </Typography>
                <TextField
                  placeholder="#Example"
                  required
                  sx={{
                    width: "95%",
                  }}
                  onChange={handleChange("tags")}
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
                    onClick={handleCreate}
                    variant="filled"
                    sx={{
                      backgroundColor: "#4b6584",
                      color: "#ffffff",
                      height: "36px",
                      width: 300,
                    }}
                  >
                    Create
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
        </Grid>
      </Grid>
    </>
  );
}

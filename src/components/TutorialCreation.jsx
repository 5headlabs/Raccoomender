import {
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Header from "./Header";
import axios from "axios";
import { API_URL } from "../index";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function TutorialCreation(props) {
  const { loggedIn, setLoggedIn } = props;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    pressedCreate: false,
    title: "",
    content: "",
    tags: [],
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

  const handleContentChange = (event, editor) => {
    setValues({ ...values, content: editor.getData()});
  };

  const handleTagFieldChange = (event) => {
    if (event.code === "Space") {
      const withoutSpaces = event.target.value.replace(/ /g, "");

      if (withoutSpaces) {
        if (!values.tags.includes(withoutSpaces)) {
          addTag(withoutSpaces);
          event.target.value = "";
        }
      }
    }
  };

  const addTag = (tag) => {
    let tempTags = values.tags;
    tempTags.push(tag);
    setValues({ ...values, tags: tempTags });
  };
  const handleTagDeletion = (tag) => () => {
    let tempTags = values.tags;
    tempTags = tempTags.filter((chip) => String(chip) !== String(tag));
    console.log(tempTags);
    setValues({ ...values, tags: tempTags });
  };

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Card
        sx={{ maxWidth: "50%", margin: "auto", backgroundColor: "#ffffff" }}
      >
        <div style={{maxWidth: "95%", margin: "auto"}}>
          <Stack spacing={0.5}>
            <Typography mt="5px" variant="h4">Create a Tutorial</Typography>
            <Divider variant="middle" />
            <Typography textAlign="left" variant="h6" >
              Title
            </Typography>
            <TextField
              size="small"
              placeholder="My Example Title"
              required
              onChange={handleChange("title")}
            ></TextField>
            <Typography textAlign="left" variant="h6">Tutorial Content</Typography>
            <div>
              <CKEditor 
                editor={ClassicEditor} 
                onBlur={handleContentChange}
              />
            </div>
            <Typography textAlign="left" variant="h6">Tags</Typography>
            <TextField
              size="small"
              placeholder="JavaScript"
              required
              onKeyUp={handleTagFieldChange}
            ></TextField>
            <Stack
              sx={{ flexWrap: "wrap" }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              {values.tags.map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={handleTagDeletion(tag)}
                  />
                );
              })}
            </Stack>
          </Stack>
        </div>
        <div style={{margin: "20px 0 10px"}}>
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
        </div>
        <div>
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
        </div>
      </Card>
    </>
  );
}

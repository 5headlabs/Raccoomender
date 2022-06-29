import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  FilledInput,
  IconButton,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { API_URL } from "../index";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import logo from "../raccoomender.png";
export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
    pressedLogin: false,
    errorLogin: false,
    errorMessageLogin: "Internal Server Error. Please try again later.",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogIn = (event) => {
    const newValues = {
      ...values,
      pressedLogin: true,
    };
    setValues(newValues);
    axios
      .post(`${API_URL}/auth/login`, {
        username: newValues.username,
        password: newValues.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;

          //set JWT token to local
          localStorage.setItem("token", token);

          //redirect user to home page
          navigate("/");
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log(error, "Username or password wrong");
          setValues({
            ...values,
            pressedLogin: false,
            errorLogin: true,
            errorMessageLogin: "Username or password wrong. Please try again.",
          });
        } else if (error.response.status === 500) {
          console.log(error, "Internal Server Error");
          setValues({
            ...values,
            pressedLogin: false,
            errorLogin: true,
            errorMessageLogin:
              "500 - Internal Server Error. Please try again later.",
          });
        } else {
          console.log(error);
        }
      });

    //navigate("/");
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) {
      navigate("/");
    }
    // eslint-disable-next-line
  },[]);

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <Card sx={{ minWidth: 400 }}>
            <CardActions>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={3}
              >
                <Grid item >
                  <a href="/">
                    <img src={logo} alt="logo" width={250}/>
                  </a>
                </Grid>
                <Grid item>
                  {values.errorLogin ? (
                    <Alert severity="error">{values.errorMessageLogin}</Alert>
                  ) : null}
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ minWidth: 300 }}
                    id="username-input"
                    label="Username"
                    variant="filled"
                    onChange={handleChange("username")}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? handleLogIn() : null
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }} variant="filled">
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <FilledInput
                      id="password-input"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      onKeyDown={(event) =>
                        event.key === "Enter" ? handleLogIn() : null
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <Typography
                      color="text.secondary"
                      fontSize={14}
                      sx={{ textAlign: "right" }}
                    >
                      Forgot your password? Click <a href="/register">here</a>.
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item>
                  {values.pressedLogin ? (
                    <LoadingButton
                      loading
                      sx={{
                        minWidth: 300,
                        backgroundColor: "#4b6584",
                        marginBottom: 2,
                      }}
                      variant="contained"
                    >
                      Log In
                    </LoadingButton>
                  ) : (
                    <Button
                      sx={{
                        minWidth: 300,
                        backgroundColor: "#4b6584",
                        marginBottom: 2,
                      }}
                      variant="contained"
                      onClick={handleLogIn}
                    >
                      Log In
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ minWidth: 400 }}>
            <CardActions>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="text.secondary" fontSize={14}>
                  Don't have an account?
                </Typography>
                <Button
                  sx={{
                    minWidth: 300,
                    backgroundColor: "#4b6584",
                    marginBottom: 2,
                  }}
                  variant="contained"
                  onClick={(event)=> navigate("/register")}
                >
                  Sign Up
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

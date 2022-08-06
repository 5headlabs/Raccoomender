import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import validator from "validator";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import logo from "../raccoomender.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../index";

export default function Register(props) {
  const { setLoggedIn } = props;

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    pressedSignUp: false,
    errorSignUp: false,
    errorMessageSignUp: "Internal Server Error. Please try again later.",
  });
  const navigate = useNavigate();

  const [enableSignUpButton, setEnableSignUpButton] = useState(false);
  const [errorMessage, setMsg] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    const isEmailValid = validator.isEmail(values.email);
    const equalPasswords = values.password === values.confirmPassword;
    const enable = isEmailValid && values.password !== "" && equalPasswords;

    if (enable) {
      setMsg("");
    } else {
      if (!equalPasswords) {
        setMsg("Please confirm your password!");
      }
      if (values.password === "") {
        setMsg("Please enter a password!");
      }
      if (!isEmailValid) {
        setMsg("Please enter a valid email!");
      }
      if (values.username === "") {
        setMsg("Please enter a username!");
      }
    }

    setEnableSignUpButton(enable);
  }, [values]);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUp = (event) => {
    const newValues = {
      ...values,
      pressedSignUp: true,
    };
    setValues(newValues);
    console.log(newValues);
    axios
      .post(`${API_URL}/auth/register`, {
        username: newValues.username,
        password: newValues.password,
        email: newValues.email,
      })
      .then((response) => {
        if (response.status === 201) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setValues({
            ...values,
            errorSignUp: true,
            errorMessageSignUp:
              "Username is already in use. Please choose another one.",
          });
        } else if (error.response.status === 500) {
          setValues({
            ...values,
            errorSignUp: true,
            errorMessageSignUp:
              "500 - Internal Server Error. Please try again later.",
          });
        }
      });
  };

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ marginTop: 5 }}
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
                <Grid item sx={{ cursor: "pointer" }}>
                  <img
                    src={logo}
                    alt="logo"
                    width={250}
                    onClick={handleClickLogo}
                  />
                </Grid>
                <Grid item>
                  {values.errorSignUp ? (
                    <Alert severity="error">{values.errorMessageSignUp}</Alert>
                  ) : null}
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ minWidth: 300 }}
                    id="username-input"
                    label="Username"
                    variant="filled"
                    onChange={handleChange("username")}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ minWidth: 300 }}
                    id="email-input"
                    label="Email"
                    variant="filled"
                    type="email"
                    onChange={handleChange("email")}
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
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }} variant="filled">
                    <InputLabel htmlFor="confirmPassword-input">
                      Confirm Password
                    </InputLabel>
                    <FilledInput
                      id="confirmPassword-input"
                      type={values.showPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      onChange={handleChange("confirmPassword")}
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
                      label="Confirm Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  {values.pressedSignUp ? (
                    <LoadingButton
                      loading
                      sx={{
                        minWidth: 300,
                        backgroundColor: "#4b6584",
                        marginBottom: 2,
                      }}
                      variant="contained"
                    >
                      Enter the cave!
                    </LoadingButton>
                  ) : (
                    <Tooltip title={errorMessage} placement="top">
                      <div>
                        <Button
                          disabled={!enableSignUpButton}
                          sx={{
                            minWidth: 300,
                            backgroundColor: "#4b6584",
                            marginBottom: 2,
                          }}
                          variant="contained"
                          onClick={handleSignUp}
                        >
                          Enter the cave!
                        </Button>
                      </div>
                    </Tooltip>
                  )}
                  <Typography color="text.secondary" fontSize={14}>
                    Already have an account? Log in&nbsp;
                    <Typography
                      display="inline"
                      fontSize={14}
                      onClick={handleClickLogin}
                      sx={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      here
                    </Typography>
                    .
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

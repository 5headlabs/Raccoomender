import { Button, Card, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Header from "./Header";
import axios from "axios";
import { API_URL } from "../index";

export default function TutorialCreation() {

    const [values, setValues] = useState({
        pressedCreate: false,
        title: "",
        content: "",
        tags: "",
    });

    const handleCreate = () => {
        setValues({
            ...values,
            pressedCreate: true
        });

        axios.post(`${API_URL}/tutorial/create`,
            {
                title: values.title,
                content: values.content,
                tags: values.tags
            },
            {
                headers: {
                    token: window.localStorage.getItem("token")
                }
            });

        
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <>
            <Header></Header>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center">
                <Grid
                    item>
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            minWidth: "50ch"
                        }}>
                        <Grid>
                            <Typography
                                variant="h4">
                                Create a Tutorial
                            </Typography>
                        </Grid>
                        <Divider>

                        </Divider>
                        <Grid>
                            <Typography
                                marginLeft="2.5%"
                                sx={{
                                    float: "left"
                                }}
                                variant="h6">
                                Title
                            </Typography>
                            <TextField
                                placeholder="My Example Title"
                                required
                                sx={{
                                    width: "95%"
                                }}
                                onChange={handleChange("title")}>
                            </TextField>
                            <Typography
                                marginLeft="2.5%"
                                sx={{
                                    float: "left"
                                }}
                                variant="h6">
                                Tutorial Content
                            </Typography>
                            <TextField
                                minRows="4"
                                multiline
                                placeholder="Example Content"
                                required
                                sx={{
                                    width: "95%"
                                }}
                                onChange={handleChange("content")}>

                            </TextField>
                            <Typography
                                marginLeft="2.5%"
                                sx={{
                                    float: "left"
                                }}
                                variant="h6">
                                Tags
                            </Typography>
                            <TextField
                                placeholder="#Example"
                                required
                                sx={{
                                    width: "95%"
                                }}
                                onChange={handleChange("tags")}>
                            </TextField>
                        </Grid>
                        <Grid>
                            {values.pressedCreate ? (
                                <LoadingButton
                                    loading
                                    sx={{
                                        backgroundColor: "#4b6584",
                                        height: "36px",
                                        width: 300
                                    }}
                                    variant="contained">
                                </LoadingButton>
                            ) : (
                                <Button
                                    onClick={handleCreate}
                                    variant="filled"
                                    sx={{
                                        backgroundColor: "#4b6584",
                                        color: "#ffffff",
                                        height: "36px",
                                        width: 300
                                    }}>
                                    Create
                                </Button>
                            )}
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </>
    )

}
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { API_URL } from "../index";
import { Grid, Typography } from "@mui/material";
import TutorialOverview from "./TutorialOverview";

export default function Frontpage(props) {
    const {loggedIn} = props;

    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        const handleGetTutorials = async () => {
            let content = [];
            let response = await axios.get(`${API_URL}/tutorial/list`);
            if (response.status === 200) {
                let i = 0;
                while (i < response.data.tutorialList.length) {
                    content.push(
                        <Grid 
                            item>
                            <TutorialOverview
                                id={response.data.tutorialList[i]._id}
                                stars={calculateStars(response.data.tutorialList[i].ratings)}
                                numberOfRatings={response.data.tutorialList[i].ratings.length}
                                title={response.data.tutorialList[i].title}
                                date={formatDate(response.data.tutorialList[i].createdAt)}
                                tags={response.data.tutorialList[i].tags}
                                // TODO convert id to name
                                author={getUsername(response.data.tutorialList[i].owner)}>
                            </TutorialOverview>
                        </Grid>
                    );
                    i += 1;
                }
            } else {
                content.push(
                    <Typography>
                        Error: Could not fetch tutorials!
                    </Typography>
                );
            }
            setTutorials(content);
        }

        handleGetTutorials();
    }, []);

    const calculateStars = (ratings) => {
        let i = 0;
        let sum = 0;
        while (i < ratings.length) {
            sum += ratings[i].score;
            i += 1;
        }
        return sum / i;
    }

    const formatDate = (date) => {
        date = date.slice(0, 10);
        date = new Date(date);
        date = date.getUTCDate() + "." + (date.getUTCMonth()+1) + "." + date.getUTCFullYear();
        return date;
    }

    const getUsername = (id) => {
        // TODO get username by id
        return id;
    }

    return(
        <>
        <Header loggedIn={loggedIn}/>
        <Grid
            container
            direction="column"
            sx={{
                width: "90%"
            }}>
            { tutorials }
        </Grid>
        </>
    )

}

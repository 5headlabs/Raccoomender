import { Avatar, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function TutorialOverview(props) {

    const { id, stars, numberOfRatings, title, date, tags, author } = props;

    // id = atring
    // stars = int
    // numberOfRatings = int
    // title = string
    // date = string
    // tags = array of strings
    // author = string

    const navigate = useNavigate();

    const handleClickTutorialOverview = () => {
        navigate("/tutorial/" + id)
    };

    const convertRatingToStars = stars => {
        let content = [];
        let myStars = stars;
        while (myStars >= 1) {
            content.push(
                <StarIcon
                    color="black">
                </StarIcon>
            )
            myStars = myStars-1;
        }
        if (myStars >= 0.5) {
            content.push(
                <StarHalfIcon
                    color="black">
                </StarHalfIcon>
            )
            myStars = myStars-0.5;
        }
        let difference = 5-stars;
        while (difference >= 1) {
            content.push(
                <StarBorderIcon
                    color="black">
                </StarBorderIcon>
            )
            difference = difference-1;
        }
        return content;
    };

    return (
        <>
        <Grid 
            item>
            <Card
                onClick={handleClickTutorialOverview}
                sx={{
                    cursor: "pointer"
                }}>
                <Grid 
                    container
                    direction="row">
                    <Grid 
                        container
                        width="50%">
                        <Grid
                            container
                            direction="row"
                            alignItems="center">
                            <Grid
                                item>
                                { convertRatingToStars(stars) }
                            </Grid>
                            <Grid
                                item>
                                <Typography>
                                    { numberOfRatings } Ratings
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid 
                            container
                            direction="row"
                            alignItems="center">
                            <Grid 
                                item>
                                <Typography>
                                    { title }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid 
                            container
                            direction="row"
                            alignItems="center">
                            <Grid 
                                item>
                                <Typography>
                                    { date }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={1}>
                            { tags.map(tag => 
                                <Grid
                                    item>
                                    <Typography
                                        sx={{
                                            backgroundColor: "#95bdc8",
                                            borderRadius: "4px",
                                            color: "#ffffff"
                                        }}>
                                        { tag }
                                    </Typography>
                                </Grid>
                        )}
                        </Grid>
                    </Grid>
                    <Grid 
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        width="50%">
                        <Grid 
                            item>
                            <Typography>
                                Posted by:
                            </Typography>
                        </Grid>
                        <Grid 
                            item>
                            <Avatar></Avatar>
                        </Grid>
                        <Grid 
                            item>
                            <Typography>
                                { author.username }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
        </>
    )

}

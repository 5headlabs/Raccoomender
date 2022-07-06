import { Avatar, Card, Grid, Typography, Rating } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TutorialOverview(props) {
  const { id, ratingStats, numberOfRatings, title, date, tags, author } = props;

  // id = atring
  // ratingStats = int
  // numberOfRatings = int
  // title = string
  // date = string
  // tags = array of strings
  // author = string

  const navigate = useNavigate();

  const handleClickTutorialOverview = () => {
    navigate("/tutorial/" + id);
  };

  return (
    <>
      <Card
        onClick={handleClickTutorialOverview}
        sx={{
          cursor: "pointer",
          p : 1
        }}
      >
        <Grid container direction="row">
          <Grid container width="50%">
            <Grid container direction="row" alignItems="center">
              <Rating
                name="read-only"
                value={ratingStats.avgRating}
                precision={0.5}
                readOnly
              />
              <Grid item>
                <Typography>{numberOfRatings} Ratings</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography>{title}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography>{date}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={1}>
              {tags.map((tag) => (
                <Grid item key={tag}>
                  <Typography
                    sx={{
                      backgroundColor: "#95bdc8",
                      borderRadius: "4px",
                      color: "#ffffff",
                    }}
                  >
                    {tag}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            width="50%"
          >
            <Grid item>
              <Typography>Posted by:</Typography>
            </Grid>
            <Grid item>
              <Avatar></Avatar>
            </Grid>
            <Grid item>
              <Typography>{author.username}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

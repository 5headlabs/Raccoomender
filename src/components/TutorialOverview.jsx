import { Avatar, Card, Grid, Typography, Rating, Chip } from "@mui/material";
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
          p: 3,
          backgroundColor: "#4B6584",
          color: "#ffffff",
        }}
      >
        <Grid container direction="row">
          <Grid item container xs={9}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Rating
                  name="read-only"
                  value={ratingStats.avgRating}
                  precision={0.5}
                  readOnly
                />
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    color: "#D1D8E0",
                  }}
                >
                  {numberOfRatings} Ratings
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography fontWeight="bold" fontSize="20px">{title}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography
                  sx={{
                    color: "#D1D8E0",
                  }}
                >
                  {date}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={1}>
              {tags.map((tag) => (
                <Grid item key={tag}>
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      backgroundColor: "#778CA3",
                      color: "#ffffff",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            xs={3}
          >
            <Grid item>
              <Typography
                sx={{
                  color: "#778CA3",
                }}
              >
                Posted by:
              </Typography>
            </Grid>
            <Grid item>
              <Avatar></Avatar>
            </Grid>
            <Grid item>
              <Typography fontSize="20px">{author.username}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

import { Card, Divider, Rating, Grid, LinearProgress, Tooltip } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../index";
import { useParams } from "react-router-dom";

export default function TutorialRatings(props) {
  const { values, updatedRatings, setUpdatedRatings, loggedIn } = props;
  const { id } = useParams();

  const [newRating, setNewRating] = useState(false);

  const calculatePercentage = (starRating) => {
    if (values.ratings.length === 0 || values.ratings.length === undefined || values.ratings.length === null) {
      return 0;
    }
    return (values.ratingStats.starRating[starRating] / values.ratings.length) * 100
  };

  const [ratingValue, setRatingValue] = useState({
    rating: 0,
    errorCreateRating: false,
    successCreateRating: false,
    successCreateRatingMessage: null,
    errorCreateRatingMessage: null
  });

  useEffect(() => {
    if (newRating) {
      axios
        .post(
          `${API_URL}/tutorial/${id}/add/rating`,
          {
            score: ratingValue.rating
          },
          {
            headers: {
              token: window.localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            setRatingValue({
              ...ratingValue,
              successCreateRating: true,
              successCreateRatingMessage: "Rating successfully added.",
            });
            setUpdatedRatings(true);
            setNewRating(false);
          }
        })
        .catch(function (error) {
          if (error.response.status === 500) {
            console.log(error, "Something went wong");
            setRatingValue({
              ...ratingValue,
              errorCreateRating: true,
              errorCreateRatingMessage:
                "Cannot save rating. Please try again later.",
            });
          } else if (error.response.status === 404) {
            console.log("404 error");
          }
        });
    }
  }, [ratingValue.rating]);

  const handleRating = (score) => {
    setNewRating(true);
    setRatingValue({
      ...ratingValue,
      rating: score
    });
  };

  return (
    <Card>
      <Grid container spacing={1} sx={{ p: 3, minHeight: "350px" }}>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          <Typography variant="h5" fontWeight="bold" color="#4B6584">
            Was this post helpful?
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {loggedIn ? (
            <Rating
              name="simple-controlled"
              value={ratingValue.rating}
              onChange={(event, newValue) => {
                handleRating(newValue);
              }}
            />
          ) : (
            <Tooltip title="Log in to rate!" placement="left" arrow>
              <div>
                <Rating
                  name="simple-controlled"
                  value={0}
                  disabled
                />
              </div>
            </Tooltip>
          )}

        </Grid>
        <Grid item xs={12}>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12} />
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={1}>
            5
          </Grid>
          <Grid item xs={10}>
            {<LinearProgress variant="determinate" value={calculatePercentage(4)} />}
          </Grid>
          <Grid item xs={1}>
            {calculatePercentage(4)}%
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={1}>
            4
          </Grid>
          <Grid item xs={10}>
            <LinearProgress variant="determinate" value={calculatePercentage(3)} />
          </Grid>
          <Grid item xs={1}>
            {calculatePercentage(3)}%
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={1}>
            3
          </Grid>
          <Grid item xs={10}>
            <LinearProgress variant="determinate" value={calculatePercentage(2)} />
          </Grid>
          <Grid item xs={1}>
            {calculatePercentage(2)}%
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={1}>
            2
          </Grid>
          <Grid item xs={10}>
            <LinearProgress variant="determinate" value={calculatePercentage(1)} />
          </Grid>
          <Grid item xs={1}>
            {calculatePercentage(1)}%
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={1}>
            1
          </Grid>
          <Grid item xs={10}>
            <LinearProgress variant="determinate" value={calculatePercentage(0)} />
          </Grid>
          <Grid item xs={1}>
            {calculatePercentage(0)}%
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h7" color="#555555">
            {values.ratingStats.avgRating} out of 5
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h7" color="#555555">
            {values.ratings.length} Rating(s)
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

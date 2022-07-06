import { Card, Divider, Rating, Grid, LinearProgress } from "@mui/material";
import Typography from '@mui/material/Typography';
import * as React from "react";

export default function TutorialRatings(props) {
    const {values, updatedRatings, setUpdatedRatings, loggedIn} = props;
    const [ratingValue, setValue] = React.useState(0);

    const calculatePercentage = (starRating) =>{
      if (values.ratings.length === 0 || values.ratings.length === undefined || values.ratings.length === null) {
        return 0;
      }
      return (values.ratingStats.starRating[starRating]/values.ratings.length)*100
    };

  return (
    <Card>
      <Grid container spacing={1} sx={{ p: 3, minHeight: "350px"}}>
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
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider variant="fullWidth"/>
        </Grid>
        <Grid item xs={12}/>
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

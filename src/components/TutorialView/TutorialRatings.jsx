import { Card, Divider, Rating, Grid, LinearProgress } from "@mui/material";
import Typography from '@mui/material/Typography';
import * as React from "react";

export default function TutorialRatings(props) {
    const {values , loggedIn} = props;
    const [ratingValue, setValue] = React.useState(0);
  return (
    <Card>
      <Grid container spacing={1} sx={{ p: 2 }}>
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
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          5 <LinearProgress variant="determinate" value={45} />
        </Grid>
        <Grid item xs={12}>
          4 <LinearProgress variant="determinate" value={10} />
        </Grid>
        <Grid item xs={12}>
          3 <LinearProgress variant="determinate" value={30} />
        </Grid>
        <Grid item xs={12}>
          2 <LinearProgress variant="determinate" value={5} />
        </Grid>
        <Grid item xs={12}>
          1 <LinearProgress variant="determinate" value={0} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h7" color="#555555">
          {values.rating} out of 5
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h7" color="#555555">
          A lot of ratings
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

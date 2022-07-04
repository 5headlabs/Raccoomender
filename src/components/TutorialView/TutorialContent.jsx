import { Card, Divider, Grid, Typography, Avatar } from "@mui/material";
import React from "react";
import { createStars, formatDate } from "../../functions";

export default function TutorialContent(props) {
  const { values } = props;

  return (
    <>
      <Card>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Grid item container xs={12}>
            <Grid
              item
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              xs={10}
            >
              <Grid item container alignItems="center">
                <Typography variant="h4" fontWeight="bold" color="#4B6584">
                  {values.title}
                </Typography>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography>{formatDate(values.createdAt)}</Typography>
                </Grid>
                <Grid item>{createStars(values.rating)}</Grid>
                <Grid item>
                  <Typography>{values.ratings.length} Ratings</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container alignItems="flex-end" xs={2}>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Typography>Posted by:</Typography>
                </Grid>
                <Grid item>
                  <Avatar></Avatar>
                </Grid>
                <Grid item>
                  <Typography>{values.owner.username}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%" }}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            {values.content}
          </Grid>
          <Grid item xs={12} sx={{ width: "100%" }}>
            <Divider />
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            xs={12}
          >
            {values.tags.map((tag) => (
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
      </Card>
    </>
  );
}

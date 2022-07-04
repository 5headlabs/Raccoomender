import React from "react";
import { Grid, Typography, Card, Divider } from "@mui/material";

export default function TutorialCommentList(props) {
  const { values } = props;

  return (
    <>
      <Card>
        <Grid container sx={{ p: 2 }}>
          {values.comments.map((comment) => (
            <Grid item key={comment._id} xs={12}>
              <Typography align="left" fontWeight="bold" variant="h6" gutterBottom>
                {comment.title}
              </Typography>
              <Typography align="left">{comment.content}</Typography>
              <Typography align="right" fontSize="9pt">Comment by:</Typography>
              <Typography align="right" fontSize="9pt">{comment.author}</Typography>
              <Divider />
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
}

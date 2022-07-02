import { Avatar, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function TutorialRatings(props) {
    const {values , loggedIn} = props;

    const calculateStars = (ratings) => {
        let i = 0;
        let sum = 0;
        while (i < ratings.length) {
            sum += ratings[i].score;
            i += 1;
        }
        if (ratings.length === 0) {
            return 0;
        }
        return sum / i;
    }
    
      const convertRatingToStars = ratings => {
        let content = [];
        let stars = calculateStars(ratings);
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
      <Card>
        h
        <Divider variant="middle" />
      </Card>
    </>
  );
}

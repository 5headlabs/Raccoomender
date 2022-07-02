import { Avatar, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function TutorialContent(props) {
    const {values} = props;

  return (
    <>
      <Card>
        {values.title}
        <Divider variant="middle" />
        b
        <Divider variant="middle" />c
      </Card>
    </>
  );
}

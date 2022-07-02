import { Card, Divider } from "@mui/material";
import React from "react";

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

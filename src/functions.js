import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const createStars = (rating) => {
  let content = [];
  let myStars = rating;
  let i = 0;
  while (myStars >= 1) {
    let key = "fullstar" + i;
    content.push(<StarIcon key={key} color="black"></StarIcon>);
    i = i + 1;
    myStars = myStars - 1;
  }
  if (myStars >= 0.5) {
    let key = "halfstar" + i;
    content.push(<StarHalfIcon key={key} color="black"></StarHalfIcon>);
    i = i + 1;
    myStars = myStars - 0.5;
  }
  let difference = 5 - rating;
  while (difference >= 1) {
    let key = "emptystar" + i;
    content.push(<StarBorderIcon key={key} color="black"></StarBorderIcon>);
    i = i + 1;
    difference = difference - 1;
  }
  return content;
};

export const formatDate = (date) => {
  date = date.slice(0, 10);
  date = new Date(date);
  date =
    date.getUTCDate() +
    "." +
    (date.getUTCMonth() + 1) +
    "." +
    date.getUTCFullYear();
  return date;
};

export default createStars;

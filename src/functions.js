import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const createStars = rating => {
    let content = [];
    let myStars = rating;
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
    let difference = 5-rating;
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

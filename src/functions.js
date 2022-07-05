
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

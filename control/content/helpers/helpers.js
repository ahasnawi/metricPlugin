// A helper function to extract the date: Format: "year/month/day"
const helpers = {
  getCurrentDate: (date = new Date()) => {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
};
const dateFormat = (date) => {
  let dateTime = new Date(date).toISOString();
  return dateTime.split("T")[0].split("-").reverse().join("-");
};

export default dateFormat;

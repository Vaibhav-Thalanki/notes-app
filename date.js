var getDate = () => {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var currentDay = today.toLocaleDateString("en-US", options);
  return currentDay;
};
var getDay = () => {
  var today = new Date();

  var currentDay = today.getDay();
  switch (currentDay) {
    case 0:
      currentDay = "Sunday";
      break;
    case 1:
      currentDay = "Monday";
      break;
    case 2:
      currentDay = "Tuesday";
      break;
    case 3:
      currentDay = "Wednesday";
      break;
    case 4:
      currentDay = "Thursday";
      break;
    case 5:
      currentDay = "Friday";
      break;
    case 6:
      currentDay = "Saturday";
      break;
  }
  return currentDay;
};
module.exports = {
  getDate,
  getDay,
};

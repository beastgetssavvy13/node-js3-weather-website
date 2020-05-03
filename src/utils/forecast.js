const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=3143349e63e6430787b62218200205&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "The Current temperature is " +
          body.current.temp_c +
          " and the weather is " +
        body.current.condition.text + ".            Local Time :" + body.location.localtime + ". " + "Latitude and Longitude :" + body.location.lat + ", " + body.location.lon
      );
    }
  });
};
module.exports = forecast;

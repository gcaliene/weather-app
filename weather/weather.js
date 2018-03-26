const request = require('request');

var getWeather =(lat, long, callback) => {

  request ({
    url: `https://api.darksky.net/forecast/ae898d894fdeeccd65954b9f7799cca3/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, { //make into object so that it can be called by weatherResults.temperature in app.js
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      });
    } else {
      callback('Unable to fetch weather');
    }
  })
}

module.exports = {
  getWeather
}

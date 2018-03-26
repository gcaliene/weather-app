const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
//the const below is what is going to be the object that stores the final parsed output
const argv = yargs
  .options({ //options will let us configure some top level options
    address: {
       demand:true,
       alias: 'a',
       describe: 'address to fetch weather for',
       string: true //this tells to parse address as a string
    }
  })
  .help()
  .alias('help', 'h')
  .argv;//stores the result in the srgv variable crated at line 5

// console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // console.log(JSON.stringify(results, undefined, 2));
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});

const yargs = require('yargs');
const axios = require('axios');

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
  .argv;

// console.log(argv.address); just used this to find what was in argv
const encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`


axios.get(geocodeUrl).then((response)=> {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  console.log(response.data);
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/ae898d894fdeeccd65954b9f7799cca3/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
}).then((response)=> {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
      console.log('UNABLE TO connect to api servers');
  } else {
      console.log(e.message);
  }
});
//i'm over query limit


//
// axios.get(geocodeUrl).then((response)=> {
//   if (response.data.status === 'ZERO_RESULTS') {
//     throw new Error('Unable to find that address.');
//   }
//   var lat = response.data.results[0].geometry.location.lat;
//   var lng = response.data.results[0].geometry.location.lng;
//   var weatherUrl = `https://api.darksky.net/forecast/ae898d894fdeeccd65954b9f7799cca3/${lat},${long}`;
//   console.log(response.data.results[0].formatted_address);
//     return axios.get(weatherUrl);
//   }).then((response) => {
//     var temperature = response.data.currently.temperature;
//     var apparentTemperature = response.data.currently.apparentTemperature;
//     console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
//   }).catch((e) => {
//     if (e.code === 'ENOTFOUND') {
//       console.log('Unable to connect to API servers.');
//     } else {
//       console.log(e.message);
//     }
//   });

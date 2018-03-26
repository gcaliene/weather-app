const request = require('request');


const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  // console.log(encodedAddress);
  //request takes two arguments, options and callback
  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
    json: true, // this converts the json data to object for us
  }, (error, response, body) => { //body is found in the response
    // console.log(JSON.stringify(response, undefined, 2));// this makes the data easily viewable
    //console.log('error:', error);//error doesn't print the error
    if (response.statusCode === 400){
      callback('unable to connect to google servers');
    } else if (body.status === 'ZERO_RESULTS'){
      callback('UNABLE TO FIND THAT ADDRESS');
    } else if (body.status == 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
      // console.log(`address: ${body.results[0].formatted_address}`); //results has an array on it
      // console.log(`The lat is: ${body.results[0].geometry.location.lat}`);
      // console.log(`The lng is: ${body.results[0].geometry.location.lng}`);
    }
  });
}

module.exports.geocodeAddress =  geocodeAddress;

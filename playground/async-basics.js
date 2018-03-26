console.log('starting app');

setTimeout(() => {
  console.log('inside of callback');
}, 2000);

console.log('finishing up');

//a callback function is a function that is called back as an argument in another function

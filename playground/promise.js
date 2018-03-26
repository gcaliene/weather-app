//don't worry about having callbacks called twice
var asyncAdd = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }else{
        reject('arguments must be numbers')
      }
    }, 1500)
  });
}

asyncAdd(3,4).then((res)=>{
  console.log('Results: '+ res);
  return asyncAdd(res,'33');
}).then((res)=> { //not using the error argument and instead will use the CATCH
  console.log('Should be 40:', res);
}).catch((errorMessage)=>{ //catch does only errors, specifies errorhandler for all our previous errors
  console.log(errorMessage);
})


//
// var somePromise = new Promise((resolve,reject) => {
//   setTimeout(()=> {
//     resolve('hey. it worked');
//     reject('unable to fulfill promise');
//   }, 1500); //so our function won't get called for another 2.5seconds
// });
//
// somePromise.then((message) => { //this will work only if the promise gets fulfilled
//   console.log('success:', message);
// }, (errorMessage) => {
//   console.log('Error:', errorMessage);
// })



var testCallbackPromise = (data, callback) => {

  callback(123, data, (err, result) => {
    console.log(err, result)
  })
}



testCallbackPromise({
  "name": "zengyongaung"
},
(openId, data, callback) => {
  new Promise(function(resolve, reject){
    resolve({openId, data})
  }).then((result)=> {
      return callback(null, result)
  })
})
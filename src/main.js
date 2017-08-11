

import cache from './utils/cache'
import {COUNTER, DRAWLOTTERY_QUEUE, PLAYER_BET} from './utils/cache_key'


setTimeout(async () => {


  // let counter, drawLyValue = []
  // try {
  //   console.log(COUNTER)
  //   let  drawLyQueue = await cache.client.lrange(DRAWLOTTERY_QUEUE, 0, 5)
  //   const multi = cache.client.multi()
  //   multi.get(COUNTER)
  //   for (let val of drawLyQueue) {
  //     multi.hgetall(val)
  //   }
  //   let value = await multi.exec()
  //   counter = value[0]
  //   for (let i = 1; i <= drawLyQueue.length; i++) {
  //     drawLyValue.push(value[i])
  //   }
  //   console.log(counter, drawLyValue)
   

  // } catch (err) {
  //   console.log(err)
  // }
    let rateId = 0;
    let money = 100;
    console.log("test")
    let globalBatInfo = await cache.getHashCache(`${PLAYER_BET}_${rateId}`)
    console.log(globalBatInfo)
    if (!Object.keys(globalBatInfo).length) {
      globalBatInfo = {
        "money": 0,
        "count": 0,
      }
    }
    globalBatInfo.money = parseFloat(globalBatInfo.money)
    globalBatInfo.count = parseInt(globalBatInfo.count)
    await cache.setHashCache(`${PLAYER_BET}_${rateId}`, ['money', parseFloat(globalBatInfo.money) + money, 'count',  globalBatInfo.count + 1])
}, 3000)

















// var testCallbackPromise = (data, callback) => {

//   callback(123, data, (err, result) => {
//     console.log(err, result)
//   })
// }



// testCallbackPromise({
//   "name": "zengyongaung"
// },
// (openId, data, callback) => {
//   new Promise(function(resolve, reject){
//     resolve({openId, data})
//   }).then((result)=> {
//       return callback(null, result)
//   })
// })
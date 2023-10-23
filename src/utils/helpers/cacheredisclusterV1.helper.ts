// Module
const { promisify } = require('util');
const axios = require('axios');
const ioRedis = require('ioredis');
const RedisTimeout = require('ioredis-timeout');
const moment = require('moment');
const lodash = require('lodash');
import _ from 'lodash'
// Config
import objConfig from './rediscluster-config'
let client: any = null
// Reponse
const retRet = {
  'result': true,
  'remark': 'success',
  'run_time': null,
  'data': []
}
const init = () => {
  client = new ioRedis.Cluster(
    objConfig.host,
    objConfig.option
  )
RedisTimeout(client, objConfig.option.timeout)
  client.on('ready', () => {
    // console.log('2rd init Cache Redis Cluster Connect is success', client)
    console.log('2rd Cache Redis Cluster Connect is success')
  })

   client.on('error', (err: any) => {
    console.log(`2rd init Cache Redis Cluster init fail : ${err}`)
  })
}
const basic = {
  set: (strKey: any, strValue: any, intExpireMinute: any) => {
    return new Promise(async (resolve) => {
      const et: any = Date.now()
      const _objRet = Object.create(retRet)

      if (client === null) {
        await init()
      }

      // execute
      try {
        client.set(strKey, strValue, 'EX', intExpireMinute, (err: any, res: any) => {
          if (err) {
            _objRet.result = false
            _objRet.remark = `err : ${err.stack}`
          } else {
            _objRet.data = res
          }
        })
      } catch (err: any) {
        _objRet.result = false
        _objRet.remark = `catch : ${err.stack}`

      } finally {
        _objRet.run_time = Date.now() - et
        return resolve(_objRet)
      }
    })
  },
  get: (strKey: any) => {
    return new Promise(async (resolve) => {
      const et: any = Date.now()
      const _objRet = Object.create(retRet)

      if (client === null) {
        await init()
      }

      // execute
      try {
        client.get(strKey, (err: any, res: any) => {
          if (err) {
            _objRet.result = false
            _objRet.remark = `err : ${err.stack}`
          } else {
            _objRet.data = res

            if (res === null) {
              _objRet.result = false
              _objRet.remark = `key not found`
            }
          }
        })
      } catch (err: any) {
        _objRet.result = false
        _objRet.remark = `catch : ${err.stack}`
      } finally {
        _objRet.run_time = Date.now() - et
        return resolve(_objRet)
      }
    })
  },
  expire: (strKey: any, intExpireMinute = -1) => {
    return new Promise(async (resolve) => {
      const et: any = Date.now()
      const _objRet = Object.create(retRet)

      if (client === null) {
        await init()
      }

      // execute
      try {
        client.expire(strKey, intExpireMinute, (err: any, res: any) => {
          if (err) {
            _objRet.result = false
            _objRet.remark = `err : ${err.stack}`
          } else {
            _objRet.data = res

            if (res === 0) {
              _objRet.result = false
              _objRet.remark = `key not found`
            }
          }
        })
      } catch (err: any) {
        _objRet.result = false
        _objRet.remark = `catch : ${err.stack}`
      } finally {
        _objRet.run_time = Date.now() - et
        return resolve(_objRet)
      }
    })
  },
  ttl: (strKey: any) => {
    return new Promise(async (resolve) => {
      const et: any = Date.now()
      const _objRet = Object.create(retRet)

      if (client === null) {
        await init()
      }

      // execute
      try {
        client.ttl(strKey, (err: any, res: any) => {
          if (err) {
            _objRet.result = false
            _objRet.remark = `err : ${err.stack}`
          } else {
            if (res === -2) {
              _objRet.result = false
              _objRet.remark = `key not found`
            } else if (res === -1) {
              _objRet.data = {
                in_second: res,
                at_time: '9999-12-31 23:59:59'
              }
            } else {
              _objRet.data = {
                in_second: res,
                at_time: moment().add(res, 's').format('YYYY-MM-DD HH:mm:ss')
              }
            }
          }
        })
      } catch (err: any) {
        _objRet.result = false
        _objRet.remark = `catch : ${err.satck}`
      } finally {
        _objRet.run_time = Date.now() - et
        return resolve(_objRet)
      }
    })
  },
  exists: (strKey: any) => {
    return new Promise(async (resolve) => {
      const et: any = Date.now()
      const _objRet = Object.create(retRet)

      if (client === null) {
        await init()
      }

      // execute
      try {
        client.exists(strKey, (err: any, res: any) => {
          if (err) {
            _objRet.result = false
            _objRet.remark = `err : ${err}`
          } else {
            _objRet.data = res
          }
        })
      } catch (err: any) {
        _objRet.result = false
        _objRet.remark = `catch : ${err}`
      } finally {
        _objRet.run_time = Date.now() - et
        return resolve(_objRet)
      }
    })
  },
  del: (strKey: any) => {
    return new Promise(async (resolve) => {
      const et: any = Date.now()
      const _objRet = Object.create(retRet)

      if (client === null) {
        await init()
      }

      // execute
      try {
        client.del(strKey, (err: any, res: any) => {
          if (err) {
            _objRet.result = false
            _objRet.remark = `err : ${err}`
          } else {
            _objRet.data = res
            if (res === 0) {
              _objRet.result = false
              _objRet.remark = `key not found`
            }
          }
        })
      } catch (err: any) {
        _objRet.result = false
        _objRet.remark = `catch : ${err.sack}`
      } finally {
        _objRet.run_time = Date.now() - et
        return resolve(_objRet)
      }
    })
  },
  scan: (strPattern = '*') => {
    return new Promise(async (resolve) => {
      const et: any = Date.now()
      const _objRet = Object.create(retRet)

      if (client === null) {
        await init()
      }

      // execute
      try {
        const promiseStack = client.nodes('master').map((node: any) => {
          return node.keys(strPattern)
        })

        Promise.all(promiseStack).then(res => {
          const arrFlat = _.flattenDeep(res)
          _objRet.data = {
            found: arrFlat.length,
            keys: _.orderBy(arrFlat, [], ['asc'])
          }
        })
      } catch (err: any) {
        _objRet.result = false
        _objRet.remark = `catch : ${err.stack}`
      } finally {
        _objRet.run_time = Date.now() - et
        return resolve(_objRet)
      }
    })
  },
  flush: (strPattern = '*') => {
    return new Promise(async (resolve) => {
      const et: any = Date.now()
      const _objRet = Object.create(retRet)

      if (client === null) {
        await init()
      }

      // execute
      try {
        const stackNode = client.nodes('master').map((node: any) => {
          return node.keys(strPattern)
        })

        Promise.all(stackNode).then(res => {
          const arrFlat = _.flattenDeep(res)

          const stackKey = arrFlat.map((key: any) => {
            client.del(key)
          })

          Promise.all(stackKey).then(res => {
            _objRet.data = {
              flush: arrFlat.length,
              keys: _.orderBy(arrFlat, [], ['asc'])
            }
          })
        })
      } catch (err: any) {
        _objRet.result = false
        _objRet.remark = `catch : ${err.stack}`
      } finally {
        _objRet.run_time = Date.now() - et
        return resolve(_objRet)
      }
    })
  }
}
export default {
    'init': init,
    'config': objConfig,
    'basic': basic
}
/**************class******************/
let clients: any = null
clients = new ioRedis.Cluster(
  objConfig.host,
  objConfig.option
)
RedisTimeout(clients, objConfig.option.timeout)
clients.on('ready', () => {
  // console.log('3rd init Cache Redis Cluster Connect is success', clients)
  console.log('3rd Cache Redis Cluster Connect is success')
})

 clients.on('error', (err: any) => {
  console.log(`3rd init Cache Redis Cluster init fail : ${err}`)
 })

export class CacheData { 
      async SetCacheData(setData: any) {
        const time = setData.time;
        const keycache = setData.keycache;
        const data = setData.data;
        console.log('setcache setData', setData);
        await clients.setex(keycache, time, JSON.stringify(data));  // set data cache 
        console.log('keycache', keycache);
        return keycache
      }
      async GetCacheData(keycache: any) {
        const result = await promisify(clients.get).bind(clients)(keycache); // get data cache
        const resultcache = JSON.parse(result);
        console.log('keycache', keycache);
        console.log('getcache resultcache', resultcache);
        return resultcache
      }
      async DeleteCacheData(keycache: any) {
        await /* Converting a callback-based function to a promise-based function. */
          promisify(clients.del).bind(clients)(keycache); // del data cache 
        console.log('del keycache', keycache);
        return keycache
      }
      async Test(setData: any) {
        const time = setData.time;
        const keycache = 'Test_Cache'; 
        console.log('keycache', keycache);
        return keycache
      }
      async OTP(keycache: any) {
          let date: any =  Date.now()
          var nowseconds = new Date().getTime()
          var timestamp: any = nowseconds
          var datenew = new Date(timestamp);
          const dayth = toThaiDate(datenew);
          const dayen = toEnDate(datenew);
          const time = 30;    
          const data = getRandomint(6);
          const keyotp = getRandomString(7);
          const key: any = 'OTP_'+keyotp+'_'+data+'_'+timestamp;
          console.log('Random int', data);
          console.log('key otp',keyotp);
          await clients.setex(key,time,JSON.stringify(data));  // set data cache 
          console.log('keycache', key); 
          const getOTP =await promisify(clients.get).bind(clients)(key); // get data cache
          const result_cache_OTP = JSON.parse(getOTP);
          var startDate = new Date(timestamp);
          var endDate = new Date(timestamp);
          if (startDate < endDate){
          // Do something
          }
          const OTP = {
                          key: key,
                          time:time, 
                          OTP: result_cache_OTP,
                          day_th: dayth,
                          day_en: dayen,  
                          timestamp:timestamp, 
                          time_start:datenew, 
                        }
            console.log('OTP', OTP); 
            return OTP
          // await clients.disconnect();
      }
      async Run(keycache: any) {  
        const time = 30;    
        const data = getRandomint(6);
        const keyotp = getRandomString(12);
        const key: any = 'OTP_'+keyotp+'_'+data;
        console.log('Random int', data);
        console.log('key otp',keyotp);
        await clients.setex(key,time,JSON.stringify(data));  // set data cache 
        console.log('keycache', key); 
        const result =await promisify(clients.get).bind(clients)(key); // get data cache
        const resultcache = JSON.parse(result);
        const run = {
                        key: key,
                        time:time, 
                        OTP:resultcache, 
                      }
          console.log('run', run); 
          return run
        // await clients.disconnect();
      }
}
function getRandomString(length: any) { 
  var randomChars: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#';
  var result: any =  ''
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}
function getRandomint(length: any) { 
  var randomChars: any =  '0123456789';
  var result: any =  ''
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}
function toThaiDate(date: any) { 
  let monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]; 
      let year = date.getFullYear() + 543;
      let month = monthNames[date.getMonth()];
      let numOfDay = date.getDate();
      let hour = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      let second = date.getSeconds().toString().padStart(2, "0");
      return `${numOfDay} ${month} ${year} ` +`${hour}:${minutes}:${second} น.`;
}
function toEnDate(date: any) { 
      let monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]; 
      let monthNameslong = ["January", "February", "March.", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
          let year = date.getFullYear()+ 0;
          let month = monthNameslong[date.getMonth()];
          let numOfDay = date.getDate();
          let hour = date.getHours().toString().padStart(2, "0");
          let minutes = date.getMinutes().toString().padStart(2, "0");
          let second = date.getSeconds().toString().padStart(2, "0");
          return `${numOfDay} ${month} ${year} ` +`${hour}:${minutes}:${second}`;
}
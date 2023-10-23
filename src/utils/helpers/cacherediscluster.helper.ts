const { promisify } = require('util');
const ioRedis = require('ioredis');
const RedisTimeout = require('ioredis-timeout');
const moment = require('moment');
const lodash = require('lodash');
import lo from 'lodash'
import objConfig from './rediscluster-config'
let client: any = null
const Call = () => { // Connection Redis Cluster
  client = new ioRedis.Cluster(
        objConfig.host,
        objConfig.option
    )
    RedisTimeout(client, objConfig.option.timeout)
        client.on('ready', () => { 
            console.log('2rd Cache Redis Cluster Connect is success')
        })
        client.on('error', (err: any) => {
            console.log(`2rd init Cache Redis Cluster init fail : ${err}`)
        })
} 
const retRet = {
        'result': true,
        'remark': 'success',
        'runlotime': null,
        'data': []
}
export class CacheData { 
        async Cacheflush(Scankeys = '*') { 
            return new Promise(async (resolve) => {
                    const et: any = Date.now()
                    const Cacheloobjects = Object.create(retRet)
        
                    if (client === null) {
                        await Call()  // Connection Redis
                    }
        
                    // execute
                    try {
                        const stackNode = client.nodes('master').map((node: any) => {
                        return node.keys(Scankeys)
                        })
        
                        Promise.all(stackNode).then(res => {
                        const arrFlat = lo.flattenDeep(res)
        
                        const stackKey = arrFlat.map((key: any) => {
                            client.del(key)
                        })
        
                        Promise.all(stackKey).then(res => {
                            Cacheloobjects.data = {
                            flush: arrFlat.length,
                            keys: lo.orderBy(arrFlat, [], ['asc'])
                            }
                        })
                        })
                    } catch (err: any) {
                        Cacheloobjects.result = false
                        Cacheloobjects.remark = `catch : ${err.stack}`
                    } finally {
                        Cacheloobjects.runlotime = Date.now() - et
                        return resolve(Cacheloobjects)
                    }
                })
        }
        async CacheExpire(setData: any) {
            const TimeExpire = setData.time;
            const keycache = setData.keycache;
            return new Promise(async (resolve) => {
                    const et: any = Date.now()
                    const Cacheloobjects = Object.create(retRet)
        
                    if (client === null) {
                        await Call()  // Connection Redis
                    }
        
                    // execute
                    try {
                        // console.log('Expire  keycache ', keycache)
                        // console.log('Expire  TimeExpire ',TimeExpire)
                        client.expire(keycache, TimeExpire, (err: any, res: any) => {
                        if (err) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `err : ${err.stack}`
                        } else {
                            Cacheloobjects.data = res
        
                            if (res === 0) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `key not found`
                            }
                        }
                        })
                    } catch (err: any) {
                        Cacheloobjects.result = false
                        Cacheloobjects.remark = `catch : ${err.stack}`
                    } finally {
                        Cacheloobjects.runlotime = Date.now() - et
                        return resolve(Cacheloobjects)
                    }
                })
        }
        async CacheExists(setData: any) {
            const keycache = setData.keycache;
            return new Promise(async (resolve) => {
                    const et: any = Date.now()
                    const Cacheloobjects = Object.create(retRet)
        
                    if (client === null) {
                        await Call()  // Connection Redis
                    }
        
                    // execute
                    try {
                        // console.log('Exists  keycache ',keycache)
                        client.exists(keycache, (err: any, res: any) => {
                        if (err) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `err : ${err}`
                        } else {
                            Cacheloobjects.data = res
                        }
                        })
                    } catch (err: any) {
                        Cacheloobjects.result = false
                        Cacheloobjects.remark = `catch : ${err}`
                    } finally {
                        Cacheloobjects.runlotime = Date.now() - et
                        return resolve(Cacheloobjects)
                    }
                })
        }
        async ScanCache(Scankeys = '*') { 
            return new Promise(async (resolve) => {
                    const et: any = Date.now()
                    const Cacheloobjects = Object.create(retRet)
        
                    if (client === null) {
                        await Call()  // Connection Redis
                    }
        
                    // execute
                    try {
                        const promiseStack = client.nodes('master').map((node: any) => {
                        return node.keys(Scankeys)
                        })
        
                        Promise.all(promiseStack).then(res => {
                        const arrFlat = lo.flattenDeep(res)
                        Cacheloobjects.data = {
                            found: arrFlat.length,
                            keys: lo.orderBy(arrFlat, [], ['asc'])
                        }
                        })
                    } catch (err: any) {
                        Cacheloobjects.result = false
                        Cacheloobjects.remark = `catch : ${err.stack}`
                    } finally {
                        Cacheloobjects.runlotime = Date.now() - et
                        return resolve(Cacheloobjects)
                    }
                })
        }
        async TtlCache(setData: any) {
            const TimeExpire = setData.time;
            const keycache = setData.keycache;
            const Value = setData.data;
            return new Promise(async (resolve) => {
                    const et: any = Date.now()
                    const Cacheloobjects = Object.create(retRet)
        
                    if (client === null) {
                        await Call()  // Connection Redis
                    }
        
                    // execute
                    try {
                        client.ttl(keycache, (err: any, res: any) => {
                        if (err) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `err : ${err.stack}`
                        } else {
                            if (res === -2) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `key not found`
                            } else if (res === -1) {
                            Cacheloobjects.data = {
                                inlosecond: res,
                                atlotime: '9999-12-31 23:59:59'
                            }
                            } else {
                            Cacheloobjects.data = {
                                inlosecond: res,
                                atlotime: moment().add(res, 's').format('YYYY-MM-DD HH:mm:ss')
                            }
                            }
                        }
                    })
                } catch (err: any) {
                    Cacheloobjects.result = false
                    Cacheloobjects.remark = `catch : ${err.satck}`
                } finally {
                    Cacheloobjects.runlotime = Date.now() - et
                    return resolve(Cacheloobjects)
                }
                })
        }
        async SetCacheData(setData: any) {
            if (client === null) {
                 await Call()  // Connection Redis
            }
            const time = setData.time;
            const keycache = setData.keycache;
            const data = setData.data;
            // console.log('setcache setData', setData);
            await client.setex(keycache, time, JSON.stringify(data));  // set data cache 
            // console.log('keycache', keycache);
            return keycache
        }
        async GetCacheData(keycache: any) {
            if (client === null) {
                 await Call()  // Connection Redis
            }
            const result = await promisify(client.get).bind(client)(keycache); // get data cache
            const resultcache = JSON.parse(result);
            // console.log('keycache', keycache);
            // console.log('getcache resultcache', resultcache);
            return resultcache
        }
        async DeleteCacheData(keycache: any) {
            if (client === null) {
                 await Call()  // Connection Redis
            }
            await /* Converting a callback-based function to a promise-based function. */
            promisify(client.del).bind(client)(keycache); // del data cache 
            // console.log('del keycache', keycache);
            return keycache
        }
        async Test(setData: any) {
            if (client === null) {
                 await Call()  // Connection Redis
            }
            const time = setData.time;
            const keycache = 'TestloCache'; 
            // console.log('keycache', keycache);
            return keycache
        }
        async OTP(keycache: any) {
            if (client === null) {
                 await Call()  // Connection Redis
            }
            let date: any =  Date.now()
            var nowseconds = new Date().getTime()
            var timestamp: any = nowseconds
            var datenew = new Date(timestamp);
            const dayth = toThaiDate(datenew);
            const dayen = toEnDate(datenew);
            const time = 30;    
            const data = getRandomint(6);
            const keyotp = getRandomString(7);
            const key: any = 'OTP_Auth_'+keyotp+'_'+data+'_'+timestamp;
            // console.log('Random int', data);
            // console.log('key otp',keyotp);
            await client.setex(key,time,JSON.stringify(data));  // set data cache 
            // console.log('keycache', key); 
            const getOTP =await promisify(client.get).bind(client)(key); // get data cache
            const resultlocacheloOTP = JSON.parse(getOTP);
            var startDate = new Date(timestamp);
            var endDate = new Date(timestamp);
            if (startDate < endDate){
            // Do something
            }
            const OTP = {
                            key: key,
                            time:time, 
                            OTP: resultlocacheloOTP,
                            dayloth: dayth,
                            dayloen: dayen,  
                            timestamp:timestamp, 
                            timelostart:datenew, 
                            }
                // console.log('OTP', OTP); 
                return OTP
            // await client.disconnect();
        }
        async Run(keycache: any) {  
            if (client === null) {
                 await Call()  // Connection Redis
            }
            const time = 30;    
            const data = getRandomint(6);
            const keyotp = getRandomString(12);
            const key: any = 'True_plookpanya_OTP_'+keyotp+'_'+data;
            // console.log('Random int', data);
            // console.log('key otp',keyotp);
            await client.setex(key,time,JSON.stringify(data));  // set data cache 
            // console.log('keycache', key); 
            const result =await promisify(client.get).bind(client)(key); // get data cache
            const resultcache = JSON.parse(result);
            const run = {
                            key: key,
                            time:time, 
                            OTP:resultcache, 
                        }
            // console.log('run', run); 
            return run 
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
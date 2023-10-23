const { promisify } = require('util');
const ioRedis = require('ioredis');
const RedisTimeout = require('ioredis-timeout');
const moment = require('moment');
const lodash = require('lodash');
import lo from 'lodash'
import objConfig from './rediscluster-config'
let client: any = null
const Call = () => { // Connection Redis Cluster DB  ส่วนนี้ใช้ในการ เชื่อมต่อ host
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
// ส่วนนี้ใช้ในการ จดการ Cache Redis  แบบ class 
export class CacheData { 
        async Set(setData: any) {
            const TimeExpire = setData.time;
            const keycache = setData.keycache;
            const Value = setData.data;
            //console.log('setcache setData', setData);
            return new Promise(async (resolve) => {
                    const et: any = Date.now()
                    const Cacheloobjects = Object.create(retRet)
                    if (client === null) {
                        await Call()  // Connection Redis ส่วนนี้ใช้ในการ เชื่อมต่อ host
                    }
                    // execute
                    try {
                        //console.log('Set  keycache ', keycache)
                        //console.log('Set  TimeExpire ', TimeExpire)
                        //console.log('Set  Value ', Value)
                        client.set(keycache, Value, 'EX', TimeExpire, (err: any, res: any) => {
                        if (err) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `err : ${err.stack}`
                        } else {
                            Cacheloobjects.data = res
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
        async Get(setData: any) {
            const keycache = setData.keycache;
            return new Promise(async (resolve) => {
                    const et: any = Date.now()
                    const Cacheloobjects = Object.create(retRet)
        
                    if (client === null) {
                        await Call()  // Connection Redis
                    }
        
                    // execute
                    try {
                        // console.log('Get  keycache ', keycache) 
                        client.get(keycache, (err: any, res: any) => {
                        if (err) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `err : ${err.stack}`
                        } else {
                            Cacheloobjects.data = res
        
                            if (res === null) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `key not found`
                            }
                        }
                        })
                        // console.log('Get  Cacheloobjects ', Cacheloobjects) 
                    } catch (err: any) {
                        Cacheloobjects.result = false
                        Cacheloobjects.remark = `catch : ${err.stack}`
                    } finally {
                        Cacheloobjects.runlotime = Date.now() - et
                        return resolve(Cacheloobjects)
                    }
                })
        }
        async Del(setData: any) {
            const keycache = setData.keycache;
            return new Promise(async (resolve) => {
                    const et: any = Date.now()
                    const Cacheloobjects = Object.create(retRet)
        
                    if (client === null) {
                        await Call()  // Connection Redis
                    }
        
                    // execute
                    try {
                        client.del(keycache, (err: any, res: any) => {
                        if (err) {
                            Cacheloobjects.result = false
                            Cacheloobjects.remark = `err : ${err}`
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
                        Cacheloobjects.remark = `catch : ${err.sack}`
                    } finally {
                        Cacheloobjects.runlotime = Date.now() - et
                        return resolve(Cacheloobjects)
                    }
                })
        }
        async flush(Scankeys = '*') { 
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
        async Expire(setData: any) {
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
        async Exists(setData: any) {
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
        async Scan(Scankeys = '*') { 
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
        async Ttl(setData: any) {
            // เช็คเวลาที่เหลือของข้อมูล
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
        /***************Function แนะนำให้ใช้งาน*****************/
        async SetCacheData(setData: any) {
            if (client === null) {
                 await Call()  // Connection Redis  เชื่อมต่อ host
            }
            // รับขอมูลมาแบบ array time=ระยะเวลา keycache=ชื่อ คีย์  data= ข้อมูลทีนำมา cache
            const time = setData.time;
            const keycache = setData.keycache;
            const data = setData.data;
            // console.log('setcache setData', setData);
            await client.setex(keycache, time, JSON.stringify(data));  // set data cache  // ส่วนนี้ใช้ในการ บันทึกข้อมูลลง บน cache
            // console.log('keycache', keycache);
            return keycache
        }
        async GetCacheData(keycache: any) {
            if (client === null) {
                 await Call()  // Connection Redis
            }
            const result = await promisify(client.get).bind(client)(keycache); // get data cache ส่วนนี้ใช้ในการ ดึงข้อมูลจาก cache มาแสดง
            const resultcache = JSON.parse(result);
            // console.log('keycache', keycache);
            // console.log('getcache resultcache', resultcache);
            return resultcache
        }
        async DeleteCacheData(keycache: any) {
            if (client === null) {
                 await Call()  // Connection Redis
            }
            await promisify(client.del).bind(client)(keycache); // del data cache  ส่วนนี้ใช้ในการ ลบมูล ออกจาก cache 
            // console.log('del keycache', keycache);
            return keycache
        } 
        async resetCacheById(keycache: any) {
            if (client === null) {
                await Call()  // Connection Redis
                /*
                    client.on("error", function (err) {
                        console.log("Error " + err);
                        });
                */
            } 
            // client.getset(key, 0, (err, reply) => {
            await promisify(client.getset).bind(client)(keycache,0); // del data cache  ส่วนนี้ใช้ในการ ลบมูล ออกจาก cache 
            // console.log('keycache', keycache);
            return keycache
        } 
         /***************Function แนะนำให้ใช้งาน*****************/ 
        // updateCache
        async inrcCache(keycache: any) {
            const result = await promisify(client.incr).bind(client)(keycache); 
            return result
        }
        async UpdateCacheData(setData: any) {
            if (client === null) {
                 await Call()  // Connection Redis  เชื่อมต่อ host
            }
            // รับขอมูลมาแบบ array time=ระยะเวลา keycache=ชื่อ คีย์  data= ข้อมูลทีนำมา cache
            let id = setData.id;
            const time = setData.time;
            const keycache = setData.keycache;
            const value_data = setData.data;
            console.log('setcache setData', setData);
            if (id == '') {
                await client.getset(keycache, JSON.stringify(value_data));  // update Cache // ส่วนนี้ใช้ในการ บันทึกข้อมูลลง บน cache
            } else {
                await client.hset(id, keycache, time, JSON.stringify(value_data));  // update Cache // ส่วนนี้ใช้ในการ แก้ไขข้อมูลลง บน cache   
            }
            console.log('id cache', id);
            console.log('keycache', keycache);
            console.log('value_data', value_data);
            console.log('time', time);
            return keycache
        }
        // gethCacheById
        async gethCacheById(setData: any) {
            if (client === null) {
                 await Call()  // Connection Redis  เชื่อมต่อ host
            }
            // รับขอมูลมาแบบ array time=ระยะเวลา keycache=ชื่อ คีย์  data= ข้อมูลทีนำมา cache
            let id = setData.id;
            const time = setData.time;
            const keycache = setData.keycache;
            const value_data = setData.data;
            console.log('setcache setData', setData);
            // gethCacheById
            const result = await promisify(client.hmget).bind(client)(id,keycache); // gethCacheById
            console.log('id cache', id);
            console.log('keycache', keycache);
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
            const key: any = 'OTP_Auth_'+data;
            // console.log('Random int', data);
            // console.log('key otp',keyotp);
            await client.setex(key,time,JSON.stringify(data));  // set data cache 
            console.log('keycache ', key); 
            const getOTP = await promisify(client.get).bind(client)(key); // get data cache
            console.log('getOTP ', getOTP); 
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
        async validateOTP(setData: any) {
            const keycache = setData.keycache; //  var otpvalchk = 'OTP_Auth_' + otpval + '_' + timestamp;
            const otpval = setData.otpval;
            const timestamp = setData.timestamp;
            const keycachedata = 'OTP_Auth_'+otpval;
            if (client === null) {
                 await Call()  // Connection Redis
            } 
            const rsOTP = await promisify(client.get).bind(client)(keycachedata); // get data cache   
            const resultlocacheloOTP = JSON.parse(rsOTP);
            console.log('validateOTP otp val=>',otpval);
            console.log('validateOTP rs OTP=>', resultlocacheloOTP);
            console.log('validateOTP key=>',keycachedata);
            if (otpval == resultlocacheloOTP) {
                var status:number=1
            } else {
                var status:number=0
            }
            return status 
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
// https://www.tabnine.com/code/javascript/classes/redis/RedisClient
// https://medium.com/scale360-engineering/redis-ฉบับเริ่มต้น-ใน-1-วัน-458b78e6d60a
// https://www.npmjs.com/package/redis
/*
    https://redis.io/docs/
    List
    LPUSH คือ การสร้าง list (โดยถ้ามีอยู่แล้วจะเป็นการเพิ่มข้อมูล) เพิ่มข้อมูลที่ด้วแรก
    RPUSH เหมือนกับ LPUSH แต่จะเป็นการเพิ่มข้อมูลต่อหลังตัวสุดท้าย
    LRANGE คือการดึงข้อมูล 0 คือตัวแรก -1 คือตัวสุดท้าย
    LPOP , RPOP คือการดึงข้อมูลออกจาก list จากด้านหัว และ ท้ายตามลำดับ
 
    Hashes
    ถ้าจะอธิบายให้ง่ายก็คือ key: [ key1:value1 , key2:value2]
    เช่น user:1 มี key = name , value = thehoi และ key = age , value = 20
    hmset คือสร้าง hash ขึ้นมาโดยมีสมาชิกได้หลายตัว
    hget คือ get value ด้วย key ของสมาชิก
    hmget คือ get value ด้วย key หลายๆตัวพร้อมกัน
    hgetall คือ get ข้อมูลทั้งหมด
    PUB/SUB
    คือการที่มีช่องสำหรับการรับ-ส่งข้อมูล
    เหมาะกับการคุยกันระหว่าง server to server
    ถ้าคิดไม่ออก ก็ให้คิดว่ามันทำงานคล้ายๆกับ message queue broker เช่น kafka
    เรียนนี้ผมเคยเขียนไว้สมัยลองเล่น redis แรกๆ ลองไปอ่านดู =>>> Redis Pub/Sub กับ Spring boot

    Delete Data
    FLUSHDB ลบข้อมูลเฉพาะ Database ที่ต่ออยู่
    FLUSHALL ลบข้อมูลทุก Database
*/
/*
    gethCacheById
    const result = await promisify(client.hmget).bind(client)(id,keycache); // gethCacheById
    async SetCacheData(setData: any) {
        let id = setData.id;
        const time = setData.time;
        const keycache = setData.keycache;
        const value_data = setData.data;
        await client.setex(keycache, time, JSON.stringify(value_data));  // set data cache  // ส่วนนี้ใช้ในการ บันทึกข้อมูลลง บน cache
        await client.getset(keycache, JSON.stringify(value_data));  // update Cache // ส่วนนี้ใช้ในการ บันทึกข้อมูลลง บน cache
        await client.hset(id, keycache, time, JSON.stringify(value_data));  // update Cache // ส่วนนี้ใช้ในการ แก้ไขข้อมูลลง บน cache   
        const result = await promisify(client.get).bind(client)(keycache); // get data cache ส่วนนี้ใช้ในการ ดึงข้อมูลจาก cache มาแสดง
        await promisify(client.del).bind(client)(keycache); // del data cache  ส่วนนี้ใช้ในการ ลบมูล ออกจาก cache 
        function updatehCache(id, key, value) {
        return new Promise((resv, rej) => {
                client.hset(id, key, value, (err, res) => {
                resv(1);
                })
            })
        }
 */
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
if (process.env.NODE_ENV === "production") {
	    dotenv.config();	 
} else {
	    dotenv.config({ path: ".env" }); 
} 
const redis_option: any = process.env.REDIS_OPTION || '1';
const redis_port: any = process.env.REDIS_PORT || '6379';
const redis_host: any = process.env.REDIS_HOST || '127.0.0.1';
const redis_password: any = process.env.REDIS_PASSWORD || '';
const redis_key_file: any = process.env.REDIS_KEY_FILE || '';
const redis_cert: any = process.env.REDIS_CERT|| '';
const redis_ca : any = process.env.REDIS_CA|| '';
const { promisify } = require('util');
const axios = require('axios');
const redis = require('redis');
//const client = redis.createClient(redis_port, redis_host);
let client: any = null
const Call = () => { // Connection Redis Cluster DB  ส่วนนี้ใช้ในการ เชื่อมต่อ host
      const client = redis.createClient({
            host: redis_host,
            port: parseInt(redis_port),
            password: redis_password
          })
      const clienton = client.on('ready', () => {
      console.log('Services Connecting to redis!',' host:'+redis_host+' port:'+redis_port+' password :'+redis_password); 
      });
      const clienterror = client.on('error', (err: any) => {
      console.log(`REDIS init fail : ${err}`)
      })
} 
const redis_ready = client.ready
console.log('redis ready',redis_ready);
export class CacheDataOne {
  async SetCacheData(setData: any) { 
              if (client === null) {
                    await Call()  // Connection Redis
              }
              const time = setData.time;   
              const keycache = setData.keycache;
              const data = setData.data;
              console.log('setcache setData',setData);
              await client.setex(keycache, time, JSON.stringify(data));  // set data cache 
              console.log('keycache',keycache); 
          return keycache
  }
  async GetCacheData(keycache: any) { 
          if (client === null) {
                await Call()  // Connection Redis
          }
              const result =await promisify(client.get).bind(client)(keycache); // get data cache
              const resultcache = JSON.parse(result);
              console.log('keycache',keycache);
              console.log('getcache resultcache',resultcache);
          return resultcache
  }
  async DeleteCacheData(keycache: any) { 
          if (client === null) {
                await Call()  // Connection Redis
           }
            await /* Converting a callback-based function to a promise-based function. */
            promisify(client.del).bind(client)(keycache); // del data cache 
          console.log('del keycache',keycache); 
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
      const key: any =  'OTP_Auth_'+data; // 'OTP_'+keyotp+'_'+data+'_'+timestamp;
      console.log('Random int', data);
      console.log('key otp',keyotp);
      await client.setex(key,time,JSON.stringify(data));  // set data cache 
      console.log('keycache', key); 
      const getOTP =await promisify(client.get).bind(client)(key); // get data cache
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
       // await client.disconnect();
  }
  async validateOTP(setData: any) {
    if (client === null) {
          await Call()  // Connection Redis
    }
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
    const key: any = 'OTP_'+keyotp+'_'+data;
    console.log('Random int', data);
    console.log('key otp',keyotp);
    await client.setex(key,time,JSON.stringify(data));  // set data cache 
    console.log('keycache', key); 
    const result =await promisify(client.get).bind(client)(key); // get data cache
    const resultcache = JSON.parse(result);
    const run = {
                    key: key,
                    time:time, 
                    OTP:resultcache, 
                  }
      console.log('run', run); 
      return run
     // await client.disconnect();
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
/*********Connected redis  **********/
// https://www.sitepoint.com/using-redis-node-js
// npm install redis -S
/*
  const result = await promisify(client.get).bind(client)(keycache); // get data cache
  const resultcache = JSON.parse(result); 
  await promisify(client.del).bind(client)(keycache); // del data cache 
  await client.setex(keycache, time, JSON.stringify(ResuttData));  // set data cache 
*/
/*
      const headers: any = req.headers  
      const body: any = req.body  
      const query: any = req.query   
      const params: any = req.params  
      const deletekey : any = query.deletekey;
      let typeResult: any[] = []; 
      const keycache: any = 'Type'+typeId; 
      const time: Number = 3600;   
      const resultcache = getcache(keycache);   
      const del: any = deletecache(keycache);   
      const setData: any = {}
      setData.time = time;
      setData.keycache = keycache;
      setData.data = typeResult;
      setcache(setData);  

*/
    /*
    async function getcache (keycache: any) { 
            const result =await promisify(client.get).bind(client)(keycache); // get data cache
            const resultcache = JSON.parse(result);
            console.log('keycache',keycache);
            console.log('getcache resultcache',resultcache);
        return resultcache
    }
    async function setcache(setData: any) { 
            const time = setData.time;   
            const keycache = setData.keycache;
            const data = setData.data;
            console.log('setcache etData',setData);
            await client.setex(keycache, time, JSON.stringify(data));  // set data cache 
            console.log('keycache',keycache); 
        return data
    }
    async function deletecache(keycache: any) { 
            await promisify(client.del).bind(client)(keycache); // del data cache 
            console.log('del keycache',keycache); 
        return keycache
    }
    */
    /*
    module.exports = {
        getcache: (req:any, res:any, next:any) => {
              const { keycaches } = req.headers
              const headers: any = req.headers  
              const body: any = req.body  
              const query: any = req.query   
              const params: any = req.params  
              const deletekey: any = req.deletekey;
              const time: Number = req.time || 3600;
              const keycache: any =  req.keycache;
              const data: any = req.data;
              client.get(keycache, function(err:any, reply:any) {
                if (err) {
                  res.StatusCode(500).json({
                    StatusDescription: "Somethin Went Wrong"
                  })
                }
                if (reply == null) {
                  next()
                } else {
                  res.StatusCode(200).json({
                    StatusDescription: `Success Read ${keycache}`,
                    data: JSON.parse(reply)
                  })
                }
              });
            },
        setcache: (keycache:any,time:Number,data:any) => {
              //client.set(keycache, JSON.stringify(data))
              client.setex(keycache, time, JSON.stringify(data));  // set data cache  time
              console.log("setcache key", keycache)
              console.log("setcache time", time)
              console.log("setcache data", data)
            },
        deletecache: (keycache:any) => {
              //client.del(key)
              const del: any=  promisify(client.del).bind(client)(keycache); // del data cache 
              console.log("deletecache", del)
            }
    }
*/
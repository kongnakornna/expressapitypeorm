import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
if (process.env.NODE_ENV === "production") dotenv.config();
else dotenv.config({ path: ".env.dev" });
const redis_option: any = process.env.REDIS_OPTION || '1';
const redis_port: any = process.env.REDIS_PORT;
const redis_host: any = process.env.REDIS_HOST;
const redis_password: any = process.env.REDIS_PASSWORD;
const redis_key_file: any = process.env.REDIS_KEY_FILE;
const redis_cert: any = process.env.REDIS_CERT || '';
const redis_ca : any = process.env.REDIS_CA || '';
const { promisify } = require('util');
const axios = require('axios');
const redis = require('redis');
//const client = redis.createClient(redis_port, redis_host);
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
 
const redis_ready = client.ready
console.log('redis ready',redis_ready);
export class CacheDataOne {
  async SetCacheData(setData: any) { 
              const time = setData.time;   
              const keycache = setData.keycache;
              const data = setData.data;
              console.log('setcache setData',setData);
              await client.setex(keycache, time, JSON.stringify(data));  // set data cache 
              console.log('keycache',keycache); 
          return keycache
    }
    async GetCacheData(keycache: any) { 
              const result =await promisify(client.get).bind(client)(keycache); // get data cache
              const resultcache = JSON.parse(result);
              console.log('keycache',keycache);
              console.log('getcache resultcache',resultcache);
          return resultcache
    }
    async DeleteCacheData(keycache: any) { 
              await /* Converting a callback-based function to a promise-based function. */
              promisify(client.del).bind(client)(keycache); // del data cache 
              console.log('del keycache',keycache); 
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
  async Run(keycache: any) {  
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
                    client:clienton,
                    clienterror:clienterror,
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
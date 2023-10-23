import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
const { promisify } = require('util');
export class Validator {
      validate(input: any) {  
          console.log('input',input);
          const data =  passwordValidator(input);   
          var rts = {
            response: {
                result: "true",
                remark: "success",
                StatusDescription: 'Password Validator',
                message_th: 'Password Validator', 
                status: 200,
                time_ms: null
            },
            data: data,
        };
        console.log('return data',rts);
        return data
      } 
      generatePassword(input: any) {  
        console.log('input',input);
        const data =  generatePassword(input); 
        return data
      } 
      shuffleArray(input: any) {  
        console.log('input',input);
        const data =  shuffleArray(input); 
        return data
      } 
      getRandomString(input: any) {  
        console.log('input',input);
        const data =  getRandomString(input); 
        return data
      } 
      TimeConverter(input: any) {  
        console.log('input',input);
        const data =  timeConverter(input); 
        return data
      } 
      SetCookie(input: any) {  
        console.log('input', input); 
        const name =input.name;   
        const val = input.val;  
        const data =  setCookie(name,val); 
        return data
      } 
      getCookie(input: any) {  
        console.log('input', input);  
        const data =  getCookie(input); 
        return data
      } 
      DeleteCookie(input: any) {  
        console.log('input', input);  
        const data =  deleteCookie(input); 
        return data
      } 
      toThaiDate(input: any) {  
        console.log('input', input);  
        const data =  toThaiDate(input);  
        return data
      } 
      toEnDate(input: any) {  
        console.log('input', input);  
        const data =  toEnDate(input);  
        return data
      }
      getRandomint(input: any) {  
        console.log('input', input);  
        const int:number = getRandomint(input); 
        console.log('return_getRandomint', int);  
        return int
      }
} 
/*****************************************************/ 
function passwordValidator(inputtxt: any){ 
    var paswd :any= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";
    if(inputtxt.match(paswd)){  
        console.log('Your validate password  Correct, try another...:'+inputtxt);
        return true;
    }else{  
            console.log('You validate password Wrong...:'+inputtxt);
        return false;
    }
}  
function generatePassword(passwordLength: any) {
      var numberChars = "0123456789";
      var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var lowerChars = "abcdefghijklmnopqrstuvwxyz";
      var vaChars = "!@#$%^&*";
      var allChars = numberChars + upperChars + lowerChars+ vaChars;
      var randPasswordArray = Array(passwordLength);
      randPasswordArray[0] = numberChars;
      randPasswordArray[1] = upperChars;
      randPasswordArray[2] = lowerChars;
      randPasswordArray = randPasswordArray.fill(allChars, 3);
      return shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}
function shuffleArray(array: any) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}
function getRandomString(length: any) {
    var randomChars: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    // var randomChars2: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result: any =  ''
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
} 
function timeConverter(UNIX_timestamp:any){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
function setCookie(name: string, val: string) {
        const date = new Date();
        const value = val;
        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        // Set it
        document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}
function getCookie(name: string) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            //return parts.pop().split(";").shift();
        }
}
function deleteCookie(name: string) {
        const date = new Date();
        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        // Set it
        document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
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
function getRandomint(length: any) { 
  var randomChars: any =  '0123456789';
  var result: any =  ''
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}
function getRandomsrtsmall(length: any) { 
  var randomChars: any =  'abcdefghijklmnopqrstuvwxyz';
  var result: any =  ''
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}
function getRandomsrtbig(length: any) { 
  var randomChars: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result: any =  ''
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}  
/*****************************************************/ 

/*
http://marcuscode.com/lang/javascript/async-await

async function myFunction() {
    return new Promise((resolve, reject) => {
        resolve('Hello');
    });
}

// Or

async function myFunction() {
    return Promise.resolve('Hello');
}

async function myFunction() {
    return 'Hello';
}


greeting.js
async function greet(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Hello ${name}!`);
        }, 1000);
    });
}

greet('Metin').then((value) => {
    console.log(value);
});
นี่เป็นผลลัพธ์การทำงานของโปรแกรม

Hello Metin!

try {
    let value = await myPromiseFn();
    // Done
} catch (err) {
    // Handing error
}



*/
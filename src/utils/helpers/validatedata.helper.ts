import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
const { promisify } = require('util');
var http = require('http');
export class CheckData { 
    async typeofdata(input: any) {   
        const datachecktype = await typeof (input); // get data cache 
              console.log('input ',input);
              console.log('type of ',datachecktype);
        const datart = {
                input: input,
                datachecktype: datachecktype, 
             }
             
        return datart
    } 
}
function isNumber(data: any) {
    //return (typeof data === 'number');
  }

/*

var x = 12345; 
console.log(typeof x) // number
x = 'string'; 
console.log(typeof x) // string
x = { key: 'value' };
console.log(typeof x) // object


console.log(typeof 42);
// expected output: "number"

console.log(typeof 'blubber');
// expected output: "string"

console.log(typeof true);
// expected output: "boolean"

console.log(typeof undeclaredVariable);
// expected output: "undefined"

In the snippet above, we are making use of two validator methods:

isEmail(): This validator function checks if the incoming string is a valid email address.
isLength(): This validator checks if the length of a string falls in a specified range. In our case, the range specified is a minimum of 6 characters.
Some of the other methods we could've used are:

isNumeric() - Checks if the input is numeric
contains() - Checks if the input contains a certain value
isBoolean() - Check is the input is a boolean value
isCurrency() - Checks if the input is currency-formatted
isJSON() - Checks if the input is JSON
isMobilePhone() - Checks is the input is a valid mobile phone number
isPostalCode() - Checks if the input is a valid postal code
isBefore() and isAfter() - Checks if a date is before or after another date
isEmail(): ฟังก์ชันตรวจสอบนี้จะตรวจสอบว่าสตริงขาเข้าเป็นที่อยู่อีเมลที่ถูกต้องหรือไม่
isLength(): เครื่องมือตรวจสอบนี้จะตรวจสอบว่าความยาวของสตริงอยู่ในช่วงที่ระบุหรือไม่ ในกรณีของเรา ช่วงที่ระบุคืออย่างน้อย 6 อักขระ
วิธีอื่นๆ ที่เราสามารถใช้ได้คือ:

isNumeric()- ตรวจสอบว่าอินพุตเป็นตัวเลขหรือไม่
contains()- ตรวจสอบว่าอินพุตมีค่าที่แน่นอนหรือไม่
isBoolean()- ตรวจสอบว่าอินพุตเป็นค่าบูลีน
isCurrency()- ตรวจสอบว่าอินพุตอยู่ในรูปแบบสกุลเงินหรือไม่
isJSON()- ตรวจสอบว่าอินพุตเป็น JSON . หรือไม่
isMobilePhone()- เช็คคืออินพุตเป็นหมายเลขโทรศัพท์มือถือที่ถูกต้อง
isPostalCode()- ตรวจสอบว่าข้อมูลที่ป้อนเป็นรหัสไปรษณีย์ที่ถูกต้องหรือไม่
isBefore()และisAfter()- ตรวจสอบว่าวันที่อยู่ก่อนหรือหลังวันที่อื่น


*/ 

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
import { Response } from "express";
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
    var randomChars2: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result: any =  ''
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
  }  
export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  serverError = 500,
}

export type IHttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
}

export const ok = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.ok).json(data);
 
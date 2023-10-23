import { NextFunction, Request, Response } from "express";
import { generateToken } from "../utils/helpers/jwtToken.helper";
import { generstate } from "../utils/helpers/jwtToken.helper";
/*********response api **********/
import { ok, serverError, created,Accepted,noContent,badRequest,Unauthorized,Forbidden,NotFound,serviceunavailable } from "../utils/helpers/response.helper";
/**************************************************/
function Randomtoken(length: any) {
    var randomChars: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#';
    var result: any =  ''
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
}
function Randomint(length: any) {
    var randomChars: any =  '0123456789';
    var result: any =  ''
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
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
    var randomChars2: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result: any =  ''
    for ( var i = 0; i < length; i++ ) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
}  
/*****************************************************/ 
export const generateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        const apikey: any = headers.apikey  
        const user_id: number = headers.user_id;
        const apikeyset: any = process.env.API_KEYS
        console.log('env config =>', process.env);
        console.log('apikeyset =>',apikeyset);
        console.log('apikey =>',apikey);
        console.log('user_id =>',user_id);
        if(apikey!=null){ 
            if(apikey==apikeyset){ 
                var gen: number = 0; 
                const result = generateToken({gen}); 
                ok(res, { 
                        token: result,   
                        idkey:apikey,
                        StatusDescription: 'Generated token has been successfully',
                        message_th: 'สร้าง โทเค็นสำเร็จ สามารถนำไปเข้าระบบได้' ,
                    });
            }else{
                ok(res, {  
                    token: null,   
                    idkey:null,
                    StatusDescription: 'forbidden access,invalid apikey',
                    message_th: 'ไม่อนุญาตให้เข้าถึงระบบ,apikey ไม่ถูกต้อง', 
                    });
            }

        } else if (user_id != null) { 
            var vid: number = 1001991; 
            if (user_id == vid) {
                var gen: number = 0; 
                const result = generateToken({gen}); 
                ok(res, { 
                        token: result,   
                        idkey:user_id,
                        StatusDescription: 'Generated token has been successfully',
                        message_th: 'สร้าง โทเค็นสำเร็จ สามารถนำไปเข้าระบบได้' ,
                    });
            } else {
                ok(res, { 
                    token:null, 
                    idkey:user_id,
                    StatusDescription: 'user_id  not match  ,forbidden access ',
                    message_th: 'user_id  ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึงระบบ', 
                });
            }

        }else{ 
            ok(res, {  
                token: null,   
                idkey:null,
                StatusDescription: 'forbidden access,please send data apikey or user_id to generate token',
                message_th: 'ไม่อนุญาตให้เข้าถึงระบบ,กรุณาส่ง apikey หรือ user_id เพื่อรับ token', 
                });
        }
       
    } catch (error) {
        // serverError(res, error?.message);
        // res.StatusCode(401).json({StatusDescription: "serverError"});
        // reportError({ StatusDescription: error })
        serverError(res, { StatusDescription: error });
    }
}
export const generateState = async (req: Request, res: Response, next: NextFunction) => {
    try {
                const gen: any = Randomint(6); 
                const result = generstate({gen}); 
                ok(res, { 
                        state: result,   
                        StatusDescription: 'Generated state has been successfully',
                        message_th: 'สร้าง state สามารถนำไปใช้งานในระบบได้' ,
                    });
       
    } catch (error) { 
        serverError(res, { StatusDescription: error });
    }
}



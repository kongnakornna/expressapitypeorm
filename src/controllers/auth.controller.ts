import { NextFunction, Request, Response } from "express";
import { generateToken } from "../utils/helpers/jwtToken.helper";
/*********response api **********/
import { ok, serverError, created,Accepted,noContent,badRequest,Unauthorized,Forbidden,NotFound,serviceunavailable } from "../utils/helpers/response.helper";
export const generateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        const apikey: any = headers.apikey  
        const user_id: number = headers.user_id;
        const apikeyset: any = process.env.API_KEYS
        if (apikey == null) {
            let str: any = req.headers.authorization 
            let apikey: any = str.replace("Bearer ", "")  
        }if (apikey == null) {
            let str: any = req.headers.authorization 
            let apikey: any = str.replace("key ", "")  
        }
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
                        status: 1, 
                       // idkey:apikey,
                        StatusDescription: 'Generated token has been successfully',
                        StatusDescription_thai: 'สร้าง โทเค็นสำเร็จ สามารถนำไปเข้าระบบได้' ,
                        //headers:headers,body:body,query:query,params:params,
                    });
            }else{
                Forbidden(res, {  
                    token: null, 
                    status: 0, 
                   // idkey:null,
                    StatusDescription: 'forbidden access,invalid apikey',
                    StatusDescription_thai: 'ไม่อนุญาตให้เข้าถึงระบบ,apikey ไม่ถูกต้อง', 
                    //headers:headers,body:body,query:query,params:params,
                    });
            }

        } else if (user_id != null) { 
            var vid: number = 1001991; 
            if (user_id == vid) {
                var gen: number = 0; 
                const result = generateToken({gen}); 
                ok(res, { 
                        token: result, 
                        status: 1, 
                       // idkey:user_id,
                        StatusDescription: 'Generated token has been successfully',
                        StatusDescription_thai: 'สร้าง โทเค็นสำเร็จ สามารถนำไปเข้าระบบได้' ,
                        //headers:headers,body:body,query:query,params:params,
                    });
            } else {
                Forbidden(res, { 
                    token:null,
                    status: 0,
                   // idkey:user_id,
                    StatusDescription: 'user_id  not match  ,forbidden access ',
                   StatusDescription_thai: 'user_id  ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึงระบบ', 
                    //headers:headers,body:body,query:query,params:params,
                });
            }

        }else{ 
            Forbidden(res, {  
                token: null, 
                status: 0, 
               // idkey:null,
                StatusDescription: 'forbidden access,please send data apikey or user_id to generate token',
                StatusDescription_thai: 'ไม่อนุญาตให้เข้าถึงระบบ,กรุณาส่ง apikey หรือ user_id เพื่อรับ token', 
                //headers:headers,body:body,query:query,params:params,
                });
        }
       
    } catch (error) {
        // serverError(res, error?.message);
        // res.StatusCode(401).json({StatusDescription: "serverError"});
        // reportError({ StatusDescription: error })
        serverError(res, { StatusDescription: error });
    }
}

 
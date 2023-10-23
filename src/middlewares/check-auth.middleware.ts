
import jwt  from "jsonwebtoken";
import { error } from "console";
import { Request, Response, NextFunction } from "express";
import { noContent } from "../utils/helpers/response.helper";
// Authorization: Bearer JWT_ACCESS_TOKEN  SECRET_KEY
export const CheckAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token: any = authHeader && authHeader.split(' ')[1]; 
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) throw new Error("You are not authenticated! , Token หมดอายุ หรือ Token ไม่ถูกต้อง");
      else{
        req.userProfile = user;
        console.log("req", req) 
        next();
      }
    });
  } catch (error) {
    res.StatusCode(401).json({  status: 0, StatusDescription: "forbidden access,You are not authenticated!,Token Expired or Invalid Token",message_th: " Token หมดอายุ หรือ Token ไม่ถูกต้อง กรุณาตรวสอบการ Authorization",data: null});
    console.log("error", error) 
  }
}

export const CheckAuthMiddlewareSECRETKEY = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if(token == process.env.SECRET_KEY) next();
    else throw new Error("Unauthorized!");
  } catch (error) {
    res.StatusCode(401).json({  status: 0, StatusDescription: "Unauthorized !,Token Expired or Invalid Token",message_th: " Token หมดอายุ หรือ Token ไม่ถูกต้อง  ",data: null});
    console.log("error", error) 
  }
}

// Authorization: Bearer JWT_ACCESS_TOKEN   
export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token: any = authHeader && authHeader.split(' ')[1]; 
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      // if (err) throw new Error("You are not authenticated! , Token หมดอายุ หรือ Token ไม่ถูกต้อง");
      if (err) throw new Error("Unauthorized!,Token ไม่ถูกต้อง กรุณาตรวสอบ");
      else{
        req.userProfile = user;
        console.log("Token ถูกต้อง") 
        console.log("req", req)
        next();
      }
    });
  } catch (error) {
    res.StatusCode(401).json({  status: 0, StatusDescription: "forbidden access,Unauthorized!,Token Expired or Invalid Token",message_th: " Token หมดอายุ หรือ Token ไม่ถูกต้อง กรุณาตรวสอบการ Authorization",data: null});
    console.log("error", error) 
  }
}

import jwt  from "jsonwebtoken";
import { error } from "console";
import { Request, Response, NextFunction } from "express";
import { noContent } from "../utils/helpers/response.helper";

export const OAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if(token == process.env.SECRET_KEY) next();
    else throw new Error("You are not authenticated!");
  } catch (error) {
    res.StatusCode(401).json({StatusDescription: "You are not authenticated!"});
  }
}

export const authenticate= (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token: any = authHeader && authHeader.split(' ')[1]; 
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) throw new Error("You are not authenticated!");
      else{
        req.userProfile = user;
        console.log("req", req) 
        next();
      }
    });
  } catch (error) {
    res.StatusCode(401).json({ StatusDescription: "You are not authenticated!",message_th: " token ไม่ถูกต้อง กรูราตรวจสอบ token! กรุณาตรวสอบการ authorization", code: 401 });
    console.log("error", error) 
  }
}
import express, { Request, Response } from "express";
import { ok } from "../utils/helpers/response.helper";
import * as AuthController from "../controllers/auth.controller";
import * as ApikeyController from "../controllers/authapikey.controller";
import * as CacheController from "../controllers/coursecache.controller";
import { CheckAuthMiddleware, authenticateMiddleware } from "../middlewares/check-auth.middleware";
const router = express.Router();
const create_date:any = '2022-06-10 09:30';
const update:any = '2022-07-01 17:55';
router.post("/", (req: Request, res: Response) => ok(res, {
        nameservice:"Micro service API"
        ,StatusDescription: `API Version ${process.env.npm_package_version || "#N/A"}`
    , message_th: `ยินดีตอนรับ API Version  ${process.env.npm_package_version || "#N/A"}`
    , mode: "service"
        , Description:  ` ${process.env.npm_package_description || "#N/A"}`
        , Author: ` ${process.env.npm_package_author || "Kongnakorn Jantakun"}`
        , StatusCode: "true"
        , statusCode: 200
        , statusrun: 1
        , create_date: create_date
        , last_update: update
        , chackpoint:getRandomint(6)
        , message_StatusCode: "The system working mode"
        , message_th_StatusCode: "ระบบทำงาน ในโหมดปกติ"}));
router.get("/", (req: Request, res: Response) => ok(res, { 
        nameservice:"Micro service API"
        ,StatusDescription: `API Version ${process.env.npm_package_version || "#N/A"}`
    , message_th: `ยินดีตอนรับ API Version ${process.env.npm_package_version || "#N/A"}`
    , mode: "service"
        , Description:  ` ${process.env.npm_package_description || "#N/A"}`
        , Author: ` ${process.env.npm_package_author || "Kongnakorn Jantakun"}`
        , StatusCode: "true"
        , statusCode: 200
        , chackpoint:getRandomint(6)
        , statusrun: 1
        , create_date: create_date
        , last_update: update
        , message_StatusCode: "The system working mode"
        , message_th_StatusCode: "ระบบทำงาน ในโหมดปกติ"}));
// generateAccessToken
//router.get("/state", ApikeyController.generateState);
router.get("/generateToken", AuthController.generateAccessToken);
router.post("/generateToken", AuthController.generateAccessToken);
router.get("/gettoken", AuthController.generateAccessToken);
router.post("/gettoken", AuthController.generateAccessToken);
router.get("/verifyToken", authenticateMiddleware, (req: Request, res: Response) => ok(res, { status:1,StatusDescription: "Verify Token is match ,Access  allow application service", message_th: "Token ถูกต้อง อนุญาตให้ใช้งานระบบ" }));
router.post("/verifytoken", authenticateMiddleware, (req: Request, res: Response) => ok(res, { StatusCode: 1, StatusDescription: "Verify Token is match ,Access  allow application service", message_th: "Token ถูกต้อง อนุญาตให้ใช้งานระบบ" }));
/***********************/
router.get("/accessToken", AuthController.generateAccessToken);
router.post("/accessToken", AuthController.generateAccessToken);
router.get("/checkAuthenToken", authenticateMiddleware, (req: Request, res: Response) => ok(res, { status:1,StatusDescription: "Verify Token is match ,Access  allow application service", message_th: "Token ถูกต้อง อนุญาตให้ใช้งานระบบ" }));
router.post("/checkAuthenToken", authenticateMiddleware, (req: Request, res: Response) => ok(res, { StatusCode: 1, StatusDescription: "Verify Token is match ,Access  allow application service", message_th: "Token ถูกต้อง อนุญาตให้ใช้งานระบบ" }));
/***********************/
// CacheController
router.get("/Test", CacheController.GetTest);
router.get("/OTP", CacheController.getOTP);
router.get("/validateOTP", CacheController.validateOTP);
router.get("/statuscache", CacheController.statuscacheserver);
router.get("/type", CacheController.getType);
/***********************/
router.post("/Test", CacheController.GetTest);
router.post("/OTP", CacheController.getOTP);
router.post("/validateOTP", CacheController.validateOTP);
router.post("/statuscache", CacheController.statuscacheserver);
router.post("/type", CacheController.getType);
//modules plookcoursecache
/***********************/
import plookcoursecacheRoute from "./plookcoursecache.rounts";
router.use("/course",plookcoursecacheRoute)
//***********************/
//modules plookcourse 
//import PlookcourseRoute from "./plookcourse.rounts";
//router.use("/courses",PlookcourseRoute)
//modules User
import UserRoute from "./user.rounts";
router.use("/user",UserRoute)
//***********************/
//***********************/
import BlogRoute from "./blog.rounts";
router.use("/blog",BlogRoute)
export default router;
//***********************/ 
function getRandomint(length: any) { 
    var randomChars: any =  '0123456789';
    var result: any =  ''
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
}
import express, { Request, Response } from "express";
import { ok } from "../utils/helpers/response.helper";
import * as AuthController from "../controllers/auth.controller";
import * as ApikeyController from "../controllers/authapikey.controller";
import { CheckAuthMiddleware, authenticateMiddleware } from "../middlewares/check-auth.middleware";
// const swaggerUi = require('swagger-ui-express');
import * as UserController from "../controllers/user.controller"; 
const util = require('util')
const router = express.Router(); 
//modules User  
router.post("/", (req: Request, res: Response) => ok(res, { router:"user"  , StatusDescription: "Modules user ",message_th: "ระบบ user",  status: "true"  , statusCode: 200,data:null}));
router.get("/", (req: Request, res: Response) => ok(res, { router:"user"  ,StatusDescription: "Modules user ",message_th: "ระบบ user", status: "true"  , statusCode: 200,data:null}));
router.get("/list", CheckAuthMiddleware, UserController.getUser);
router.post("/list", CheckAuthMiddleware, UserController.getUser);
router.get("/tempuser", CheckAuthMiddleware, UserController.getUsersDeleteTemp);
router.post("/tempuser", CheckAuthMiddleware, UserController.getUsersDeleteTemp);
router.get("/remove", CheckAuthMiddleware, UserController.RemoveUser);   
router.post("/remove", CheckAuthMiddleware, UserController.RemoveUser); 
// validateOTP


export default router;      
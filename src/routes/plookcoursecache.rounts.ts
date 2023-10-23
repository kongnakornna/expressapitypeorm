import express, { Request, Response } from "express";
import { ok } from "../utils/helpers/response.helper";
import * as AuthController from "../controllers/auth.controller";
import * as ApikeyController from "../controllers/authapikey.controller";
import { CheckAuthMiddleware, authenticateMiddleware } from "../middlewares/check-auth.middleware";
// const swaggerUi = require('swagger-ui-express');
import * as PlookcourseController from "../controllers/coursecache.controller"; 
const util = require('util')
/********Schema***********/
// import bodytypeSchema from '../schemas/bodytype' 
const router = express.Router(); 
//modules plookcourse  
router.post("/", (req: Request, res: Response) => ok(res, { router:"course"  ,StatusDescription: "Modules course ",message_th: "ระบบ course", StatusCode: "true"  , statusCode: 200,data:null}));
router.get("/", (req: Request, res: Response) => ok(res, { router:"course"  ,StatusDescription: "Modules course ",message_th: "ระบบ course", StatusCode: "true"  , statusCode: 200,data:null}));
// level student 
router.get("/level", CheckAuthMiddleware, PlookcourseController.getLevel);
// category course  
router.get("/category", CheckAuthMiddleware, PlookcourseController.getCategory);  
// type course
router.get("/type", CheckAuthMiddleware, PlookcourseController.getType); 
// subject course
router.get("/subject", CheckAuthMiddleware, PlookcourseController.getSubject); 
// relate category course
router.get("/section", CheckAuthMiddleware, PlookcourseController.getSection); 
// relate course
router.get("/sectionchild", CheckAuthMiddleware, PlookcourseController.getSectionChild); 
//getCourse on dev
router.get("/all", CheckAuthMiddleware, PlookcourseController.getCourse); 
router.get("/all", CheckAuthMiddleware, PlookcourseController.getCourse); 
router.get("/course", CheckAuthMiddleware, PlookcourseController.getCourse); 
router.get("/coursetask", CheckAuthMiddleware, PlookcourseController.getCourseTask); 
router.get("/task", CheckAuthMiddleware, PlookcourseController.getCourseTask); 
// enroll course && user course on dev
router.get("/mycourse", CheckAuthMiddleware, PlookcourseController.getMyCourse); 
router.get("/addmycourse", CheckAuthMiddleware, PlookcourseController.addMyCourse); 
// user course task on dev
router.get("/mytask", CheckAuthMiddleware, PlookcourseController.getMyCoursetask); 
router.get("/mycoursetask", CheckAuthMiddleware, PlookcourseController.getMyCoursetask); 
router.get("/learningstatustask", CheckAuthMiddleware, PlookcourseController.learningstatusMyTaskCourse); 
// favarite course
router.get("/mywislish", CheckAuthMiddleware, PlookcourseController.getMywislish); 
router.get("/addmywislish", CheckAuthMiddleware, PlookcourseController.addMywislish); 
router.get("/removemywislish", CheckAuthMiddleware, PlookcourseController.RemoveMywislish); 
// post
router.post("/subject", CheckAuthMiddleware, PlookcourseController.getSubject); 
router.post("/section", CheckAuthMiddleware, PlookcourseController.getSection); 
// enroll course && user course on dev
router.post("/mycourse", CheckAuthMiddleware, PlookcourseController.getMyCourse); 
// user course task on dev
router.post("/mytask", CheckAuthMiddleware, PlookcourseController.getMyCoursetask); 
router.post("/mycoursetask", CheckAuthMiddleware, PlookcourseController.getMyCoursetask); 
// favarite course
router.post("/mywislish", CheckAuthMiddleware, PlookcourseController.getMywislish); 
// getCourseTask
//getCourse on dev
router.post("/all", CheckAuthMiddleware, PlookcourseController.getCourse); 
router.post("/course", CheckAuthMiddleware, PlookcourseController.getCourse); 
router.post("/coursetask", CheckAuthMiddleware, PlookcourseController.getCourseTask); 
router.post("/task", CheckAuthMiddleware, PlookcourseController.getCourseTask); 
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
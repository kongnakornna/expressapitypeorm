import express, { Request, Response } from "express";
import { ok } from "../utils/helpers/response.helper";
import * as AuthController from "../controllers/auth.controller";
import * as ApikeyController from "../controllers/authapikey.controller";
import { CheckAuthMiddleware, authenticateMiddleware } from "../middlewares/check-auth.middleware";
// const swaggerUi = require('swagger-ui-express');
import * as plookblogController from "../controllers/plookblog.controller"; 
import * as plookblogcacheController from "../controllers/plookblogcache.controller"; 
const util = require('util')
const router = express.Router(); 
//modules User  
router.post("/", (req: Request, res: Response) => ok(res, { router:"blog"  , StatusDescription: "Modules plookblog ",message_th: "ระบบ blog",  StatusCode: "true"  , statusCode: 200,data:null}));
router.get("/", (req: Request, res: Response) => ok(res, { router: "blog", StatusDescription: "Modules plookblog ", message_th: "ระบบ blog", StatusCode: "true", statusCode: 200, data: null }));
//list
router.get("/home", plookblogController.home);
router.get("/list",plookblogController.list);
router.get("/category",plookblogController.category);
router.get("/zone",plookblogController.zone);
router.get("/datail", plookblogController.datail);

router.post("/home", plookblogController.home);
router.post("/list",plookblogController.list);
router.post("/category",plookblogController.category);
router.post("/zone",plookblogController.zone);
router.post("/datail", plookblogController.datail);

///plookblogcacheController
router.get("/homecache", plookblogcacheController.home);
router.get("/listcache",plookblogcacheController.list);
router.get("/categorycache",plookblogcacheController.category);
router.get("/zonecache",plookblogcacheController.zone);
router.get("/datailcache", plookblogcacheController.datails);

router.post("/homecache", plookblogcacheController.home);
router.post("/listcache",plookblogcacheController.list);
router.post("/categorycache",plookblogcacheController.category);
router.post("/zonecache",plookblogcacheController.zone);
router.post("/datailcache", plookblogcacheController.datails);


router.post("/homeadmin",CheckAuthMiddleware, plookblogController.home);
export default router;      
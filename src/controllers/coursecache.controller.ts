import { NextFunction, Request, Response } from "express";
import { EntityRepository, Repository,getConnection, getRepository, getCustomRepository, getManager, Any } from "typeorm"; 
/******entity*******/
import { CrsTypeTask } from "../entities/CrsTypeTask.entity";
import { CrsCategory } from "../entities/CrsCategory.entity"; 
import { CrsMyWislish } from "../entities/CrsMyWislish.entity"; 
/********repository***********/
import { CrsTypeTaskRepository } from "../repositories/CrstypeTask.repository";
import { CrsCategoryRepository } from "../repositories/CrsCategory.repository"; 
import { CrsMyWislishRepository } from "../repositories/CrsMyWislish.repository"; 
import { MulLevelRepository } from "../repositories/MulLevel.repository"; 
import { MulCategoriesRepository } from "../repositories/MulCategories.repository"; 
import { CrsSectionRepository } from "../repositories/CrsSection.repository"; 
import { CrsSectionChildRepository } from "../repositories/CrsSectionChild.repository"; 
import { CrsMyCourseRepository } from "../repositories/CrsMyCourse.repository"; 
import { CrsCourseRepository } from "../repositories/CrsCourse.repository"; 
import { CrsCourseTaskRepository } from "../repositories/CrsCourseTask.repository"; 
import { CrsMyCourseTaskRepository } from "../repositories/CrsMyCourseTask.repository"; 
/*********response api **********/
import { ok, serverError, created,Accepted,noContent,badRequest,Unauthorized,Forbidden,NotFound,serviceunavailable } from "../utils/helpers/response.helper";
// form class from file
var option_Cache: Number = 1;
// import { CacheDataOne } from '../utils/helpers/cacheredis.helper';
// const Cache1 = new CacheDataOne();
//import { CacheData } from '../utils/helpers/cacherediscluster.helper';
import { CacheData } from '../utils/helpers/cacheredisclusterV2.helper';
const Cache = new CacheData();
const { promisify } = require('util');
import { Validator } from '../utils/helpers/validator.helper';  
const Validators = new Validator()
export const GetTest = async (req: Request, res: Response, next: NextFunction) => {
    const headers: any = req.headers  
    const body: any = req.body  
    const query: any = req.query   
    const params: any = req.params  
    let date: any =  Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds
    const str: any = req.headers.authorization 
    const token: any = str.replace("Bearer ", "")  
    try { 
        const resultcache = await Cache.Test;  
        console.log('resultcache', resultcache);
        var rts = { 
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Test',
                            message_th: 'Test', 
                            status: 200,
                            time_ms: null
                        },
                        data: resultcache,  
                    };
                ok(res, rts);  
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error); 
    }
} 
export const getOTP = async (req: Request, res: Response, next: NextFunction) => {
    const headers: any = req.headers  
    const body: any = req.body  
    const query: any = req.query   
    const params: any = req.params     
    try { 
        const key: any = '';    
        const otp = await Cache.OTP(key);  
        var rss = {
            response: {
                result: "true",
                remark: "Access",
                StatusDescription: 'OTP',
                message_th: 'OTP',
                status: 200,
                time_ms: null
            },
            data: otp,
        };
        ok(res, rss); 
        return // exit loop ออกจากลูปการทำงาน  
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error); 
    }
} 
export const validateOTP = async (req: Request, res: Response, next: NextFunction) => {
    const headers: any = req.headers  
    const body: any = req.body  
    const query: any = req.query   
    const params: any = req.params   
    try { 
        var otp: any = query.otp
        if (otp == '') {
            var otp: any = body.otp
        }
        if(otp==null){ 
            var rss = {
                response: {
                    result: "true",
                    remark: "Unaccess",
                    StatusDescription: 'otp is null',
                    message_th: 'ไม่พบข้อมูล otp กรุณาตรวจสอบ',
                    status: 400,
                    time_ms: null
                },
                data: null,
            };
            badRequest(res, rss); 
            return // exit loop ออกจากลูปการทำงาน 
        }
        const input: any = {} 
        input.otpval=otp; 
        const resultOTP = await Cache.validateOTP(input);  
        console.log('input',input);
        console.log('resultOTP',resultOTP);  
        if (resultOTP == 1) {
            var meaasge_rt: any = 'ok'
        }else{
            var meaasge_rt: any = 'no'
        }
        var rts = { 
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'OTP',
                            message_th: 'OTP', 
                            status: 200,
                            time_ms: null
                        },
                        data: resultOTP,
                        meaasge_rt: meaasge_rt,   
                    };
                ok(res, rts);  
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error); 
    }
} 
export const statuscacheserver = async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try { 
            const keycache: any = 'TruePlookPanYa_Run_Test'; 
            const setData: any = {} 
            setData.keycache = keycache; 
            const resultcache = await Cache.Run(keycache); 
            const Scankey = await Cache.Scan(keycache); 
            const Exists = await Cache.Exists(setData);  
            const GetCacheData = await Cache.GetCacheData(setData);  
            var rts = { 
                            response: {
                                result: "true",
                                remark: "success",
                                StatusDescription: 'Status cache server',
                                message_th: 'Status cache server', 
                                status: 200,
                                time_ms: null
                            },
                            data: resultcache,  
                            Scankey: Scankey,  
                            Exists: Exists,
                            GetCacheData: GetCacheData,
                        };
                    ok(res, rts);  
        } catch (error: any) {
            res.json(serverError(error?.message));
            console.log(error); 
        }
} 
export const Type = async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try {
            const typeId : any = query.typeId;
            console.log(`typeId=`); 
            console.log(typeId);
            console.log(`query=`); 
            console.log(query);

            const limit = Number(query.limit) || 1000;
            const typeRepository = getCustomRepository(CrsTypeTaskRepository);
            let typeResult: any[] = [];
            if (typeId>=1) { 
                typeResult = await typeRepository.findCrsTypeTask(typeId, 1);
                console.log(`casecon 1 findCrsTypeTask `); 
                console.log(typeId); 
                console.log(limit);
                console.log(typeResult);
            } else {
                typeResult = await typeRepository.findAllCrsTypeTask(limit);
                console.log(`casecon 2 findAllCrsTypeTask `); 
                console.log(limit);
                console.log(typeResult);
            } 
            var payload = {
                    response: {
                        result: "true",
                        remark: "success",
                        StatusDescription: 'Success',
                        message_th: 'สำเร็จ', 
                        status: 200,
                        time_ms: null
                    },
                    data: typeResult,
                };
        ok(res, payload);
        //ok(res, typeResult);
        } catch (error: any) {
            res.json(serverError(error?.message));
            console.log(error); 
        }
}
// Cache
export const getType = async (req: Request, res: Response, next: NextFunction) => {
    const headers: any = req.headers  
    const body: any = req.body  
    const query: any = req.query   
    const params: any = req.params  
    let date: any =  Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds
    const str: any = req.headers.authorization 
    const token: any = str.replace("Bearer ", "")  
    try {  
        const getRandomint= Validators.getRandomint(6); 
        const Result: any[] = []; 
        const typeId: any = query.typeId;
        /*
        console.log(`typeId=`); 
        console.log(typeId);
        console.log(`query=`); 
        console.log(query);
        */
        const deletekey : any = query.deletekey;
        const limit = Number(query.limit) || 1000;            
        const typeRepository = getCustomRepository(CrsTypeTaskRepository);

        if (typeId == null) {
            var keycache: any = 'TruePlookPanYa-Type'; 
        } else {
            var keycache: any = 'TruePlookPanYa-Type'+typeId; 
        }
        const time: Number = 3600;   
        const resultcache = await Cache.GetCacheData(keycache); 
        if (resultcache != null) {
            //console.log("GetCacheData result cache ", resultcache)
            const redisstatus: any = 1;
            const Result = resultcache;
            console.log("CacheData ", Result)
            if (deletekey == 1) { 
                const del: any = await Cache.DeleteCacheData(keycache); 
                console.log("DeleteCacheData keycache ", keycache)
            } else {
                const del: any = null;
            } 
            var rts = {
                        Random: getRandomint,
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        },
                        data: Result,
                        cache_status:redisstatus,cache_type:'redis',
                    };
                ok(res, rts); 
        } else {
            //console.log("resultcache", null)
            var redisstatus: any = 0;
            const Result: any[] = []; 
            if (typeId >= 1) {
                const Result = await typeRepository.findCrsTypeTask(typeId, 1);
                console.log(`casecon 1 findCrsTypeTask `);
                console.log("typeId ", typeId)
                console.log("limit ", limit)
                console.log("Result ", Result) 
                const setData: any = {}
                setData.time = time;
                setData.keycache = keycache;
                setData.data = Result;
                console.log('Set Cache keycache', keycache);
                console.log('Set Cache Data',setData);
                await Cache.SetCacheData(setData); 
               // Cache.SetCacheData(setData); 
                var rt1 = {
                        Random: getRandomint,
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        },
                        data: Result,
                        cache_status:redisstatus,cache_type:'redis',
                    };
                ok(res, rt1); 
            } else {
                const Result = await typeRepository.findAllCrsTypeTask(limit);
                console.log(`casecon 2 findAllCrsTypeTask `); 
                console.log("limit ", limit)
                console.log("Result ", Result) 
                const setData: any = {}
                setData.time = time;
                setData.keycache = keycache;
                setData.data = Result;
                console.log('Set Cache keycache', keycache);
                console.log('Set Cache Data',setData);
                await Cache.SetCacheData(setData); 
               // Cache.SetCacheData(setData); 
                var rt = {
                        Random: getRandomint,
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        },
                        data: Result,
                        cache_status:redisstatus,cache_type:'redis',
                };                    
                 
                ok(res, rt); 
            }
        }
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error); 
    }
} 

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try {
            const CategoryId : any = query.CategoryId;
            console.log(`CategoryId=`); 
            console.log(CategoryId);
            console.log(`query=`); 
            console.log(query);
            const limit = Number(query.limit) || 1000;
            const CategoryRepository = getCustomRepository(CrsCategoryRepository);
        //  let rs: any[] = [];
            let typeResult: any[] = [];
            if (CategoryId>=1) { 
                typeResult = await CategoryRepository.findCrsCategory(CategoryId);
                console.log(`casecon 1 findCrsCategory `); 
                console.log(CategoryId); 
                console.log(limit);
                console.log(typeResult);
            } else {
                typeResult = await CategoryRepository.findAllCrsCategory(limit);
                console.log(`casecon 2 findAllCrsCategory `); 
                console.log(limit);
                console.log(typeResult);
            } 
            //const typeResult = await typeRepository.findAllCrsTypeTask(limit)
            /*
            const headers: any = req.headers  
            const body: any = req.body  
            const query: any = req.query   
            const params: any = req.params  
            */
            var payload = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        },
                        data: typeResult,
                    };
            ok(res, payload);
            /*
                var payload = {
                        header: {
                                StatusDescription: 'Success',
                                message_th: 'สำเร็จ',
                                status: 1,
                                headers: headers,
                                body: body,
                                query: query,
                                param: params,
                            },
                        data: typeResult,
                    };
            // ok(res, payload);
            ok(res, typeResult);
            */
            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}// Done //ADD favorite && Mywislish Course

export const addMywislish = async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers
        const body: any = req.body
        const query: any = req.query
        const params: any = req.params
        let date: any = Date.now()
        var nowseconds = new Date().getTime()
        const now = new Date();
        const day = new Date();
        const user_id: number = query.user_id;
        const course_id: number = query.course_id;
        const course_progress: number = query.course_progress;
        const str: any = req.headers.authorization
        const token: any = str.replace("Bearer ", "")
        try {
            console.log("body", body);
            console.log("query", query);
            console.log("day", day);
            const rs = getCustomRepository(CrsMyWislishRepository);
            if (user_id == null) {
                var resData = {
                    response: {
                        result: "true",
                        remark: "Warning!!",
                        StatusDescription: 'user_id is null',
                        message_th: 'ไม่พบข้อมูล user_id',
                        status: 404,
                        time_ms: null
                    },
                    data: null,
                    input: query,
                };
                NotFound(res, resData);
                return // exit loop ออกจากลูปการทำงาน 
            }
            if (course_id == null) {
                // let rssArray: any[] = [];
                let rssArray: any = {
                    response: {
                        result: "true",
                        remark: "Warning!!",
                        StatusDescription: 'course_id is null',
                        message_th: 'ไม่พบข้อมูล course_id',
                        status: 404,
                        time_ms: null
                    },
                    data: null,
                    input: query,
                };
                NotFound(res, rssArray);
                return // exit loop ออกจากลูปการทำงาน 
            }
            if (user_id != null && course_id != null) {
                /**********************************/
                const rsMyWislish = getCustomRepository(CrsMyWislishRepository);
                const filter1: any = {}  
                filter1.user_id = user_id;
                filter1.course_id = course_id; 
                // console.warn(`filter1 `,filter1);
                const rowsmycourse = await rsMyWislish.getWhereChk(filter1);
                const row: number = rowsmycourse.length; // count array 
                console.log("row", row);
                console.log("user_id", user_id);
                console.log("course_id", course_id);
                //return // exit loop ออกจากลูปการทำงาน 
                const filterInsert: any = {} 
                filterInsert.user_id=user_id;  
                filterInsert.course_id=course_id;   
                filterInsert.create_date=day;
                filterInsert.update_date=day;
                filterInsert.status = '1';   
                console.warn(`filterInsert `,filterInsert);
                const MyWislish_rs = getCustomRepository(CrsMyWislishRepository);
                const ResultInsertMyWislish = await MyWislish_rs.updateDatastatus(filterInsert);
                console.warn(`ResultInsertMyWislish `,ResultInsertMyWislish);
                if (row >= 1) { 
                        var rssData = {
                            response: {
                                result: "true",
                                remark: "duplicate information & active data",
                                StatusDescription: 'information that already exists. & active data',
                                message_th: 'ข้อมูลช้ำกับข้อมูลที่มีอยู่แล้ว & active data',
                                status: 200,
                                time_ms: null
                            },
                            data: ResultInsertMyWislish,
                            input: query,
                        };
                        ok(res, rssData); 
                    return // exit loop ออกจากลูปการทำงาน 
                } else {
                    /*****************/
                    const rsa = getCustomRepository(CrsCourseRepository);
                    //let filter1Chka = [];
                    const filter1Chka: any = {} 
                    filter1Chka.course_id = course_id; 
                    console.warn(`filter1Chka `,filter1Chka);
                    const rowsTaskcourse = await rsa.getWhereChk(filter1Chka);
                    const rowCourse: number = rowsTaskcourse.length; // count array 
                    if (rowCourse == 0) {  
                        let rssArray: any= {
                                    response: {
                                        result: "true",
                                        remark: "No information Course found in the system.",
                                        StatusDescription: 'No information Course  found in the system..',
                                        message_th: 'ไม่พบข้อมูล Course ในระบบ',
                                        status: 404,
                                        time_ms: null,
                                    },
                                    data: rowsTaskcourse,
                                    input: query,
                                };
                                NotFound(res, rssArray); 
                        return // exit loop ออกจากลูปการทำงาน  
                    }else{
                        /*
                        var rssArray = {
                                    response: {
                                        result: "true",
                                        remark: "Found information Course in the system..",
                                        StatusDescription: 'Found information Course in the system..',
                                        message_th: 'พบข้อมูล Course ในระบบ',
                                        status: 200,
                                        time_ms: null
                                    },
                                    data: null,
                                    input: query,
                                };
                        */
                        // ok(res, rssArray); 
                        // return // exit loop ออกจากลูปการทำงาน  
                        const filterInsert: any = {} 
                        filterInsert.user_id=user_id;  
                        filterInsert.course_id=course_id;   
                        filterInsert.create_date=day;
                        filterInsert.update_date=day;
                        filterInsert.status = '1';    
                        console.warn(`filterInsert `,filterInsert);
                        const MyWislish_rs = getCustomRepository(CrsMyWislishRepository);
                        const ResultInsertMyWislish = await MyWislish_rs.insertData(filterInsert);
                        console.warn(`ResultInsertMyWislish `,ResultInsertMyWislish);
                        var datarts = {
                                    response: {
                                        result: "true",
                                        remark: "insertData MyWislish",
                                        StatusDescription: 'insertData MyWislish',
                                        message_th: 'เพิ่มข้อมูล MyWislish', 
                                        status: 200,
                                        time_ms: null
                                    },  
                                data: ResultInsertMyWislish,
                                filter: filterInsert,
                                input: query,
                            };
                        ok(res, datarts); 
                        return // exit loop ออกจากลูปการทำงาน
                    }
                    /****************/
                }
                /*****************/
            }
        } catch (error: any) {
            res.json(serverError(error?.message));
            console.log(error);

        }
}// RemoveMywislish //UPDATE favorite && Mywislish Course

export const RemoveMywislish = async (req: Request, res: Response, next: NextFunction) => {
            const headers: any = req.headers
            const body: any = req.body
            const query: any = req.query
            const params: any = req.params
            let date: any = Date.now()
            var nowseconds = new Date().getTime()
            const now = new Date();
            const day = new Date();
            const user_id: number = query.user_id;
            const course_id: number = query.course_id;
            const course_progress: number = query.course_progress;
            const str: any = req.headers.authorization
            const token: any = str.replace("Bearer ", "")
            try {
                console.log("body", body);
                console.log("query", query);
                console.log("day", day);
                const rs = getCustomRepository(CrsMyWislishRepository);
                if (user_id == null) {
                    var rss = {
                        response: {
                            result: "true",
                            remark: "Warning!!",
                            StatusDescription: 'user_id is null',
                            message_th: 'ไม่พบข้อมูล user_id',
                            status: 404,
                            time_ms: null
                        },
                        data: null,
                        input: query,
                    };
                    NotFound(res, rss);
                    return // exit loop ออกจากลูปการทำงาน 
                }
                if (course_id == null) {
                    var rss = {
                        response: {
                            result: "true",
                            remark: "Warning!!",
                            StatusDescription: 'course_id is null',
                            message_th: 'ไม่พบข้อมูล course_id',
                            status: 404,
                            time_ms: null
                        },
                        data: null,
                        input: query,
                    };
                    NotFound(res, rss);
                    return // exit loop ออกจากลูปการทำงาน 
                }
                if (user_id != null && course_id != null) {
                    /**********************************/
                    const rsMyWislish = getCustomRepository(CrsMyWislishRepository);
                    const filter1: any = {}  
                    filter1.user_id = user_id;
                    filter1.course_id = course_id; 
                    // console.warn(`filter1 `,filter1);
                    const rowsmycourse = await rsMyWislish.getWhereChk(filter1);
                    const row: number = rowsmycourse.length; // count array 
                    console.log("row", row);
                    console.log("user_id", user_id);
                    console.log("course_id", course_id);
                    //return // exit loop ออกจากลูปการทำงาน 
                    if (row >= 1) { 
                            const filterInsert: any = {} 
                            filterInsert.user_id=user_id;  
                            filterInsert.course_id=course_id;   
                            filterInsert.create_date=day;
                            filterInsert.update_date=day;
                            filterInsert.status = '0';  
                            console.warn(`filterInsert `,filterInsert);
                            const MyWislish_rs = getCustomRepository(CrsMyWislishRepository);
                            const ResultInsertMyWislish = await MyWislish_rs.updateDatastatus(filterInsert);
                            console.warn(`ResultInsertMyWislish `,ResultInsertMyWislish);
                            var rssData = {
                                response: {
                                    result: "true",
                                    remark: "Data has been deleted.",
                                    StatusDescription: 'Data has been deleted already exists.',
                                    message_th: 'ทำการลบข้อมูลแล้ว.',
                                    status: 200,
                                    time_ms: null
                                },
                                data: ResultInsertMyWislish,
                                input: query, 
                            };
                            ok(res, rssData);  
                        return // exit loop ออกจากลูปการทำงาน 
                    } else { 
                            var rss = {
                                response: {
                                    result: "true",
                                    remark: "Not information found in the system.",
                                    StatusDescription: 'Not information found in the system.',
                                    message_th: 'ไม่พบข้อมูล ในระบบ',
                                    status: 200,
                                    time_ms: null
                                },
                                data: null,
                                input: query,
                            };
                            ok(res, rss);   
                        return // exit loop ออกจากลูปการทำงาน 
                    }
                    /*****************/
                }
            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}

export const getMywislish = async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try { 
            let Result: any[] = []; 
            const user_id: number = query.user_id;
            const subject_id: number = query.subject_id;
            const subject_parent_id: number = query.subject_parent_id;
            const course_id: number = query.course_id;
            const category_id: number = query.category_id;
            const level_id: number = query.level_id;
            const start: string = query.start;
            const end: string = query.end; 
            const order: string = query.order;
            const debug: number = query.debug;
            if(user_id==null){ 
                var rss = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'user_id is null',
                            message_th: 'ไม่พบข้อมูล user_id กรุณาตรวจสอบ',
                            status: 400,
                            time_ms: null
                        },
                        data: null,
                    };
                    badRequest(res, rss); 
                return // exit loop ออกจากลูปการทำงาน 
            }
            const keyword = query?.keyword;
            let newKeyword: string | undefined = undefined
            if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
            }
            const page: number = Number(req.query?.page) || 1;
            const size: number = Number(req.query?.size) || 20;
            const limit = Number(query.limit) || 1000;
            console.log(`user_id=`); 
            console.log(user_id);
            console.log(`query=`); 
            console.log(query);
            const rs = getCustomRepository(CrsMyWislishRepository); 
            if(debug==1){ 
                var dar:any = {
                        input_query:query, 
                        mesage: 'debug code', 
                        Rs:Result,                     
                        Request: req,
                        Response: res,
                        NextFunction: next,
                        headers: headers,
                        params: params,
                        body: body,
                        data:null,
                    };
                    ok(res, dar); 
                    return // exit loop 
            }   
            const filter1: any = {} 
                filter1.user_id=user_id;
                filter1.course_id=course_id;
                filter1.keyword=newKeyword;
                filter1.category_id=category_id;
                filter1.subject_id=subject_id;
                filter1.subject_parent_id=subject_parent_id;
                filter1.class_level=level_id;
                filter1.start=start;
                filter1.end=end; 
                filter1.order=order;
                filter1.pages=null;
                filter1.sizepsge=null;
                filter1.isCount=1;
            // console.warn(`filter1 `,filter1);
            const rows = await rs.getWhereRs(filter1);
            const isCount1: number =1;
            // const rows = await rs.getWhereRs(course_id, newKeyword, category_id, subject_id, subject_parent_id, level_id, start, end, ratings, order,isCount1);
            const getCount = rows
            console.log("getCount", getCount) 
            const row: number = rows.length; // count array 
            const totalpages: number = Math.round((row / size)) || 1;
            console.log(`total_pages=`); 
            console.log(totalpages);
            const isCount: number =0;
            const filter: any = {} 
                filter.user_id=user_id;
                filter.course_id=course_id;
                filter.keyword=newKeyword;
                filter.category_id=category_id;
                filter.subject_id=subject_id;
                filter.subject_parent_id=subject_parent_id;
                filter.class_level=level_id;
                filter.start=start;
                filter.end=end; 
                filter.order=order;
                filter.pages=page;
                filter.sizepsge=size;
                filter.isCount=0;
            // console.warn(`filter `,filter);
            const ResultArray = await rs.getWhereRs(filter);
            // console.warn(`ResultArray `,ResultArray);
            /*****************************************/
            let tempData = [];
            for (const [key, value] of Object.entries(ResultArray)) {
                // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                const wislish_id:number = value.wislish_id;
                const course_id: number = value.course_id;
                const category_id: number = value.category_id;
                const user_id:number = value.user_id;
                const status:number= value.status || 0;
                const coursename:string= value.course_name; 
                const category:string= value.category;
                const level_name:string= value.level_name;
                const subject_name:string= value.subject_name;
                const parent_subject_name:string= value.parent_subject_name;
                const level_id:string= value.level_id; 
                const subject_id:number= value.subject_id || 0;
                const subject_parent_id:number= value.subject_parent_id || 0;            
                const display_name:string= value.display_name;
                const firstname:string= value.firstname; 
                const lastname:string= value.lastname; 
                const course_thumbnail: string = value.course_thumbnail;
                const category_thumbnail: string = value.category_thumbnail; 
                const create_date: string = value.create_date; 
                const update_date: string = value.update_date; 
                const createdate_en: string = toEnDate(create_date); 
                const updatedate_en: string = toEnDate(update_date); 
                const createdateth : string = toThaiDate(create_date);   
                const updatedateth : string = toThaiDate(update_date); 
                // functionApp.toThaiDate(); 
                const data = { 
                            wislish_id: wislish_id,
                            course_id: course_id,
                            course_name: coursename, 
                            user_id: user_id, 
                            status: status, 
                            category_id: category_id, 
                            subject_id: subject_id, 
                            subject_parent_id: subject_parent_id, 
                            category: category, 
                            subject_name: subject_name, 
                            parent_subject_name: parent_subject_name, 
                            level_id: level_id,  
                            display_name: display_name, 
                            firstname: firstname, 
                            lastname: lastname,  
                            create_date_th: createdateth, 
                            update_date_th: updatedateth, 
                            create_date_en: createdate_en, 
                            update_date_en: updatedate_en, 
                            create_date: create_date, 
                            update_date: update_date, 
                            level_name: level_name,  
                            course_thumbnail: course_thumbnail, 
                            category_thumbnail: category_thumbnail, 
                        } 
                tempData.push(data); 
            }
            const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
            // console.log(resultData) 
            console.warn(resultData)
            // console.error(resultData)
            // console.table(resultData);
            /*****************************************/ 
                var payload = {
                            response: {
                                result: "true",
                                remark: "success",
                                StatusDescription: 'Success',
                                message_th: 'สำเร็จ', 
                                status: 200,
                                time_ms: null
                            },
                            input_query:query,
                            total_page: totalpages,
                            total: row, 
                            page: page,
                            perpage: size,
                            data: resultData,
                        };
                ok(res, payload);
            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}// Done
// cache        
export const getLevel= async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
            try {
                const getRandomint= Validators.getRandomint(6); 
                const Result: any[] = [];  
                const deletekey : any = query.deletekey;
                const id : any = query.id;
                console.log(`id=`); 
                console.log(id);
                console.log(`query=`); 
                console.log(query); 
                const Level= getCustomRepository(MulLevelRepository);
                let dataResult: any[] = [];
                if (id == null) {
                    var keycache: any = 'Level'; 
                } else {
                    var keycache: any = 'Level_'+id; 
                }
                const time: Number = 3600;   
                const resultcache = await Cache.GetCacheData(keycache);   //  Get Cache Data 
                if (resultcache != null) {
                    //console.log("GetCacheData result cache ", resultcache)
                    const redisstatus: any = 1;
                    const dataResult = resultcache;
                    console.log("CacheData ", Result)
                    if (deletekey == 1) { 
                        const del: any = await Cache.DeleteCacheData(keycache); //  Delete Cache Data
                        console.log("DeleteCacheData keycache ", keycache)
                    } else {
                        const del: any = null;
                    } 
                    var rts = {
                                Random: getRandomint,
                                response: {
                                    result: "true",
                                    remark: "success",
                                    StatusDescription: 'Success',
                                    message_th: 'สำเร็จ', 
                                    status: 200,
                                    time_ms: null
                                },
                                data: dataResult,
                                cache_status:redisstatus,cache_type:'redis',
                            };
                    ok(res, rts); 
                    return // exit loop ออกจากลูปการทำงาน 
                } else {
                    //console.log("resultcache", null)
                        var redisstatus: any = 0;
                        
                        if (id>=1) { 
                            dataResult = await Level.findLevelparentid(id); 
                            console.log(dataResult);
                        } else {
                            dataResult = await Level.findAllMulLevel(); 
                            console.log(dataResult);
                        }  
                        console.log("Result ", Result) 
                        const setData: any = {}
                        setData.time = time;
                        setData.keycache = keycache;
                        setData.data = dataResult;
                        console.log('Set Cache keycache', keycache);
                        console.log('Set Cache Data',setData);
                        await Cache.SetCacheData(setData);   //  Set Cache Data
                    // Cache.SetCacheData(setData); 
                        var rt = { 
                                response: {
                                    result: "true",
                                    remark: "success",
                                    StatusDescription: 'Success',
                                    message_th: 'สำเร็จ', 
                                    status: 200,
                                    time_ms: null
                                },
                                data: dataResult,
                                cache_status:redisstatus,cache_type:'redis',
                        };                    
                        
                        ok(res, rt); 
                        return // exit loop ออกจากลูปการทำงาน 
                }
            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}// Done 

export const getSubject= async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
            try {
                const id : any = query.id;
                console.log(`id=`); 
                console.log(id);
                console.log(`query=`); 
                console.log(query); 
                const Subject= getCustomRepository(MulCategoriesRepository);
            //  let rs: any[] = [];
                let typeResult: any[] = [];
                if (id>=1) { 
                    typeResult = await Subject.findarentiddata(id); 
                    console.log(typeResult);
                } else {
                    typeResult = await Subject.findAlldata(); 
                    console.log(typeResult);
                }  
                var payload = {
                            response: {
                                result: "true",
                                remark: "success",
                                StatusDescription: 'Success',
                                message_th: 'สำเร็จ', 
                                status: 200,
                                time_ms: null
                            }, 
                            data: typeResult,
                        };
                ok(res, payload);
            //ok(res, typeResult);
            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}// Done list Section course 
       
export const getSection = async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
            try {
                const id : any = query.id;
                console.log(`id=`); 
                console.log(id);
                console.log(`query=`); 
                console.log(query); 
                const rs= getCustomRepository(CrsSectionRepository);
            //  let rs: any[] = [];
                let typeResult: any[] = [];
                if (id>=1) { 
                    typeResult = await rs.findid(id); 
                    console.log(typeResult);
                } else {
                    typeResult = await rs.findAll(); 
                    console.log(typeResult);
                }  
                let Re: any[] = [];
                const countdata: any = typeResult.length  
                console.log(` countdata: `,countdata);
                const data: any = {} 
                for (let [key, value] of Object.entries(typeResult)) {
                    const id: any = value.id; 
                    const section_name: any = value.section_name; 
                    const description: any = value.description; 
                    const status: any = value.status; 
                    data.id = id;
                    data.section_name = section_name;
                    data.description = description;
                    data.status = status;
                    data.note = 'ok';  
                    console.log(`${key}: ${value}`);
                }
                console.log(` data: `,data);
                var payload = {
                            response: {
                                result: "true",
                                remark: "success",
                                StatusDescription: 'Success',
                                message_th: 'สำเร็จ', 
                                status: 200,
                                time_ms: null
                            }, 
                            data: typeResult,
                        };
                ok(res, payload);
                //ok(res, typeResult);
            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}// Done list relate course 
        
export const getSectionChild = async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try {
            const child_id: number = query.child_id;
            const section_id: number = query.section_id;
            const category_id: number = query.category_id;
            const user_id: number = query.user_id;
            const subject_id: number = query.subject_id;
            const subject_parent_id: number = query.subject_parent_id;
            const course_id: number = query.course_id;
            const level_id: number = query.level_id;
            const start: string = query.start;
            const end: string = query.end; 
            const order: string = query.order;
            const debug: number = query.debug;
            if(section_id==null){ 
                        var rss = {
                            response: {
                                result: "true",
                                remark: "success",
                                StatusDescription: 'section_id is null',
                                message_th: 'ไม่พบข้อมูล section_id กรุณาตรวจสอบ', 
                                status: 400,
                                time_ms: null
                            },
                            data: null,
                        };
                        badRequest(res, rss);  
                    return // exit loop ออกจากลูปการทำงาน 
                }
            const keyword = query?.keyword;
            let newKeyword: string | undefined = undefined
            if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
            }
            const page: number = Number(req.query?.page) || 1;
            const size: number = Number(req.query?.size) || 20;
            const limit = Number(query.limit) || 1000;
            console.log(`user_id=`); 
            console.log(user_id);
            console.log(`query=`); 
            console.log(query);
            const rs = getCustomRepository(CrsSectionChildRepository);
            let Result: any[] = [];  
            if(debug==1){ 
                var dar:any = {
                        input_query:query, 
                        mesage: 'debug code', 
                        Rs:Result,                     
                        Request: req,
                        Response: res,
                        NextFunction: next,
                        headers: headers,
                        params: params,
                        body: body,
                        data:null,
                    };
                    ok(res, dar); 
                    return // exit loop 
            }   
            const filter1: any = {} 
                filter1.section_id=section_id;
                filter1.child_id=child_id;
                filter1.course_id=course_id;
                filter1.keyword=newKeyword;
                filter1.category_id=category_id;
                filter1.subject_id=subject_id;
                filter1.subject_parent_id=subject_parent_id;
                filter1.class_level=level_id;
                filter1.start=start;
                filter1.end=end; 
                filter1.order=order;
                filter1.pages=null;
                filter1.sizepsge=null;
                filter1.isCount=1;
            // console.warn(`filter1 `,filter1);
            const rows = await rs.getWhereRs(filter1);
            const isCount1: number =1;        
            const getCount = rows
            console.log("getCount", getCount) 
            const row: number = rows.length; // count array 
            if (row == 0 || row == null) {
                    var rss = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Data is null',
                            message_th: 'ไม่พบข้อมูล', 
                            status: 404,
                            time_ms: null
                        },
                        data: null,
                    };
                    NotFound(res, rss);   
                return // exit loop ออกจากลูปการทำงาน 
            }
            const totalpages: number = Math.round((row / size)) || 1;
            console.log(`total_pages=`); 
            console.log(totalpages);
            const isCount: number =0;
            const filter: any = {} 
                filter.section_id=section_id;
                filter.child_id=child_id;
                filter.course_id=course_id;
                filter.keyword=newKeyword;
                filter.category_id=category_id;
                filter.subject_id=subject_id;
                filter.subject_parent_id=subject_parent_id;
                filter.class_level=level_id;
                filter.start=start;
                filter.end=end; 
                filter.order=order;
                filter.pages=page;
                filter.sizepsge=size;
                filter.isCount=0;
            console.warn(`filter `,filter);
            const ResultArray = await rs.getWhereRs(filter);
            console.log(`ResultArray `,ResultArray);
            /*****************************************/
            let tempData = [];
            for (const [key, value] of Object.entries(ResultArray)) {
                // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                const child_id:number = value.child_id;
                const section_id: number = value.section_id;
                const course_id: number = value.course_id;  
                const coursename:string= value.course_name;  
                const level_name:string= value.level_name;             
                const title:string= value.title;
                const subject_id: string = value.subject_id;  
                const subject_parent_id: string = value.subject_parent_id;  
                const section_name: string = value.section_name;  
                const subject_name: string = value.subject_name;  
                const parent_subject_name:string= value.parent_subject_name;  
                const thumbnail: string = value.thumbnail;
                const course_thumbnail: string = value.course_thumbnail;
                const category_thumbnail: string = value.category_thumbnail; 
                const create_date: string = value.create_date; 
                const update_date: string = value.update_date; 
                const createdate_en: string = toEnDate(create_date); 
                const updatedate_en: string = toEnDate(update_date); 
                const createdateth : string = toThaiDate(create_date);   
                const updatedateth : string = toThaiDate(update_date);  
                // functionApp.toThaiDate();  
                const data = { 
                            child_id: child_id,
                            section_id: section_id,
                            course_id: course_id,
                            course_name: coursename,   
                            title: title, 
                            subject_id: subject_id, 
                            subject_parent_id: subject_parent_id, 
                            section_name: section_name,  
                            level_name: level_name,  
                            subject_name:subject_name,
                            parent_subject_name:parent_subject_name,
                            create_date_th: createdateth, 
                            update_date_th: updatedateth, 
                            create_date_en: createdate_en, 
                            update_date_en: updatedate_en, 
                            create_date: create_date, 
                            update_date: update_date,  
                            thumbnail: thumbnail, 
                            course_thumbnail: course_thumbnail, 
                            category_thumbnail: category_thumbnail, 
                        } 
                tempData.push(data); 
            }
            const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
            console.log(resultData) 
            // console.warn(resultData)
            // console.error(resultData)
            // console.table(resultData);
            /*****************************************/
            var payload = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        }, 
                        input_query:query,
                        total_page: totalpages,
                        total: row, 
                        page: page,
                        perpage: size,
                        data: resultData,
                    };
            ok(res, payload);
            /*
            var la:any = {
                    input_query:query,
                    total_page: totalpages,
                    total: row, 
                    page: page,
                    perpage: size,
                    StatusDescription: "Successful",
                    message_th: "แสดงมูลสำเร็จ",
                    data: resultData,
                }; 
            ok(res, la); 
            */
            //res.StatusCode(401).json({StatusDescription: "You are not authenticated!"});
                return // exit loop ออกจากลูปการทำงาน casecon=>8

            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}// On Test list mycouse  from course

export const getMyCourse= async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try { 
            let Result: any[] = []; 
            const user_id: number = query.user_id;
            const subject_id: number = query.subject_id;
            const subject_parent_id: number = query.subject_parent_id;
            const course_id: number = query.course_id;
            const category_id: number = query.category_id;
            const level_id: number = query.level_id;
            const start: string = query.start;
            const end: string = query.end; 
            const order: string = query.order;
            const debug: number = query.debug;
            if (user_id == null) { 
                    var rss = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'user_id is null',
                            message_th: 'ไม่พบข้อมูล user_id กรุณาตรวจสอบ', 
                            status: 400,
                            time_ms: null
                        },
                        data: null,
                    };
                    badRequest(res, rss);   
                return // exit loop ออกจากลูปการทำงาน 
            }
            const keyword = query?.keyword;
            let newKeyword: string | undefined = undefined
            if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
            }
            const page: number = Number(req.query?.page) || 1;
            const size: number = Number(req.query?.size) || 20;
            const limit = Number(query.limit) || 1000;
            console.log(`user_id=`); 
            console.log(user_id);
            console.log(`query=`); 
            console.log(query);
            const rs = getCustomRepository(CrsMyCourseRepository); 
            if(debug==1){ 
                var dar:any = {
                        input_query:query, 
                        mesage: 'debug code', 
                        Rs:Result,                     
                        Request: req,
                        Response: res,
                        NextFunction: next,
                        headers: headers,
                        params: params,
                        body: body,
                        data:null,
                    };
                    ok(res, dar); 
                    return // exit loop 
            }   
            const filter1: any = {} 
                filter1.user_id=user_id;
                filter1.course_id=course_id;
                filter1.keyword=newKeyword;
                filter1.category_id=category_id;
                filter1.subject_id=subject_id;
                filter1.subject_parent_id=subject_parent_id;
                filter1.class_level=level_id;
                filter1.start=start;
                filter1.end=end; 
                filter1.order=order;
                filter1.pages=null;
                filter1.sizepsge=null;
                filter1.isCount=1;
            // console.warn(`filter1 `,filter1);
            const rows = await rs.getWhereRs(filter1);
            const isCount1: number =1;
            // const rows = await rs.getWhereRs(course_id, newKeyword, category_id, subject_id, subject_parent_id, level_id, start, end, ratings, order,isCount1);
            const getCount = rows
            console.log("getCount", getCount) 
            const row: number = rows.length; // count array 
            if(row == 0 || row == null){
                var rss = {
                    response: {
                        result: "true",
                        remark: "unsuccess",
                        StatusDescription: 'Data is null',
                        message_th: 'ไม่พบข้อมูล', 
                        status: 404,
                        time_ms: null
                    },
                    data: null,
                };
                NotFound(res, rss);    
                return // exit loop ออกจากลูปการทำงาน 
            }
            const totalpages: number = Math.round((row / size)) || 1;
            console.log(`total_pages=`); 
            console.log(totalpages);
            const isCount: number =0;
            const filter: any = {} 
                filter.user_id=user_id;
                filter.course_id=course_id;
                filter.keyword=newKeyword;
                filter.category_id=category_id;
                filter.subject_id=subject_id;
                filter.subject_parent_id=subject_parent_id;
                filter.class_level=level_id;
                filter.start=start;
                filter.end=end; 
                filter.order=order;
                filter.pages=page;
                filter.sizepsge=size;
                filter.isCount=0;
            // console.warn(`filter `,filter);
            const ResultArray = await rs.getWhereRs(filter);
            // console.warn(`ResultArray `,ResultArray);
            /*****************************************/
            let tempData = [];
            for (const [key, value] of Object.entries(ResultArray)) {
                // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                const my_course_id:number = value.my_course_id;
                const course_id: number = value.course_id;
                const category_id: number = value.category_id;
                const user_id:number = value.user_id;
                const progress:number= value.progress || 0;
                const coursename:string= value.course_name; 
                const category:string= value.category;
                const level_name:string= value.level_name;
                const subject_name:string= value.subject_name;
                const parent_subject_name:string= value.parent_subject_name;
                const level_id:string= value.level_id; 
                const subject_id:number= value.subject_id || 0;
                const subject_parent_id:number= value.subject_parent_id || 0;            
                const display_name:string= value.display_name;
                const firstname:string= value.firstname; 
                const lastname:string= value.lastname; 
                const course_thumbnail: string = value.course_thumbnail;
                const category_thumbnail: string = value.category_thumbnail; 
                const create_date: string = value.create_date; 
                const update_date: string = value.update_date; 
                const createdate_en: string = toEnDate(create_date); 
                const updatedate_en: string = toEnDate(update_date); 
                const createdateth : string = toThaiDate(create_date);   
                const updatedateth: string = toThaiDate(update_date); 
            /*****************************************/
            const Task = getCustomRepository(CrsCourseTaskRepository); 
            const filterTask: any = {} 
            filterTask.course_id=course_id; 
            filterTask.isCount=1;
            console.warn(`filterTask `,filterTask);
            /****************/
            const Taskrows = await Task.getWhereRs(filterTask);
            const Tasktotal: number = Taskrows.length; // count array 
            let Tasktotaldata  =Math.round(Tasktotal);
            const filterTaskDone: any = {} 
            filterTaskDone.user_id=user_id;
            filterTaskDone.course_id=course_id; 
            filterTaskDone.isCount = 1;
            filterTaskDone.task_learning_status = 1;
            /****************/
            const myTask = getCustomRepository(CrsMyCourseTaskRepository); 
            const myTasktotalDonerows = await myTask.getWhereRs(filterTaskDone); 
            
            //return
            let TasktotalDone: number = myTasktotalDonerows.length; // count array 
            let TaskpecentDone: number =(TasktotalDone*100/Tasktotaldata);
            let Taskpecent = Math.round(TaskpecentDone);
            console.warn(`Tasktotaldata `,Tasktotaldata);
            console.warn(`TaskpecentDone `,TaskpecentDone);
            console.warn(`Taskpecent `,Taskpecent); 
            /*****************************************/       
                // functionApp.toThaiDate(); 
                const data = { 
                            course_id: course_id,
                            course_name: coursename, 
                            user_id: user_id, 
                            progress: progress, 
                            category_id: category_id, 
                            subject_id: subject_id, 
                            subject_parent_id: subject_parent_id, 
                            category: category, 
                            subject_name: subject_name, 
                            parent_subject_name: parent_subject_name, 
                            level_id: level_id,  
                            display_name: display_name, 
                            firstname: firstname, 
                            lastname: lastname,  
                            create_date_th: createdateth, 
                            update_date_th: updatedateth, 
                            create_date_en: createdate_en, 
                            update_date_en: updatedate_en, 
                            create_date: create_date, 
                            update_date: update_date, 
                            level_name: level_name,  
                            course_thumbnail: course_thumbnail, 
                            category_thumbnail: category_thumbnail, 
                            Tasktotal: Tasktotal, 
                            TasktotalDone: TasktotalDone, 
                            Taskpecent: Taskpecent, 
                        } 
                tempData.push(data); 
            }
            const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
            // console.log(resultData) 
            console.warn(resultData)
            // console.error(resultData)
            // console.table(resultData);
            /*****************************************/
            var payload = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        }, 
                        input_query:query,
                        total_page: totalpages,
                        total: row, 
                        page: page,
                        perpage: size,
                        data: resultData,
                    };
            ok(res, payload);
            /*
            var la:any = {
                    input_query:query,
                    total_page: totalpages,
                    total: row, 
                    page: page,
                    perpage: size,
                    StatusDescription: "Successful",
                    message_th: "แสดงมูลสำเร็จ",
                    data: resultData,
                }; 
                ok(res, la); 
                */
                return // exit loop ออกจากลูปการทำงาน casecon=>8

            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}// On dev list task from course enroll // enroll +insert && update && delate MyCourse user

export const addMyCourse= async (req: Request, res: Response, next: NextFunction) => {
            const headers: any = req.headers  
            const body: any = req.body  
            const query: any = req.query   
            const params: any = req.params  
            let date: any =  Date.now()
            var nowseconds = new Date().getTime()
            const now = new Date();
            const day =new Date();
            const user_id: number = query.user_id;
            const course_id: number = query.course_id; 
            const course_progress: number = query.course_progress; 
            const str: any = req.headers.authorization 
            const token: any = str.replace("Bearer ", "")  
            try { 
                console.log("body",body); 
                console.log("query",query);
                console.log("day", day); 
                const rs = getCustomRepository(CrsMyCourseRepository); 
            // return 
                if(user_id==null){
                    var rss = {
                        response: {
                            result: "true",
                            remark: "Warning!!",
                            StatusDescription: 'user_id is null',
                            message_th: 'ไม่พบข้อมูล user_id',
                            status: 404,
                            time_ms: null
                        },
                        data: null,
                    };
                    NotFound(res, rss);
                    return // exit loop ออกจากลูปการทำงาน 
                }
                if (course_id == null){
                    var rss = {
                        response: {
                            result: "true",
                            remark: "Warning!!",
                            StatusDescription: 'course_id is null',
                            message_th: 'ไม่พบข้อมูล course_id',
                            status: 404,
                            time_ms: null
                        },
                        data: null,
                    };
                    NotFound(res, rss);
                    return // exit loop ออกจากลูปการทำงาน 
                }    
                if (user_id != null && course_id != null) {
                    /**********************************/
                    const rsTask = getCustomRepository(CrsCourseTaskRepository);
                    const filter1: any = {}
                    filter1.user_id = user_id;
                    filter1.course_id = course_id;
                    filter1.isCount = 1;
                    // console.warn(`filter1 `,filter1);
                    const rowsmycourse = await rs.getWhereChk(filter1);
                    const row: number = rowsmycourse.length; // count array 
                    console.log("row", row); 
                    console.log("user_id", user_id); 
                    console.log("course_id", course_id); 
                    //return // exit loop ออกจากลูปการทำงาน 
                    if (row >= 1) {
                        /*****************/
                        const filterTask: any = {}   
                        filterTask.course_id=course_id;
                        filterTask.content_id=null;
                        filterTask.keyword=null;
                        filterTask.task_id=null; 
                        filterTask.start=null;
                        filterTask.end=null; 
                        filterTask.order=null;
                        filterTask.pages=null;
                        filterTask.sizepsge=null;
                        filterTask.isCount=0;
                    console.warn(`filter `,filterTask);
                    const ResultArrayTask = await rsTask.getWhereRs(filterTask);
                    console.warn(`ResultArray `,ResultArrayTask);
                    // ok(res, ResultArrayTask); 
                    // return  
                    let tempData = [];
                    for (const [key, value] of Object.entries(ResultArrayTask)) {
                        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                        const task_id: number = value.task_id;
                        const content_id: number = value.content_id;
                        const task_title: number = value.task_title;
                        const task_detail: number = value.task_detail;
                        const create_by_display_name: string = value.create_by_display_name;
                        const update_by_display_name: string = value.update_by_display_name;
                        const create_by_fullname: string = value.create_by_fullname;
                        const update_by_fullname: string = value.update_by_fullname;
                        const link_url: number = value.link_url;
                        const sort: number = value.sort;
                        const create_date: number = value.create_date;
                        const update_date: number = value.update_date;
                        const create_by: number = value.create_by;
                        const update_by: number = value.update_by;
                        const type_name_th: string = value.type_name_th; 
                        const type_name: string = value.type_name; 
                        const createdate_en: string = toEnDate(create_date); 
                        const updatedate_en: string = toEnDate(update_date); 
                        const createdateth : string = toThaiDate(create_date);   
                        const updatedateth: string = toThaiDate(update_date); 
                        // getWhereChk
                        const filter1Chk: any = {}
                        filter1Chk.user_id = user_id; 
                        filter1Chk.course_id = course_id; 
                        console.warn(`filter1Chk `,filter1Chk);
                        const MyrsTask = getCustomRepository(CrsMyCourseTaskRepository);
                        const rowsmycourse = await MyrsTask.getWhereChk(filter1Chk);
                        const row: number = rowsmycourse.length; // count array 
                        console.log("row", row); 
                        console.log("user_id", user_id); 
                        console.log("course_id", course_id); 
                        //return // exit loop ออกจากลูปการทำงาน 
                        
                        if (row >= 1) { 
                            // updateData
                            const filterupdate: any = {} 
                            filterupdate.course_id=course_id;
                            filterupdate.task_id=task_id;
                            filterupdate.user_id=user_id;   
                            filterupdate.update_date=day;
                            filterupdate.task_learning_status=0;   
                            //  const ResultInsertTask= await MyrsTask.updateData(filterupdate);  
                            // updateData
        
                        } else {
                            // insertData
                            const filterInsert: any = {} 
                            filterInsert.course_id=course_id;
                            filterInsert.task_id=task_id;
                            filterInsert.user_id=user_id;       
                            filterInsert.create_date=day;
                            filterInsert.update_date=day;
                            filterInsert.task_learning_status = 0;  
                            // getWhereChk
                            const filter1Chk: any = {}
                            filter1Chk.task_id = task_id; 
                            filter1Chk.course_id = course_id; 
                            console.warn(`filter1Chk `,filter1Chk);
                            const StTask = getCustomRepository(CrsCourseTaskRepository);
                            const rowsTaskcourse = await StTask.getWhereChkTask(filter1Chk);
                            const rowStTask: number = rowsTaskcourse.length; // count array 
                            if (rowStTask == 0) {
                                const rss = { 
                                    filter1Chk: filter1Chk,
                                    rowsTaskcourse: rowsTaskcourse,
                                    rowStTask: rowStTask, 
                                };
                                // ok(res, rss);
                                // return // exit loop ออกจากลูปการทำงาน 
                            const ResultInsertTask= await MyrsTask.insertData(filterInsert);
                            } // insertData
                        }
                        const data = {  
                                    task_id: task_id,  
                                    content_id: content_id, 
                                    title: task_title, 
                                    detail: task_detail,
                                    type_name_th: type_name_th, 
                                    type_name: type_name, 
                                    create_by_fullname: create_by_fullname, 
                                    update_by_fullname: update_by_fullname, 
                                    link: link_url,  
                                    create_date_th: createdateth, 
                                    update_date_th: updatedateth, 
                                    create_date_en: createdate_en, 
                                    update_date_en: updatedate_en, 
                                    create_date: create_date, 
                                    update_date: update_date,  
                                } 
                        tempData.push(data); 
                    }
                    /**********************************/
                        const rss = {
                            response: {
                                result: "true",
                                remark: "update Success",
                                StatusDescription: 'Update task',
                                message_th: 'Update task',
                                status: 200,
                                time_ms: null
                            },
                            data: null,
                            userid: user_id,
                            courseid: course_id, 
                        };
                        ok(res, rss);
                        return // exit loop ออกจากลูปการทำงาน 
                    }
                }
            /************************************/   
            const searchcode: any = {} 
            searchcode.course_id = course_id; 
            const CategoryRepository = getCustomRepository(CrsCourseRepository);
            const rssData = await CategoryRepository.getWhereChk(searchcode);
            const rowcourse: number = rssData.length; // count array 
            if(rowcourse==0){ 
                        const rss = {
                            response: {
                                result: "true",
                                remark: "Course not found",
                                StatusDescription: 'Course not found',
                                message_th: 'ไม่พบข้อมูล Course ในระบบ',
                                status: 404,
                                time_ms: null
                            },
                            data: null,
                            userid: user_id,
                            courseid: course_id, 
                        };
                        NotFound(res, rss);
                        return // exit loop ออกจากลูปการทำงาน 
            }     
            const course_progress: number = 0;      
            const filter: any = {} 
            filter.user_id=user_id;
            filter.course_id=course_id;
            filter.create_date=day;
            filter.update_date=day;
            filter.course_progress=course_progress; 
            //const ResultArray: any = {} 
            const ResultArray = await rs.insertData(filter);  
            const rsTask = getCustomRepository(CrsCourseTaskRepository);
            const ResultArrayTaskData: any = {}     

            const filter1: any = {}
            filter1.user_id = user_id;
            filter1.course_id = course_id;
            filter1.isCount = 1; 
            const rowsmycourse = await rsTask.getWhereChk(filter1);
            const row: number = rowsmycourse.length; // count array 
            console.log("row", row); 
            console.log("user_id", user_id); 
            console.log("course_id", course_id);  
            if (row >= 1) {
                        const filterTask: any = {}   
                        filterTask.course_id=course_id;
                        filterTask.content_id=null;
                        filterTask.keyword=null;
                        filterTask.task_id=null; 
                        filterTask.start=null;
                        filterTask.end=null; 
                        filterTask.order=null;
                        filterTask.pages=null;
                        filterTask.sizepsge=null;
                        filterTask.isCount=0;
                    console.warn(`filter `,filterTask);
                    const ResultArrayTask = await rsTask.getWhereRs(filterTask);
                    console.warn(`ResultArray `,ResultArrayTask);
                    // ok(res, ResultArrayTask); 
                    // return  
                    let tempData = [];
                    for (const [key, value] of Object.entries(ResultArrayTask)) {
                        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                        const task_id: number = value.task_id;
                        const content_id: number = value.content_id;
                        const task_title: number = value.task_title;
                        const task_detail: number = value.task_detail;
                        const create_by_display_name: string = value.create_by_display_name;
                        const update_by_display_name: string = value.update_by_display_name;
                        const create_by_fullname: string = value.create_by_fullname;
                        const update_by_fullname: string = value.update_by_fullname;
                        const link_url: number = value.link_url;
                        const sort: number = value.sort;
                        const create_date: number = value.create_date;
                        const update_date: number = value.update_date;
                        const create_by: number = value.create_by;
                        const update_by: number = value.update_by;
                        const type_name_th: string = value.type_name_th; 
                        const type_name: string = value.type_name; 
                        const createdate_en: string = toEnDate(create_date); 
                        const updatedate_en: string = toEnDate(update_date); 
                        const createdateth : string = toThaiDate(create_date);   
                        const updatedateth: string = toThaiDate(update_date); 
                        // getWhereChk
                        const filter1Chk: any = {}
                        filter1Chk.user_id = user_id; 
                        filter1Chk.course_id = course_id; 
                        console.warn(`filter1Chk `,filter1Chk);
                        const MyrsTask = getCustomRepository(CrsMyCourseTaskRepository);
                        const rowsmycourse = await MyrsTask.getWhereChk(filter1Chk);
                        const row: number = rowsmycourse.length; // count array 
                        console.log("row", row); 
                        console.log("user_id", user_id); 
                        console.log("course_id", course_id); 
                        //return // exit loop ออกจากลูปการทำงาน 
                        if (row >= 1) { 
                            // updateData
                            const filterupdate: any = {} 
                            filterupdate.course_id=course_id;
                            filterupdate.task_id=task_id;
                            filterupdate.user_id=user_id;   
                            filterupdate.update_date=day;
                            filterupdate.task_learning_status=0;   
                            const ResultInsertTask= await MyrsTask.updateData(filterupdate);  
                            // updateData
        
                        } else {
                            // insertData
                            const filterInsert: any = {} 
                            filterInsert.course_id=course_id;
                            filterInsert.task_id=task_id;
                            filterInsert.user_id=user_id;       
                            filterInsert.create_date=day;
                            filterInsert.update_date=day;
                            filterInsert.task_learning_status=0;  
                            const ResultInsertTask= await MyrsTask.insertData(filterInsert);  
                            // insertData
                        }
                        
                        const data = {  
                                    task_id: task_id,  
                                    content_id: content_id, 
                                    title: task_title, 
                                    detail: task_detail,
                                    type_name_th: type_name_th, 
                                    type_name: type_name, 
                                    create_by_fullname: create_by_fullname, 
                                    update_by_fullname: update_by_fullname, 
                                    link: link_url,  
                                    create_date_th: createdateth, 
                                    update_date_th: updatedateth, 
                                    create_date_en: createdate_en, 
                                    update_date_en: updatedate_en, 
                                    create_date: create_date, 
                                    update_date: update_date,  
                                } 
                        tempData.push(data); 
                    }//
                const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
                        var payloadRs = {
                            response: {
                                        result: "true",
                                        remark: "insertData",
                                        StatusDescription: 'insertData',
                                        message_th: 'เพิ่มข้อมูล', 
                                        status: 200,
                                        time_ms: null
                                    },  
                                    data: resultData,
                                };
                        ok(res, payloadRs); 
                        return // exit loop ออกจากลูปการทำงาน
            }
            var datarts = {
                        response: {
                            result: "true",
                            remark: "insertData",
                            StatusDescription: 'insertData',
                            message_th: 'เพิ่มข้อมูล', 
                            status: 200,
                            time_ms: null
                        },  
                        data: ResultArray,
                    };
            ok(res, datarts); 
            return // exit loop ออกจากลูปการทำงาน
        } catch (error: any) {
            res.json(serverError(error?.message));
            console.log(error);

        }
}  

export const learningstatusMyTaskCourse= async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        const now = new Date();
        const day =new Date();
        const user_id: number = query.user_id;
        const course_id: number = query.course_id; 
        const task_id: number = query.task_id; 
        const task_learning_status: number = query.task_learning_status; 
        const learningstatus: number = query.learningstatus; 
        if(learningstatus!=null){  const task_learning_status: number = learningstatus; }
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try { 
            console.log("body",body); 
            console.log("query",query);
            console.log("day", day); 
            const MyCourseTasrs = getCustomRepository(CrsMyCourseTaskRepository); 
        // return 
            if(user_id==null){
                var rss = {
                    response: {
                        result: "true",
                        remark: "Warning!!",
                        StatusDescription: 'user_id is null',
                        message_th: 'ไม่พบข้อมูล user_id',
                        status: 404,
                        time_ms: null
                    },
                    data: null,
                };
                NotFound(res, rss);
                return // exit loop ออกจากลูปการทำงาน 
            }
            if (course_id == null){
                var rss = {
                    response: {
                        result: "true",
                        remark: "Warning!!",
                        StatusDescription: 'course_id is null',
                        message_th: 'ไม่พบข้อมูล course_id',
                        status: 404,
                        time_ms: null
                    },
                    data: null,
                };
                NotFound(res, rss);
                return // exit loop ออกจากลูปการทำงาน 
            }  
            if (task_id == null){
                var rss = {
                    response: {
                        result: "true",
                        remark: "Warning!!",
                        StatusDescription: 'task_id is null',
                        message_th: 'ไม่พบข้อมูล task_id',
                        status: 404,
                        time_ms: null
                    },
                    data: null,
                };
                NotFound(res, rss);
                return // exit loop ออกจากลูปการทำงาน 
            }
            if (task_learning_status == null) {
                /*
                var rss = {
                    response: {
                        result: "true",
                        remark: "Warning!!",
                        StatusDescription: 'task_learning_status is null',
                        message_th: 'ไม่พบข้อมูล task_learning_status',
                        status: 404,
                        time_ms: null
                    },
                    data: null,
                };
                NotFound(res, rss);
                return // exit loop ออกจากลูปการทำงาน 
                */
                const task_learning_status: number = 1;
            }  
            if (user_id != null && course_id != null && task_id != null) {
                const filter1: any = {}
                filter1.user_id = user_id;
                filter1.course_id = course_id;
                filter1.task_id = task_id; 
                console.warn(`filter1 `,filter1);
                const rowsmycourse = await MyCourseTasrs.getWhereChk(filter1);
                const row: number = rowsmycourse.length; // count array 
                console.log("row", row); 
                console.log("user_id", user_id); 
                console.log("course_id", course_id); 
                console.log("task_id", task_id); 
               // return // exit loop ออกจากลูปการทำงาน 
                if (row >= 1) {
                    const filter2: any = {}
                    filter2.user_id = user_id;
                    filter2.course_id = course_id;
                    filter2.task_id = task_id;
                    filter2.task_learning_status = task_learning_status;
                    const rowsmycourse2 = await MyCourseTasrs.getWhereChk2(filter2);
                    const row2: number = rowsmycourse2.length; // count array 
                    console.log("row2", row2); 
                    console.log("user_id", user_id); 
                    console.log("course_id", course_id); 
                    console.log("task_id", task_id); 
                    //return // exit loop ออกจากลูปการทำงาน 
                        if (row2==0) {
                                // updateData
                                const filterupdate: any = {} 
                                filterupdate.course_id=course_id;
                                filterupdate.task_id=task_id;
                                filterupdate.user_id=user_id;   
                            filterupdate.update_date = day;
                            if (task_learning_status == 1) {
                                filterupdate.task_learning_status=1;   
                            } else {
                                filterupdate.task_learning_status=0;   
                            }
                            const ResultupdateDataTask= await MyCourseTasrs.updateData(filterupdate);      
                            var datarts = {
                                            response: {
                                                result: "true",
                                                remark: "update information.",
                                                StatusDescription: 'update information successful.',
                                                message_th: 'แก้ไขข้อมูล สำเร็จ.', 
                                                status: 200,
                                                time_ms: null
                                            },  
                                            input:query,
                                            data: ResultupdateDataTask,
                                        };
                                ok(res, datarts); 
                                return // exit loop ออกจากลูปการทำงาน
                        }else{
                                // updateData
                                const filterupdate: any = {} 
                                filterupdate.course_id=course_id;
                                filterupdate.task_id=task_id;
                                filterupdate.user_id=user_id;   
                                filterupdate.update_date=day;
                                filterupdate.task_learning_status=task_learning_status;   
                                const ResultupdateDataTask= await MyCourseTasrs.updateData(filterupdate);      
                                var datarts = {
                                            response: {
                                                result: "true",
                                                remark: "update information..",
                                                StatusDescription: 'update information successful..',
                                                message_th: 'แก้ไขข้อมูล สำเร็จ ..', 
                                                status: 200,
                                                time_ms: null
                                    },  
                                            input:query,
                                            data: ResultupdateDataTask,
                                        };
                                ok(res, datarts); 
                                return // exit loop ออกจากลูปการทำงาน 
                    }
                } else {
                    const rss = {
                        response: {
                            result: "true",
                            remark: "Not Found",
                            StatusDescription: 'Data Not Found the system',
                            message_th: 'ไม่พบข้อมูลที่ระบุกรุณาตรวจสอบ',
                            status: 404,
                            time_ms: null
                        },
                        input:query,
                        data: null,
                        userid: user_id,
                        courseid: course_id, 
                    };
                    NotFound(res, rss);
                    return // exit loop ออกจากลูปการทำงาน 
                }
            }
        
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error);

    }
}

export const getMyCoursetask= async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try { 
            let Result: any[] = []; 
            const task_id: number = query.task_id;
            const user_id: number = query.user_id;
            const course_id: number = query.course_id;
            const task_learning_status: number = query.task_learning_status;
            const subject_id: number = query.subject_id;
            const subject_parent_id: number = query.subject_parent_id; 
            const category_id: number = query.category_id;
            const level_id: number = query.level_id;
            const start: string = query.start;
            const end: string = query.end; 
            const order: string = query.order;
            const debug: number = query.debug;
            if(user_id==null){   
                var rss = {
                    response: {
                        result: "true",
                        remark: "success",
                        StatusDescription: 'user_id is null',
                        message_th: 'ไม่พบข้อมูล user_id กรุณาตรวจสอบ',
                        status: 400,
                        time_ms: null
                    },
                    data: null,
                };
                badRequest(res, rss); 
            return // exit loop ออกจากลูปการทำงาน 
            }
            
            if(course_id==null){   
                var rss = {
                    response: {
                        result: "true",
                        remark: "success",
                        StatusDescription: 'course_id is null',
                        message_th: 'ไม่พบข้อมูล course_id กรุณาตรวจสอบ',
                        status: 400,
                        time_ms: null
                    },
                    data: null,
                };
                badRequest(res, rss); 
            return // exit loop ออกจากลูปการทำงาน 
            }
            
            
            const keyword = query?.keyword;
            let newKeyword: string | undefined = undefined
            if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
            }
            const page: number = Number(req.query?.page) || 1;
            const size: number = Number(req.query?.size) || 40;
            const limit = Number(query.limit) || 1000;
            console.log(`user_id=`); 
            console.log(user_id);
            console.log(`query=`); 
            console.log(query);
            const rs = getCustomRepository(CrsMyCourseTaskRepository); 
            if(debug==1){ 
                var dar:any = {
                        input_query:query, 
                        mesage: 'debug code', 
                        Rs:Result,                     
                        Request: req,
                        Response: res,
                        NextFunction: next,
                        headers: headers,
                        params: params,
                        body: body,
                        data:null,
                    };
                    ok(res, dar); 
                    return // exit loop 
            }   
            const filter1: any = {} 
                filter1.user_id=user_id;
                filter1.course_id=course_id;
                filter1.task_id=task_id;
                filter1.keyword=newKeyword;
                filter1.category_id=category_id;
                filter1.subject_id=subject_id;
                filter1.subject_parent_id=subject_parent_id;
                filter1.class_level=level_id;
                filter1.start=start;
                filter1.end=end; 
                filter1.order=order;
                filter1.pages=null;
                filter1.sizepsge=null;
                filter1.isCount=1;
            // console.warn(`filter1 `,filter1);
            const rows = await rs.getWhereRs(filter1);
            const isCount1: number =1;
            const getCount = rows
            console.log("getCount", getCount) 
            const row: number = rows.length; // count array 
            const totalpages: number = Math.round((row / size)) || 1;
            console.log(`total_pages=`); 
            console.log(totalpages);
            const isCount: number =0;
            const filter: any = {} 
                filter.user_id=user_id;
                filter.course_id=course_id;
                filter.task_id=task_id;
                filter.keyword=newKeyword;
                filter.category_id=category_id;
                filter.subject_id=subject_id;
                filter.subject_parent_id=subject_parent_id;
                filter.class_level=level_id;
                filter.start=start;
                filter.end=end; 
                filter.order=order;
                filter.pages=page;
                filter.sizepsge=size;
                filter.isCount=0;
            // console.warn(`filter `,filter);
            const ResultArray = await rs.getWhereRs(filter);
            // console.warn(`ResultArray `,ResultArray);
            /*****************************************/
            let tempData = [];
            for (const [key, value] of Object.entries(ResultArray)) {
                // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                const task_id:number = value.task_id;
                const course_id: number = value.course_id;
                const category_id: number = value.category_id;
                const user_id:number = value.user_id;
                const task_learning_status:number= value.task_learning_status || 0;            
                const fullname: string = value.fullname;  
                const course_thumbnail: string = value.course_thumbnail;
                const category_thumbnail: string = value.category_thumbnail; 
                const create_date: string = value.create_date; 
                const update_date: string = value.update_date; 
                const createdate_en: string = toEnDate(create_date); 
                const updatedate_en: string = toEnDate(update_date); 
                const createdateth : string = toThaiDate(create_date);   
                const updatedateth : string = toThaiDate(update_date); 
                const task_title: number = value.task_title;
                const link_url: number = value.link_url;
                const course_name: string = value.course_name; 
                const category_name: string = value.category_name; 
                const level_name: string = value.mul_level_name; 
                const subject_name: string = value.subject_name; 
                const parent_subject_name: string = value.parent_subject_name; 
                const institution: string = value.institution;
                const course_period: number = value.course_period || 0;   
                const number_of_exam: number = value.number_of_exam || 0;   
                const number_of_video: number = value.number_of_video || 0;   
                const number_of_plan: number = value.number_of_plan || 0;    
                const number_of_quiz: number = value.number_of_quiz || 0;    
                const course_ratings: number = value.course_ratings || 0;    
                const display_name: string = value.display_name; 
                const type_name: string = value.type_name; 
                const type_name_th: string = value.type_name_th;  
                // functionApp.toThaiDate(); 
                const data = { 
                            course_id: course_id,                       
                            user_id: user_id,  
                            category_id: category_id,  
                            task_id: task_id, 
                            display_name: display_name,  
                            task_title: task_title, 
                            course_name: course_name, 
                            category_name: category_name, 
                            level_name: level_name, 
                            subject_name: subject_name, 
                            parent_subject_name: parent_subject_name, 
                            link_url: link_url,  
                            create_date_th: createdateth, 
                            update_date_th: updatedateth, 
                            create_date_en: createdate_en, 
                            update_date_en: updatedate_en, 
                            create_date: create_date, 
                            update_date: update_date,  
                            course_thumbnail: course_thumbnail, 
                            category_thumbnail: category_thumbnail, 
                            institution: institution, 
                            course_period: course_period, 
                            number_of_exam: number_of_exam, 
                            number_of_video: number_of_video, 
                            number_of_plan: number_of_plan, 
                            number_of_quiz: number_of_quiz, 
                            course_ratings: course_ratings, 
                            type_name_th:type_name_th,
                            type_name:type_name,
                            task_learning_status: task_learning_status,
                            fullname:fullname,
                        } 
                tempData.push(data); 
            }
            const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
            // console.log(resultData) 
            console.warn(resultData)
            // console.error(resultData)
            // console.table(resultData);
            /*****************************************/
                const Task = getCustomRepository(CrsCourseTaskRepository); 
                const filterTask: any = {} 
                filterTask.course_id=course_id; 
                filterTask.isCount=1;
                console.warn(`filterTask `,filterTask);
                /****************/
                const Taskrows = await Task.getWhereRs(filterTask);
                const Tasktotal: number = Taskrows.length; // count array 
                let Tasktotaldata  =Math.round(Tasktotal);
                const filterTaskDone: any = {} 
                filterTaskDone.user_id=user_id;
                filterTaskDone.course_id=course_id; 
                filterTaskDone.isCount = 1;
                filterTaskDone.task_learning_status = 1;
                /****************/
                const myTask = getCustomRepository(CrsMyCourseTaskRepository); 
                const myTasktotalDonerows = await myTask.getWhereRs(filterTaskDone); 
                
                //return
                let TasktotalDone: number = myTasktotalDonerows.length; // count array 
                let TaskpecentDone: number =(TasktotalDone*100/Tasktotaldata);
                let Taskpecent = Math.round(TaskpecentDone);
                console.warn(`Tasktotaldata `,Tasktotaldata);
                console.warn(`TaskpecentDone `,TaskpecentDone);
                console.warn(`Taskpecent `,Taskpecent); 
                /*****************************************/
                const My_Course_rs = getCustomRepository(CrsMyCourseRepository); 
                const filterMyCourse: any = {} 
                        filterMyCourse.user_id=user_id;
                        filterMyCourse.course_id=course_id;
                        filterMyCourse.keyword=null;
                        filterMyCourse.category_id=null;
                        filterMyCourse.subject_id=null;
                        filterMyCourse.subject_parent_id=null;
                        filterMyCourse.class_level=null;
                        filterMyCourse.start=null;
                        filterMyCourse.end=null; 
                        filterMyCourse.order=null;
                        filterMyCourse.pages=null;
                        filterMyCourse.sizepsge=null;
                        filterMyCourse.isCount=0;
                    // console.warn(`filter `,filter);
                    const My_Course_ResultArray = await My_Course_rs.getWhereRs(filter);
                if(Taskpecent==100){
                    // getWhereChk
                    const filter1: any = {}
                    filter1.user_id = user_id;
                    filter1.course_id = course_id; 
                    filter1.course_progress = 1;
                    console.warn(`filter1 `,filter1);
                    const rowsmycourse1 = await My_Course_rs.getWhereChk(filter1);
                    const row: number = rowsmycourse1.length; // count array 
                    if (row >= 1) { } else {
                        const filter2: any = {}
                        filter2.user_id = user_id;
                        filter2.course_id = course_id;  
                        console.warn(`filter2 `,filter2);
                        const rowsmycourse = await My_Course_rs.getWhereChk(filter2);
                        let tempDatamycourse = [];    
                        for (const [key, value] of Object.entries(rowsmycourse)) {
                            const my_course_id:number = value.my_course_id;
                            console.log(`my_course_id `, my_course_id);
                            const user_id:number = value.user_id;
                            const course_id: number = value.course_id;
                            const create_date: any = value.create_date;
                            const update_date: any = value.update_date;
                            const course_progress: number = value.course_progress;
                            // const course_progress: number = value.course_progress;
                            const day =new Date();
                            const updateMyCourse: any = {} 
                            updateMyCourse.my_course_id=my_course_id;
                            updateMyCourse.user_id=user_id;
                            updateMyCourse.course_id=course_id; 
                            updateMyCourse.create_date = create_date;
                            updateMyCourse.update_date = day;
                            updateMyCourse.course_progress=1;
                            console.log(`updateMyCourse `,updateMyCourse);
                            const My_Course_Result_update = await My_Course_rs.updateData(updateMyCourse);
                            console.log(`My_Course_Result_update `,My_Course_Result_update);  
                            const datamycourse = {
                                my_course_id: my_course_id,
                                user_id: user_id,
                                course_id: course_id,
                                create_date: create_date,
                                update_date: update_date,
                                course_progress: course_progress,
                                My_Course_Result_update: My_Course_Result_update,
                            } 
                        
                            tempDatamycourse.push(datamycourse); 
                        }
                        console.log(`tempDatamycourse `, tempDatamycourse);
                        // var rt = { data:tempDatamycourse,filter:filter1 };
                        // ok(res, rt); 
                        // return // exit loop ออกจากลูปการทำงาน  
                    }
                }
            /*****************************************/
            /*
                const CourseRs = getCustomRepository(CrsCourseRepository); 
                const filter_Course: any = {} 
                filter_Course.course_id=course_id;
                filter_Course.keyword=newKeyword;
                filter_Course.category_id=null;
                filter_Course.subject_id=null;
                filter_Course.subject_parent_id=null;
                filter_Course.class_level=null;
                filter_Course.start=null;
                filter_Course.end=null; 
                filter_Course.order=null;
                filter_Course.pages=null;
                filter_Course.sizepsge=null;
                filter_Course.isCount=0;
                console.warn(`filter_Course `,filter_Course);
                const ResultArraycourse = await CourseRs.getWhereRs(filter_Course); 
                */
            var payload = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        }, 
                        input_query:query,
                        total_page: totalpages,
                        total: row, 
                        page: page,
                        perpage: size,
                    // course_data: ResultArraycourse,                                         
                        task_totaldata: Tasktotaldata,    
                        task_total_done: TasktotalDone,    
                        task_pecent: Taskpecent,  
                        my_course_data: My_Course_ResultArray,
                        task_data: resultData, 
                    };
                ok(res, payload);
                return // exit loop ออกจากลูปการทำงาน  

            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}//

export const getCourse= async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try { 
            let Result: any[] = []; 
            const user_id: number = query.user_id;
            const subject_id: number = query.subject_id;
            const subject_parent_id: number = query.subject_parent_id;
            const course_id: number = query.course_id;
            const category_id: number = query.category_id;
            const level_id: number = query.level_id;
            const start: string = query.start;
            const end: string = query.end;
            const ratings: number = query.ratings;
            const order: string = query.order;
            const debug: number = query.debug;
            if(course_id==null){ 
                var rss = {
                    response: {
                        result: "true",
                        remark: "Unaccess",
                        StatusDescription: 'course_id is null',
                        message_th: 'ไม่พบข้อมูล course_id กรุณาตรวจสอบ',
                        status: 400,
                        time_ms: null
                    },
                    data: null,
                };
                // badRequest(res, rss); 
            // return // exit loop ออกจากลูปการทำงาน 
            }
            const keyword = query?.keyword;
            let newKeyword: string | undefined = undefined
            if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
            }
            const page: number = Number(req.query?.page) || 1;
            const size: number = Number(req.query?.size) || 20;
            const limit = Number(query.limit) || 1000;
            console.log(`user_id=`); 
            console.log(user_id);
            console.log(`query=`); 
            console.log(query);
            // Connect To Data from TypeORM Mysql DB
            const rs = getCustomRepository(CrsCourseRepository);
            if(debug==1){ 
                var dar:any = {
                        input_query:query, 
                        mesage: 'debug code', 
                        Rs:Result,                     
                        Request: req,
                        Response: res,
                        NextFunction: next,
                        headers: headers,
                        params: params,
                        body: body,
                        data:null,
                    };
                    ok(res, dar); 
                    return // exit loop 
            }   
            const filter1: any = {} 
                filter1.course_id=course_id;
                filter1.keyword=newKeyword;
                filter1.category_id=category_id;
                filter1.subject_id=subject_id;
                filter1.subject_parent_id=subject_parent_id;
                filter1.class_level=level_id;
                filter1.start=start;
                filter1.end=end;
                filter1.ratings=ratings;
                filter1.order=order;
                filter1.pages=null;
                filter1.sizepsge=null;
                filter1.isCount=1;
            console.warn(`filter1 `,filter1);
            const rows = await rs.getWhereRs(filter1);
            await console.warn(`rows -> TypeORM-> Resultdata=> `,rows);
            const isCount1: number =1; 
            const getCount = rows
            console.log("getCount", getCount) 
            const row: number = rows.length; // count array 
            if(row == 0 || row == null){
                        var rss = {
                            response: {
                                result: "true",
                                remark: "Unaccess",
                                StatusDescription: 'Data is null',
                                message_th: 'ไม่พบข้อมูล ',
                                status: 404,
                                time_ms: null
                            },
                            data: null,
                        };
                        NotFound(res, rss);  
                return // exit loop ออกจากลูปการทำงาน 
            }
            const totalpages: number = Math.round((row / size)) || 1;
            console.log(`total_pages=`,totalpages);
            const isCount: number =0;
            const filter: any = {} 
                filter.course_id=course_id;
                filter.keyword=newKeyword;
                filter.category_id=category_id;
                filter.subject_id=subject_id;
                filter.subject_parent_id=subject_parent_id;
                filter.class_level=level_id;
                filter.start=start;
                filter.end=end;
                filter.ratings=ratings;
                filter.order=order;
                filter.pages=page;
                filter.sizepsge=size;
                filter.isCount=0;
            console.warn(`filter `,filter);
            const ResultArray = await rs.getWhereRs(filter);
            console.warn(`ResultArray `,ResultArray);
            /*****************************************/
            let tempData = [];
            for (const [key, value] of Object.entries(ResultArray)) {
                // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                const course_id:number = value.course_id;
                const view:number= value.view || 0;
                const coursename:string= value.course_name;
                const description:string= value.description;
                const category_id:number= value.category_id || 0;
                const subject_id:number= value.subject_id || 0;
                const subject_parent_id:number= value.subject_parent_id || 0;
                const institution:string= value.institution;
                const period:Number= value.period || 0;
                const number_exam:Number = value.number_exam || 0;
                const number_plan:number = value.number_plan || 0;
                const number_quiz:number = value.number_quiz || 0;
                const ratings: any = value.ratings + ' ดาว';
                const rating: number = value.ratings;
                const counts: number = Math.round(number_plan*100 / number_quiz) || 0; 
                const category: any = value.category;
                const level_id: number = value.level_id || 0;
                const level_name: any = ' ระดับชั้น '+ value.level_name;
                const subject_name: string = value.subject_name;
                const parent_subject_name: string = value.parent_subject_name;
                const course_thumbnail: string = value.course_thumbnail;
                const category_thumbnail: string = value.category_thumbnail; 
                const create_date: string = value.create_date; 
                const update_date: string = value.update_date; 
                const createdate_en: string = toEnDate(create_date); 
                const updatedate_en: string = toEnDate(update_date); 
                const createdateth : string = toThaiDate(create_date);   
                const updatedateth : string = toThaiDate(update_date); 
                // functionApp.toThaiDate(); 
                const data = { 
                        course_id: course_id,
                        course_name: coursename, 
                        view: view, 
                        description: description, 
                        category_id: category_id, 
                        subject_id: subject_id, 
                        subject_parent_id: subject_parent_id, 
                        institution: institution, 
                        course_period: period, 
                        number_exam: number_exam, 
                        number_plan: number_plan, 
                        number_quiz: number_quiz,
                        create_date_th: createdateth, 
                        update_date_th: updatedateth, 
                        create_date_en: createdate_en, 
                        update_date_en: updatedate_en, 
                        create_date: create_date, 
                        update_date: update_date, 
                        ratings: ratings,  
                        rating: rating,
                        category: category, 
                        level_id: level_id, 
                        level_name: level_name, 
                        subject_name: subject_name, 
                        parent_subject_name: parent_subject_name, 
                        course_thumbnail: course_thumbnail, 
                        category_thumbnail: category_thumbnail, 
                        counts:counts,
                        } 
                tempData.push(data); 
            }
            const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
            // console.log(resultData) 
            console.warn(resultData)
            // console.error(resultData)
            // console.table(resultData);
            /*****************************************/ 
            var payload = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        }, 
                        input_query:query,
                        total_page: totalpages,
                        total: row, 
                        page: page,
                        perpage: size,
                        data: resultData,
                    };
                ok(res, payload); 
                return // exit loop ออกจากลูปการทำงาน 
            } catch (error: any) {
                res.json(serverError(error?.message));
                console.log(error);

            }
}// getCourseTask dev

export const getCourseTask= async (req: Request, res: Response, next: NextFunction) => {
    const headers: any = req.headers  
    const body: any = req.body  
    const query: any = req.query   
    const params: any = req.params  
    let date: any =  Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds
    const str: any = req.headers.authorization 
    const token: any = str.replace("Bearer ", "")  
    try { 
        let Result: any[] = []; 
        const content_id: number = query.content_id; 
        const task_id: number = query.task_id; 
        const course_id: number = query.course_id; 
        const start: string = query.start;  
        const end: string = query.end;   
        const order: string = query.order;
        const debug: number = query.debug;
        if(course_id==null){ 
            var rss = {
                response: {
                    result: "true",
                    remark: "Unaccess",
                    StatusDescription: 'course_id is null',
                    message_th: 'ไม่พบข้อมูล course_id กรุณาตรวจสอบ',
                    status: 400,
                    time_ms: null
                },
                data: null,
            };
           badRequest(res, rss); 
           return // exit loop ออกจากลูปการทำงาน 
        }
        const keyword = query?.keyword;
        let newKeyword: string | undefined = undefined
        if (keyword && typeof keyword == 'string') {
          newKeyword = decodeURI(keyword)
        }
        const page: number = Number(req.query?.page) || 1;
        const size: number = Number(req.query?.size) || 50;
        const limit = Number(query.limit) || 1000;
        console.log(`course_id=`,course_id);
        console.log(`query=`,query);
        // Connect To Data from TypeORM Mysql DB
        const rs = getCustomRepository(CrsCourseTaskRepository);
        if(debug==1){ 
            var dar:any = {
                    input_query:query, 
                    mesage: 'debug code', 
                    Rs:Result,                     
                    Request: req,
                    Response: res,
                    NextFunction: next,
                    headers: headers,
                    params: params,
                    body: body,
                    data:null,
                };
                ok(res, dar); 
                return // exit loop 
        }   
        const filter1: any = {} 
            filter1.course_id=course_id;
            filter1.content_id=content_id;
            filter1.keyword=newKeyword;
            filter1.task_id=task_id; 
            filter1.start=start;
            filter1.end=end; 
            filter1.order=order;
            filter1.pages=null;
            filter1.sizepsge=null;
            filter1.isCount=1;
        console.warn(`filter1 `,filter1);
        const rows = await rs.getWhereRs(filter1);
        await console.warn(`rows -> TypeORM-> Resultdata=> `,rows);
        const isCount1: number =1; 
        const getCount = rows
        console.log("getCount", getCount) 
        const row: number = rows.length; // count array 
        if(row == 0 || row == null){
                    var rss = {
                        response: {
                            result: "true",
                            remark: "Unaccess",
                            StatusDescription: 'Data is null',
                            message_th: 'ไม่พบข้อมูล ',
                            status: 404,
                            time_ms: null
                        },
                        data: null,
                    };
                    NotFound(res, rss);  
            return // exit loop ออกจากลูปการทำงาน 
        }
        const totalpages: number = Math.round((row / size)) || 1;
        console.log(`total_pages=`,totalpages);
        const isCount: number =0;
         const filter: any = {} 
            filter.course_id=course_id;
            filter.content_id=content_id;
            filter.keyword=newKeyword;
            filter.task_id=task_id; 
            filter.start=start;
            filter.end=end; 
            filter.order=order;
            filter.pages=page;
            filter.sizepsge=size;
            filter.isCount=0;
        console.warn(`filter `,filter);
        const ResultArray = await rs.getWhereRs(filter);
        console.warn(`ResultArray `,ResultArray);
        /*****************************************/ 
        let tempData = [];
        for (const [key, value] of Object.entries(ResultArray)) {
            // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
            const task_id: number = value.task_id;
            const content_id: number = value.content_id;
            const task_title: number = value.task_title;
            const task_detail: number = value.task_detail;
            const create_by_display_name: string = value.create_by_display_name;
            const update_by_display_name: string = value.update_by_display_name;
            const create_by_fullname: string = value.create_by_fullname;
            const update_by_fullname: string = value.update_by_fullname;
            const link_url: number = value.link_url;
            const sort: number = value.sort;
            const create_date: number = value.create_date;
            const update_date: number = value.update_date;
            const create_by: number = value.create_by;
            const update_by: number = value.update_by;
            const type_name_th: string = value.type_name_th; 
            const type_name: string = value.type_name; 
            const createdate_en: string = toEnDate(create_date); 
            const updatedate_en: string = toEnDate(update_date); 
            const createdateth : string = toThaiDate(create_date);   
            const updatedateth : string = toThaiDate(update_date); 
            const data = {  
                       task_id: task_id,  
                       content_id: content_id, 
                       title: task_title, 
                       detail: task_detail,
                       type_name_th: type_name_th, 
                       type_name: type_name, 
                       create_by_fullname: create_by_fullname, 
                       update_by_fullname: update_by_fullname, 
                       link: link_url,  
                       create_date_th: createdateth, 
                       update_date_th: updatedateth, 
                       create_date_en: createdate_en, 
                       update_date_en: updatedate_en, 
                       create_date: create_date, 
                       update_date: update_date,  
                    } 
            tempData.push(data); 
        }
        const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
        // console.log(resultData) 
        console.warn(resultData)
        // console.error(resultData)
        // console.table(resultData);
        /*****************************************/ 
            var payload = {
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            status: 200,
                            time_ms: null
                        }, 
                        input_query:query,
                        total_page: totalpages,
                        total: row, 
                        page: page,
                        perpage: size,
                        data: resultData, 
                    };
            ok(res, payload); 
            return // exit loop ออกจากลูปการทำงาน 
        } catch (error: any) {
            res.json(serverError(error?.message));
            console.log(error);

        }
}// Demo

export const getXxxx= async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
        try { 
            let ResultArray: any[] = []; 
            const user_id: number = query.user_id;
            const subject_id: number = query.subject_id;
            const subject_parent_id: number = query.subject_parent_id;
            const course_id: number = query.course_id;
            const category_id: number = query.category_id;
            const level_id: number = query.level_id;
            const start: string = query.start;
            const end: string = query.end;
            const ratings: number = query.ratings;
            const order: string = query.order;
            const debug: number = query.debug;
            if(user_id==null){ 
                var rss = {
                    response: {
                        result: "true",
                        remark: "Unaccess",
                        StatusDescription: 'user_id is null',
                        message_th: 'ไม่พบข้อมูล user_id',
                        status: 404,
                        time_ms: null
                    },
                    data: null,
                };
                NotFound(res, rss);
                return // exit loop ออกจากลูปการทำงาน 
            }
            const keyword = query?.keyword;
            let newKeyword: string | undefined = undefined
            if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
            }
            const page: number = Number(req.query?.page) || 1;
            const size: number = Number(req.query?.size) || 20;
            const limit = Number(query.limit) || 1000;
            console.log(`user_id=`); 
            console.log(user_id);
            console.log(`query=`); 
            console.log(query);
            let totalpages: any[] = []; 
            let row: any[] = []; 
            const filter1: any = {}  
                filter1.keyword=newKeyword; 
                filter1.start=start;
                filter1.end=end;
                filter1.ratings=ratings;
                filter1.order=order;
                filter1.pages=null;
                filter1.sizepsge=null;
                filter1.isCount = 1;
        // const ResultArray = await rs.getWhereRs(filter1);
        // console.warn(`ResultArray `,ResultArray);
        /*****************************************/ 
        var payload = {
                    response: {
                        result: "true",
                        remark: "success",
                        StatusDescription: 'Success',
                        message_th: 'สำเร็จ', 
                        status: 200,
                        time_ms: null
                    }, 
                    input_query:query,
                    total_page: totalpages,
                    total: row, 
                    page: page,
                    perpage: size,
                    data: ResultArray,
                };
        ok(res, payload); 
        return // exit loop ออกจากลูปการทำงาน casecon=>8

    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error);

    }
}

export const CacheTemplate = async (req: Request, res: Response, next: NextFunction) => {
        const headers: any = req.headers  
        const body: any = req.body  
        const query: any = req.query   
        const params: any = req.params  
        let date: any =  Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds
        const str: any = req.headers.authorization 
        const token: any = str.replace("Bearer ", "")  
    try {  
            const Result: any[] = [];  
            const getRandomint= Validators.getRandomint(6); 
            const typeId: any = query.typeId;
            /*
            console.log(`typeId=`); 
            console.log(typeId);
            console.log(`query=`); 
            console.log(query);
            */
            const deletekey : any = query.deletekey;
            const limit = Number(query.limit) || 1000;            
            //const typeRepository = getCustomRepository(CrsTypeTaskRepository);

            if (typeId == null) {
                var keycache: any = 'Keycache'; 
            } else {
                var keycache: any = 'TruePlookPanYa-Type'+typeId; 
            }
            const time: Number = 3600;   
            const resultcache = await Cache.GetCacheData(keycache);   //  Get Cache Data 
            if (resultcache != null) {
                //console.log("GetCacheData result cache ", resultcache)
                const redisstatus: any = 1;
                const Result = resultcache;
                console.log("CacheData ", Result)
                if (deletekey == 1) { 
                    const del: any = await Cache.DeleteCacheData(keycache); //  Delete Cache Data
                    console.log("DeleteCacheData keycache ", keycache)
                } else {
                    const del: any = null;
                } 
                var rts = {
                            Random: getRandomint,
                            response: {
                                result: "true",
                                remark: "success",
                                StatusDescription: 'Success',
                                message_th: 'สำเร็จ', 
                                status: 200,
                                time_ms: null
                            },
                            data: Result,
                            cache_status:redisstatus,cache_type:'redis',
                        };
                    ok(res, rts); 
            } else {
                //console.log("resultcache", null)
                var redisstatus: any = 0;
                
                const Result = 'data';//await typeRepository.findAllCrsTypeTask(limit);
                    console.log(`casecon 2 findAllCrsTypeTask `); 
                    console.log("limit ", limit)
                    console.log("Result ", Result) 
                    const setData: any = {}
                    setData.time = time;
                    setData.keycache = keycache;
                    setData.data = Result;
                    console.log('Set Cache keycache', keycache);
                    console.log('Set Cache Data',setData);
                    await Cache.SetCacheData(setData);   //  Set Cache Data
                // Cache.SetCacheData(setData); 
                    var rt = {
                            Random: getRandomint,
                            response: {
                                result: "true",
                                remark: "success",
                                StatusDescription: 'Success',
                                message_th: 'สำเร็จ', 
                                status: 200,
                                time_ms: null
                            },
                            data: Result,
                            cache_status:redisstatus,cache_type:'redis',
                    };                    
                    
                    ok(res, rt); 
                
            }
        } catch (error: any) {
            res.json(serverError(error?.message));
            console.log(error); 
        }
} 

/*******function************************************/
function toThaiDate(date: any) { 
let monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]; 
    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();
    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
    return `${numOfDay} ${month} ${year} ` +`${hour}:${minutes}:${second} น.`;
}

function toEnDate(date: any) { 
    let monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]; 
    let monthNameslong = ["January", "February", "March.", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
        let year = date.getFullYear()+ 0;
        let month = monthNameslong[date.getMonth()];
        let numOfDay = date.getDate();
        let hour = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        let second = date.getSeconds().toString().padStart(2, "0");
        return `${numOfDay} ${month} ${year} ` +`${hour}:${minutes}:${second}`;
}
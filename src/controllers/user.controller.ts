import { NextFunction, Request, Response } from "express";
import { EntityRepository, Repository,getConnection, getRepository, getCustomRepository, getManager, Any } from "typeorm";
/******entity*******/
import { UsersAccount } from "../entities/UsersAccount.entity";
import { UsersAccountDeleteTemp } from "../entities/UsersAccountDeleteTemp.entity";
/********repository***********/
import { UsersAccountRepository } from "../repositories/UsersAccount.repository";
import { UsersAccountDeleteTempRepository } from "../repositories/UsersAccountDeleteTemp.repository";
/*********response api **********/
import { ok, serverError, created, Accepted, noContent, badRequest, Unauthorized, Forbidden, NotFound, serviceunavailable } from "../utils/helpers/response.helper";
// import { CacheDataOne } from '../utils/helpers/cacheredis.helper';
// const Cache1 = new CacheDataOne();
//import { CacheData } from '../utils/helpers/cacherediscluster.helper';
import { CacheData } from '../utils/helpers/cacheredisclusterV2.helper';
const Cache = new CacheData();
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const headers: any = req.headers  
    const body: any = req.body  
    const query: any = req.query   
    const params: any = req.params  
    let date: any =  Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds
    const str: any = req.headers.authorization 
    const token: any = str.replace("Bearer ", "")  
    let Result: any[] = []; 
    const user_id: number = query.user_id; 
    const start: string = query.start;
    const end: string = query.end; 
    const order: string = query.order;
    const debug: number = query.debug;

    try {
        const user_id: any = query.user_id || body.user_id || params.user_id || headers.user_id 
        if (user_id == null) {
            var rss = {
                response: {
                    result: "true",
                    remark: "Warning!!",
                    StatusDescription: 'user_id is null',
                    StatusDescription_thai: 'ไม่พบข้อมูล user_id',
                    time_ms: null
                },
                data: null,
                input: query,
            };
            NotFound(res, rss);
            return
        }
        const member_id: any = query.member_id;
        const keyword = query?.keyword;
        let newKeyword: string | undefined = undefined
        if (keyword && typeof keyword == 'string') {
        newKeyword = decodeURI(keyword)
        }
        console.log(`user_id=`); 
        console.log(user_id);
        console.log(`query=`); 
        console.log(query);
        const page: number = Number(req.query?.page) || 1;
        const size: number = Number(req.query?.size) || 20;
        const limit = Number(query.limit) || 1000; 
        const rs = getCustomRepository(UsersAccountRepository); 
        const filter1: any = {} 
        filter1.user_id=user_id;
        filter1.member_id = member_id; 
        filter1.keyword=newKeyword;
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
        filter.member_id = member_id; 
        filter.keyword=newKeyword;
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
        const user_id:number = value.user_id;
        const member_id :string = value.member_id;
        const user_username :string = value.user_username;
        const user_password :string = value.user_password;
        const user_password_tmp :string = value.user_password_tmp;
        const user_email :string = value.user_email;
        const user_status :string = value.user_status;
        const user_group :string = value.user_group;
        const user_permission :string = value.user_permission;
        const user_create_date  :string = value.user_create_date;
        const user_create_ip :string = value.user_create_ip;
        const user_active_date :string = value.user_active_date;
        const user_update_date :string = value.user_update_date;
        const user_login_date :string = value.user_login_date;
        const user_question :string = value.user_question;
        const user_answer :string = value.user_answer;
        const psn_display_name :string = value.psn_display_name;
        const psn_display_image :string = value.psn_display_image;
        const psn_display_banner :string = value.psn_display_banner;
        const psn_firstname :string = value.psn_firstname;
        const psn_lastname :string = value.psn_lastname;
        const psn_sex :string = value.psn_sex;
        const psn_address :string = value.psn_address;
        const psn_postcode :string = value.psn_postcode;
        const psn_province :string = value.psn_province;
        const psn_tel :string = value.psn_tel;
        const psn_id_number :string = value.psn_id_number;
        const psn_birthdate :string = value.psn_birthdate;
        const psn_public_status :string = value.psn_public_status;
        const job_name :string = value.job_name;
        const job_address :string = value.job_address;
        const job_edu_name :string = value.job_edu_name;
        const job_edu_level :string = value.job_edu_level;
        const job_edu_degree :string = value.job_edu_degree;
        const acc_user_facebook :string = value.acc_user_facebook;
        const acc_user_google :string = value.acc_user_google;
        const acc_user_twitter :string = value.acc_user_twitter;
        const acc_user_tvw :string = value.acc_user_tvw;
        const acc_user_tvw_nid :string = value.acc_user_tvw_nid;
        const introduce :string = value.introduce;
        const privacy_policy_status :number = value.privacy_policy_status;
        const curator_child_email :string = value.curator_child_email;
        const salutation :string = value.salutation;
        const school_id :number = value.school_id;
        const class_var :string = value.class;
        const class_room :string = value.class_room;
        const district_id :number = value.district_id;
        const amphur_id :number = value.amphur_id;
        const province_id :number = value.province_id;
        const geo_id :number = value.geo_id;
        const idx :string = value.idx;
        const apple_id :string = value.apple_id;
        const appuserid :string = value.appuserid;
        const uid: string = value.uid;
        const data = { 
                    user_id : user_id,
                    member_id: member_id,
                    username: user_username,                       
                    email: user_email,
                    StatusCode: user_status,
                    group: user_group,
                    create_date : user_create_date,
                    create_ip: user_create_ip,
                    active_date: user_active_date,
                    update_date: user_update_date,
                    login_date: user_login_date,
                    question: user_question,
                    answer: user_answer,
                    display_name: psn_display_name,
                    image: psn_display_image,
                    banner: psn_display_banner,
                    firstname: psn_firstname,
                    lastname: psn_lastname,
                    gender: psn_sex,
                    address: psn_address,
                    postcode: psn_postcode,
                    province: psn_province,
                    tel: psn_tel,
                    id_number: psn_id_number,
                    psn_birthdate: psn_birthdate,
                    psn_public_st: psn_public_status,
                    job_name: job_name,
                    job_address: job_address,
                    job_edu_name: job_edu_name,
                    job_edu_level: job_edu_level,
                    job_edu_degree: job_edu_degree,
                    acc_user_facebook: acc_user_facebook,
                    acc_user_google: acc_user_google,
                    acc_user_twitter: acc_user_twitter,
                    acc_user_tvw: acc_user_tvw,
                    acc_user_tvw_nid: acc_user_tvw_nid,
                    introduce: introduce,
                    privacy_policy_st: privacy_policy_status,
                    curator_child_email: curator_child_email,
                    salutation: salutation,
                    school_id: school_id,
                    class: class_var,
                    class_room: class_room,
                    district_id: district_id,
                    amphur_id: amphur_id,
                    province_id: province_id,
                    geo_id: geo_id,
                    idx: idx,
                    apple_id: apple_id,
                    appuserid: appuserid,
                    uid: uid,
                } 
        tempData.push(data); 
    }
    const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
    // console.log(resultData) 
    console.warn(resultData)
    // console.error(resultData)
    // console.table(resultData);
    /*****************************************/ 
    /*****************************************/ 
    /*
        Context.Response.StatusCode = 401;
        Context.Response.StatusDescription = "SessionExpired";
        Context.Response.IsSuccess = "false";
        Context.Response.Message = "SessionExpired"; 
 
    */
    /*
        Context.Response.StatusCode: 401;
        Context.Response.StatusDescription: "SessionExpired";
        Context.Response.IsSuccess: "false";
        Context.Response.Message: "SessionExpired"; 
 
    */ 
    const Response_data = {
            StatusCode: 401,
            StatusDescription: "SessionExpired",
            IsSuccess: "false",
            Message: "SessionExpired"  
        }
    var payload = {
                    response: {
                        result: "true",
                        remark: "success",
                        StatusDescription: 'Success',
                       StatusDescription_thai: 'สำเร็จ', 
                        StatusCode: 200,
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
    //ok(res, resultData);
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error); 
    }
} 
export const RemoveUser = async (req: Request, res: Response, next: NextFunction) => {
    const headers: any = req.headers
    const body: any = req.body
    const query: any = req.query
    const params: any = req.params
    let date: any = Date.now()
    var nowseconds = new Date().getTime()
    const now = new Date();
    const day = new Date();
    
    const str: any = req.headers.authorization
    const token: any = str.replace("Bearer ", "")
    try {
         
        const course_progress: number = query.course_progress || params.course_progress || headers.course_progress            
        const user_id: any = query.user_id || body.user_id || params.user_id || headers.user_id 
        const member_id: any = query.member_id || body.member_id || params.member_id || headers.member_id 
        const keyword = query?.keyword || body.keyword || params.keyword || headers.keyword 
        let newKeyword: string | undefined = undefined
        if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
        }
        const start: string = query.start || body.start || params.start || headers.start 
        const end: string = query.end || body.end || params.end || headers.end  
        const order: string = query.order || body.order || params.order || headers.order 
        const debug: number = query.debug || body.debug || params.debug || headers.debug 
        console.log("body", body);
        console.log("query", query);
        console.log("day", day);
        const rs = getCustomRepository(UsersAccountRepository);
        if (user_id == null) {
            var rss = {
                response: {
                    result: "true",
                    remark: "Warning!!",
                    StatusDescription: 'user_id is null',
                   StatusDescription_thai: 'ไม่พบข้อมูล user_id',
                    StatusCode: 404,
                    time_ms: null
                },
                data: null,
                input: query,
            };
            NotFound(res, rss);
            return
        }
        
        var otp: any = query.otp
        if (otp == '') {
                    var otp: any = body.otp
        }
        /*
        if(otp==null){ 
                    var rssotp = {
                        response: {
                            result: "true",
                            remark: "Unaccess",
                            StatusDescription: 'otp is null',
                           StatusDescription_thai: 'ไม่พบข้อมูล otp กรุณาตรวจสอบ',
                            StatusCode: 400,
                            time_ms: null
                        },
                        data: null,
                    };
                    badRequest(res, rssotp); 
                return // exit loop ออกจากลูปการทำงาน 
        }
        */
        const input: any = {} 
        input.otpval=otp; 
        const resultOTP = await Cache.validateOTP(input);  
        console.log('input',input);
        console.log('resultOTP',resultOTP);  
        if (resultOTP == 1) {
            var meaasge_rt: any = 'ok'
        }else{
            var meaasge_rt: any = 'no'
                /*
                var rssotp = {
                    response: {
                        result: "true",
                        remark: "Unaccess",
                        StatusDescription: 'otp is not accurate',
                       StatusDescription_thai: 'otp  ไม่ถูกต้อง กรุณาตรวจสอบ',
                        StatusCode: 400,
                        time_ms: null
                    },
                    data: null,
                };
                badRequest(res, rssotp); 
            return // exit loop ออกจากลูปการทำงาน 
            */
        }
        if (user_id != null) {
            /**********************************/
            const userRSS = getCustomRepository(UsersAccountRepository);
            const filter1: any = {}  
            filter1.user_id = user_id; 
            console.warn(`filter1 `,filter1);
            const rsss = await userRSS.getWhereChk(filter1);
            const row: number = rsss.length; // count array 
            console.log("row", row);
            console.log("user_id", user_id); 
            //return // exit loop ออกจากลูปการทำงาน 
            if (row >= 1) { 
                    const page: number = Number(req.query?.page) || 1;
                    const size: number = Number(req.query?.size) || 20;
                    const limit = Number(query.limit) || 1000;
                    const filter1: any = {} 
                    filter1.user_id=user_id; 
                    filter1.keyword=newKeyword; 
                    filter1.start=start;
                    filter1.end=end; 
                    filter1.order=order;
                    filter1.pages=null;
                    filter1.sizepsge=null;
                    filter1.isCount=1;
                        const rows = await rs.getWhereRs(filter1);
                        const isCount1: number =1; 
                        const getCount = rows
                        console.log("getCount", getCount) 
                        const row: number = rows.length; // count array 
                        const totalpages: number = Math.round((row / size)) || 1; 
                        const filterInsert: any = {} 
                        filterInsert.user_id=user_id;   
                        filterInsert.keyword =keyword;   
                        filterInsert.start=start;
                        filterInsert.end=end; 
                        filterInsert.order=order;
                        filterInsert.pages=page;
                        filterInsert.sizepsge=size;
                        filterInsert.isCount=0; 
                        console.warn(`filterInsert `,filterInsert);    
                        const ResultArray = await rs.getWhereRs(filterInsert);
                        console.warn(`ResultArray `,ResultArray);
                        /*****************************************/
                        let tempData = [];
                        for (const [key, value] of Object.entries(ResultArray)) {
                            // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
                            const user_id:number = value.user_id;
                            const member_id :string = value.member_id;
                            const user_username :string = value.user_username;
                            const user_password :string = value.user_password;
                            const user_password_tmp :string = value.user_password_tmp;
                            const user_email :string = value.user_email;
                            const user_status :string = value.user_status;
                            const user_group :string = value.user_group;
                            const user_permission :string = value.user_permission;
                            const user_create_date  :string = value.user_create_date;
                            const user_create_ip :string = value.user_create_ip;
                            const user_active_date :string = value.user_active_date;
                            const user_update_date :string = value.user_update_date;
                            const user_login_date :string = value.user_login_date;
                            const user_question :string = value.user_question;
                            const user_answer :string = value.user_answer;
                            const psn_display_name :string = value.psn_display_name;
                            const psn_display_image :string = value.psn_display_image;
                            const psn_display_banner :string = value.psn_display_banner;
                            const psn_firstname :string = value.psn_firstname;
                            const psn_lastname :string = value.psn_lastname;
                            const psn_sex :string = value.psn_sex;
                            const psn_address :string = value.psn_address;
                            const psn_postcode :string = value.psn_postcode;
                            const psn_province :string = value.psn_province;
                            const psn_tel :string = value.psn_tel;
                            const psn_id_number :string = value.psn_id_number;
                            const psn_birthdate :string = value.psn_birthdate;
                            const psn_public_status :string = value.psn_public_status;
                            const job_name :string = value.job_name;
                            const job_address :string = value.job_address;
                            const job_edu_name :string = value.job_edu_name;
                            const job_edu_level :string = value.job_edu_level;
                            const job_edu_degree :string = value.job_edu_degree;
                            const acc_user_facebook :string = value.acc_user_facebook;
                            const acc_user_google :string = value.acc_user_google;
                            const acc_user_twitter :string = value.acc_user_twitter;
                            const acc_user_tvw :string = value.acc_user_tvw;
                            const acc_user_tvw_nid :string = value.acc_user_tvw_nid;
                            const introduce :string = value.introduce;
                            const privacy_policy_status :number = value.privacy_policy_status;
                            const curator_child_email :string = value.curator_child_email;
                            const salutation :string = value.salutation;
                            const school_id :number = value.school_id;
                            const class_var :string = value.class;
                            const class_room :string = value.class_room;
                            const district_id :number = value.district_id;
                            const amphur_id :number = value.amphur_id;
                            const province_id :number = value.province_id;
                            const geo_id :number = value.geo_id;
                            const idx :string = value.idx;
                            const apple_id :string = value.apple_id;
                            const appuserid: string = value.appuserid;
                            var nowseconds = new Date().getTime()
                            var timestamp: any = nowseconds
                            var delete_date = new Date(timestamp); 
                            const uid: string = value.uid; 
                            const data = { 
                                        user_id : user_id,
                                        member_id: member_id,
                                        user_username: user_username,
                                        user_password: user_password,
                                        user_password_tmp: user_password_tmp,
                                        user_email: user_email,
                                        user_st: user_status,
                                        user_group: user_group,
                                        user_permission: user_permission,
                                        user_create_date : user_create_date,
                                        user_create_ip: user_create_ip,
                                        user_active_date: user_active_date,
                                        user_update_date: user_update_date,
                                        user_login_date: user_login_date,
                                        user_question: user_question,
                                        user_answer: user_answer,
                                        psn_display_name: psn_display_name,
                                        psn_display_image: psn_display_image,
                                        psn_display_banner: psn_display_banner,
                                        psn_firstname: psn_firstname,
                                        psn_lastname: psn_lastname,
                                        psn_sex: psn_sex,
                                        psn_address: psn_address,
                                        psn_postcode: psn_postcode,
                                        psn_province: psn_province,
                                        psn_tel: psn_tel,
                                        psn_id_number: psn_id_number,
                                        psn_birthdate: psn_birthdate,
                                        psn_public_st: psn_public_status,
                                        job_name: job_name,
                                        job_address: job_address,
                                        job_edu_name: job_edu_name,
                                        job_edu_level: job_edu_level,
                                        job_edu_degree: job_edu_degree,
                                        acc_user_facebook: acc_user_facebook,
                                        acc_user_google: acc_user_google,
                                        acc_user_twitter: acc_user_twitter,
                                        acc_user_tvw: acc_user_tvw,
                                        acc_user_tvw_nid: acc_user_tvw_nid,
                                        introduce: introduce,
                                        privacy_policy_st: privacy_policy_status,
                                        curator_child_email: curator_child_email,
                                        salutation: salutation,
                                        school_id: school_id,
                                        class: class_var,
                                        class_room: class_room,
                                        district_id: district_id,
                                        amphur_id: amphur_id,
                                        province_id: province_id,
                                        geo_id: geo_id,
                                        idx: idx,
                                        apple_id: apple_id,
                                        appuserid: appuserid,
                                        delete_date:delete_date,
                                        uid: uid,
                                    } 
                            tempData.push(data); 
                        }
                    const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
                    // console.log(resultData) 
                    console.warn(resultData)  
                    // ok(res, resultData);  
                    // return // exit loop ออกจากลูปการทำงาน 
                    const userRSSTemp = getCustomRepository(UsersAccountDeleteTempRepository);
                    const filterTemp: any = {} 
                    filterTemp.user_id = user_id; 
                    console.warn(`filterTemp `,filterTemp);
                    const rsss = await userRSSTemp.getWhereChk(filterTemp);
                    const rowLog: number = rsss.length; // count array 
                    console.log("row", row);
                    console.log("user_id", user_id); 
                    if (rowLog >= 1) {
                            var rssDataTm = {
                                    response: {
                                        result: "true",
                                        remark: "Data has been deleted tmp.",
                                        StatusDescription: 'Data has been deleted already exists tmp.',
                                       StatusDescription_thai: 'เคยทำการลบข้อมูลไปแล้ว.',
                                        StatusCode: 200,
                                        time_ms: null
                                    }, 
                                    data: rowLog,
                                    input: query, 
                                };
                                ok(res, rssDataTm);  
                            return // exit loop ออกจากลูปการทำงาน 
                    }
                    const insertDataLog = await rs.insertData(resultData);
                    // updateData 
                    const filterupdateDataUser: any = {} 
                    filterupdateDataUser.user_id=user_id; 
                    let date: any =  Date.now()
                    var nowseconds = new Date().getTime()
                    var timestamp: any = nowseconds
                    var datenew = new Date(timestamp); 
                    filterupdateDataUser.user_update_date=datenew;  
                    const updateDataUser = await rs.updateData(filterupdateDataUser);
                   
                    const filterdeleteData: any = {} 
                    filterdeleteData.user_id=user_id;  
                    console.warn(`filterdeleteData `,filterdeleteData);  
                    const deleteDataUsers: any = 0
                    const deleteDataUser = await rs.deleteData(filterdeleteData);
                    /////
                    var rssData = {
                        response: {
                            result: "true",
                            remark: "Data has been deleted.",
                            StatusDescription: 'Data has been deleted already exists.',
                           StatusDescription_thai: 'ทำการลบข้อมูลแล้ว.',
                            StatusCode: 200,
                            time_ms: null
                        },
                        insertDataLog: insertDataLog,
                        deleteDataUser: deleteDataUser,
                        data: resultData,
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
                           StatusDescription_thai: 'ไม่พบข้อมูล ในระบบ',
                            StatusCode: 200,
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
export const getUsersDeleteTemp = async (req: Request, res: Response, next: NextFunction) => {
const headers: any = req.headers  
const body: any = req.body  
const query: any = req.query   
const params: any = req.params  
let date: any =  Date.now()
var nowseconds = new Date().getTime()
var now: any = nowseconds
const str: any = req.headers.authorization 
const token: any = str.replace("Bearer ", "")  
let Result: any[] = []; 

try {
    const course_progress: number = query.course_progress || params.course_progress || headers.course_progress            
    const user_id: any = query.user_id || body.user_id || params.user_id || headers.user_id 
    const member_id: any = query.member_id || body.member_id || params.member_id || headers.member_id 
    const keyword = query?.keyword || body.keyword || params.keyword || headers.keyword 
    let newKeyword: string | undefined = undefined
    if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
    }
    const start: string = query.start || body.start || params.start || headers.start 
    const end: string = query.end || body.end || params.end || headers.end  
    const order: string = query.order || body.order || params.order || headers.order 
    const debug: number = query.debug || body.debug || params.debug || headers.debug 
    
    console.log(`user_id=`); 
    console.log(user_id);
    console.log(`query=`); 
    console.log(query);
    const page: number = Number(req.query?.page) || 1;
    const size: number = Number(req.query?.size) || 20;
    const limit = Number(query.limit) || 1000; 
    const rsTemp = getCustomRepository(UsersAccountDeleteTempRepository); 
    const filter1: any = {} 
    filter1.user_id=user_id;
    filter1.member_id = member_id; 
    filter1.keyword=newKeyword;
    filter1.start=start;
    filter1.end=end; 
    filter1.order=order;
    filter1.pages=null;
    filter1.sizepsge=null;
    filter1.isCount=1;
// console.warn(`filter1 `,filter1);
const rows = await rsTemp.getWhereRs(filter1);
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
    filter.member_id = member_id; 
    filter.keyword=newKeyword;
    filter.start=start;
    filter.end=end; 
    filter.order=order;
    filter.pages=page;
    filter.sizepsge=size;
    filter.isCount=0;
// console.warn(`filter `,filter);
const ResultArray = await rsTemp.getWhereRs(filter);
// console.warn(`ResultArray `,ResultArray);
/*****************************************/
let tempData = [];
for (const [key, value] of Object.entries(ResultArray)) {
    // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
    const id:number = value.id;
    const user_id:number = value.user_id;
    const member_id :string = value.member_id;
    const user_username :string = value.user_username;
    const user_password :string = value.user_password;
    const user_password_tmp :string = value.user_password_tmp;
    const user_email :string = value.user_email;
    const user_status :string = value.user_status;
    const user_group :string = value.user_group;
    const user_permission :string = value.user_permission;
    const user_create_date  :string = value.user_create_date;
    const user_create_ip :string = value.user_create_ip;
    const user_active_date :string = value.user_active_date;
    const user_update_date :string = value.user_update_date;
    const user_login_date :string = value.user_login_date;
    const user_question :string = value.user_question;
    const user_answer :string = value.user_answer;
    const psn_display_name :string = value.psn_display_name;
    const psn_display_image :string = value.psn_display_image;
    const psn_display_banner :string = value.psn_display_banner;
    const psn_firstname :string = value.psn_firstname;
    const psn_lastname :string = value.psn_lastname;
    const psn_sex :string = value.psn_sex;
    const psn_address :string = value.psn_address;
    const psn_postcode :string = value.psn_postcode;
    const psn_province :string = value.psn_province;
    const psn_tel :string = value.psn_tel;
    const psn_id_number :string = value.psn_id_number;
    const psn_birthdate :string = value.psn_birthdate;
    const psn_public_status :string = value.psn_public_status;
    const job_name :string = value.job_name;
    const job_address :string = value.job_address;
    const job_edu_name :string = value.job_edu_name;
    const job_edu_level :string = value.job_edu_level;
    const job_edu_degree :string = value.job_edu_degree;
    const acc_user_facebook :string = value.acc_user_facebook;
    const acc_user_google :string = value.acc_user_google;
    const acc_user_twitter :string = value.acc_user_twitter;
    const acc_user_tvw :string = value.acc_user_tvw;
    const acc_user_tvw_nid :string = value.acc_user_tvw_nid;
    const introduce :string = value.introduce;
    const privacy_policy_status :number = value.privacy_policy_status;
    const curator_child_email :string = value.curator_child_email;
    const salutation :string = value.salutation;
    const school_id :number = value.school_id;
    const class_var :string = value.class;
    const class_room :string = value.class_room;
    const district_id :number = value.district_id;
    const amphur_id :number = value.amphur_id;
    const province_id :number = value.province_id;
    const geo_id :number = value.geo_id;
    const idx :string = value.idx;
    const apple_id :string = value.apple_id;
    const appuserid :string = value.appuserid;
    const uid: string = value.uid;
    const data = { 
                id : id,
                user_id : user_id,
                member_id: member_id,
                username: user_username,                       
                email: user_email,
                StatusCode: user_status,
                group: user_group,
                create_date : user_create_date,
                create_ip: user_create_ip,
                active_date: user_active_date,
                update_date: user_update_date,
                login_date: user_login_date,
                question: user_question,
                answer: user_answer,
                display_name: psn_display_name,
                image: psn_display_image,
                banner: psn_display_banner,
                firstname: psn_firstname,
                lastname: psn_lastname,
                gender: psn_sex,
                address: psn_address,
                postcode: psn_postcode,
                province: psn_province,
                tel: psn_tel,
                id_number: psn_id_number,
                psn_birthdate: psn_birthdate,
                psn_public_st: psn_public_status,
                job_name: job_name,
                job_address: job_address,
                job_edu_name: job_edu_name,
                job_edu_level: job_edu_level,
                job_edu_degree: job_edu_degree,
                acc_user_facebook: acc_user_facebook,
                acc_user_google: acc_user_google,
                acc_user_twitter: acc_user_twitter,
                acc_user_tvw: acc_user_tvw,
                acc_user_tvw_nid: acc_user_tvw_nid,
                introduce: introduce,
                privacy_policy_st: privacy_policy_status,
                curator_child_email: curator_child_email,
                salutation: salutation,
                school_id: school_id,
                class: class_var,
                class_room: class_room,
                district_id: district_id,
                amphur_id: amphur_id,
                province_id: province_id,
                geo_id: geo_id,
                idx: idx,
                apple_id: apple_id,
                appuserid: appuserid,
                uid: uid,
            } 
    tempData.push(data); 
}
const resultData: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json
// console.log(resultData) 
console.warn(resultData)
// console.error(resultData)
// console.table(resultData);
    /*****************************************/
    /*****************************************/ 
    var payload = {
                    response: {
                        result: "true",
                        remark: "success",
                        StatusDescription: 'Success',
                       StatusDescription_thai: 'สำเร็จ', 
                        StatusCode: 200,
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
//ok(res, resultData);
} catch (error: any) {
    res.json(serverError(error?.message));
    console.log(error); 
}
}
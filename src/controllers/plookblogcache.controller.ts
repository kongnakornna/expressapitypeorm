import { NextFunction, Request, Response } from "express";
import { EntityRepository, Repository,getConnection, getRepository, getCustomRepository, getManager, Any } from "typeorm";
import { CmsblogZoneRepository } from "../repositories/CmsblogZone.repository"; 
import { CmsblogCategoryRepository } from "../repositories/CmsblogCategory.repository"; 
import { CmsblogDetailsRepository } from "../repositories/CmsblogDetails.repository"; 
// form class from file
import { Validator } from '../utils/helpers/validator.helper';  
const Validators = new Validator() 
import * as crypto from 'crypto'
var CryptoJS = require("crypto-js");
import * as Md5 from "md5-typescript";
var md5 = require('md5');
import { ok, serverError, created,Accepted,noContent,badRequest,Unauthorized,Forbidden,NotFound,serviceunavailable } from "../utils/helpers/response.helper";
// Done list Type course  
// import { CacheDataOne } from '../utils/helpers/cacheredis.helper';
// const Cache1 = new CacheDataOne();
//import { CacheData } from '../utils/helpers/cacherediscluster.helper';
import { CacheData } from '../utils/helpers/cacheredisclusterV2.helper';
const Cache = new CacheData();

export const list = async (req: Request, res: Response, next: NextFunction) => { 
    const headers: any = req.headers
    const body: any = req.body
    const query: any = req.query
    const params: any = req.params
    let date: any = Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds 
    try { 
        const ResultDATA: any[] = [];  
        const status = query.status;   
        const idx = query.idx;
        const category_id = query.category_id;
        const category_parent_id = query.category_parent_id; 
        const approve_user_id = query.approve_user_id; 
        const record_status = query.record_status; 
        const keyword = query.keyword;
        let newKeyword: string | undefined = undefined
        if (keyword && typeof keyword == 'string') {
          newKeyword = decodeURI(keyword)
        } 
        const start: string = query.start || null;
        const end: string = query.end || null;
        const order: string = query.order || null;
        const debug: number = query.debug || null;
        const deletekey: number = query.cachedelete || null;
        const page: number = Number(query.page) || 1;
        const size: number = Number(query.size) || 40;
        const limit = Number(query.limit) || 40; 
        /******************/
        var keycache_set: any = category_id + category_parent_id + keyword + status + start + end + order + limit + size + page;
        var keycache_md5 = md5(keycache_set);
        var keycache = 'tppy-plookblog/blog/category/list/' + keycache_md5;
        var keycache_row = 'tppy-plookblog/blog/category/list/row/' + keycache_md5;
        const time: Number = 600;
        const resultcache = await Cache.GetCacheData(keycache); 
        if (resultcache != null) {
            //console.log("GetCacheData result cache ", resultcache)
            const redis_st: any = 1;
            const Result = resultcache;
            console.log("CacheData ", Result)
            if (deletekey == 1) {
                const del: any = await Cache.DeleteCacheData(keycache);
                console.log("DeleteCacheData keycache ", keycache)
            } else {
                const del: any = null;
            }
            var rts = {
                response: {
                    result: "true",
                    remark: "success",
                    StatusDescription: 'Success',
                    message_th: 'สำเร็จ',
                    StatusCode: 200,
                    time_ms: null
                },
                data: Result,
                cache_StatusCode: redisstatus,
                cache_type: 'redis',
                query: query,
                category_id: category_id,
                start: start,
                end: end,
                page: page,
                size: size,
            };
            ok(res, rts);
        } else {
            /******************/
            let filter_rows: any = {}
            filter_rows.idx = idx || null;
            filter_rows.category_id = category_id || null;
            filter_rows.category_parent_id = category_parent_id || null;
            filter_rows.approve_user_id = approve_user_id || null;
            filter_rows.record_status = record_status || null;
            filter_rows.keyword = newKeyword || null;
            filter_rows.order = order || null;
            filter_rows.start = start || null;
            filter_rows.end = end || null;
            filter_rows.pages = null || null;
            filter_rows.sizepsge = null;
            filter_rows.isCount = 1;
            /******************/
            console.warn(`filter_rows `, filter_rows);
            /******************/
            const filter: any = {}
            filter.idx = idx || null;
            filter.category_id = category_id || null;
            filter.category_parent_id = category_parent_id || null;
            filter.approve_user_id = approve_user_id || null;
            filter.record_status = record_status || null;
            filter.keyword = newKeyword || null;
            filter.status = status || null;
            filter.order = order || null;
            filter.start = start || null;
            filter.end = end || null;
            filter.pages = page;
            filter.sizepsge = size;
            filter.isCount = 0;
            console.log(`filter `, filter);
            /******************/
            const rs: any = getCustomRepository(CmsblogDetailsRepository);
            console.log("ResultDATA", ResultDATA)
            console.log("rs", rs)
            const rows: any = await rs.getWhereRs(filter_rows);
            const getCount: any = rows
            console.log("getCount", getCount)
            const row: number = rows.length;
            console.log("rows", rows)
            /******************/
            const Result = await rs.getWhereRs(filter);
            //console.warn(`ResultArray `,Result);  
            const totalpages: number = Math.round((row / size)) || 1;
            // console.log(`total_pages=`,totalpages); 
            console.warn(Result)
            /******************/
            let tempData = [];
            // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
            for (const [key, value] of Object.entries(Result)) {
                const value = Result[key]
                const idx: number = value.idx || 0;
                const title: string = value.title || null;
                const description_short: string = value.description_short || null;
                const thumb_path: string = value.thumb_path || null;
                const banner_path: string = value.banner_path || null;
                const parent_idx: number = value.parent_idx || null;
                const child_order: number = value.child_order || null;
                const credit_by: number = value.credit_by || null;
                const record_StatusCode: number = value.record_status || null;
                const create_date: string = value.create_date || null;
                const start_date: string = value.start_date || null;
                const end_date: string = value.end_date || null;
                const event_date: string = value.event_date || null;
                const create_user_id: number = value.create_user_id || null;
                const update_date: string = value.update_date || null;
                const update_user_id: string = value.update_user_id || null;
                const approve_user_id: number = value.approve_user_id || null;
                const seo_keywords: any = value.seo_keywords || null;
                const seo_description: any = value.seo_description || null;
                const hashtag: any = value.hashtag || null;
                const view_count: any = value.view_count || null;
                const editor_picks: any = value.editor_picks || null;
                const encyclopedia: any = value.encyclopedia || null;
                const adminLock: any = value.adminLock || null;
                const isKnowledge: any = value.isKnowledge || null;
                const stay_time_sec: any = value.stay_time_sec || null;
                const category_id: number = value.category_id || null;
                const category_parent_id: number = value.category_parent_id || 0;
                const category_name_th: any = value.category_name_th || null;
                const category_name_en: any = value.category_name_en || null;
                const zone_id: any = value.zone_id || null;
                const user_id: any = value.user_id || null;
                const uid: any = value.uid || null;
                const psn_display_name: any = value.psn_display_name || null;
                const firstname: any = value.firstname || null;
                const lastname: any = value.lastname || null;
                const user_fullname: any = value.user_fullname || null;
                const thumbnail: any = value.thumbnail || null;
                const banner: string = value.banner || null;
                const create_date_th: string = Validators.toThaiDate(value.create_date);
                const update_date_th: string = Validators.toThaiDate(value.update_date);
                const content_type: string = value.content_type || null;
                const psn_display_image: string = value.psn_display_image || null;
                    
                const data = {
                    idx: idx,
                    uid: uid,
                    title: title,
                    description_short: description_short,
                    thumb_path: thumb_path,
                    banner_path: banner_path,
                    parent_idx: parent_idx,
                    child_order: child_order,
                    credit_by: credit_by,
                    record_StatusCode: record_status,
                    create_date: create_date,
                    start_date: start_date,
                    end_date: end_date,
                    event_date: event_date,
                    create_user_id: create_user_id,
                    update_date: update_date,
                    update_user_id: update_user_id,
                    approve_user_id: approve_user_id,
                    seo_keywords: seo_keywords,
                    seo_description: seo_description,
                    hashtag: hashtag,
                    view_count: view_count,
                    editor_picks: editor_picks,
                    encyclopedia: encyclopedia,
                    adminLock: adminLock,
                    isKnowledge: isKnowledge,
                    stay_time_sec: stay_time_sec,
                    category_id: category_id,
                    category_name_th: category_name_th,
                    category_name_en: category_name_en,
                    zone_id: zone_id,
                    user_id: user_id,
                    psn_display_name: psn_display_name,
                    firstname: firstname,
                    lastname: lastname,
                    user_fullname: user_fullname,
                    thumbnail: thumbnail,
                    banner: banner,
                    create_date_th: create_date_th,
                    update_date_th: update_date_th,
                    content_type: content_type,
                    psn_display_image: psn_display_image,
                }
                tempData.push(data);
            }
            console.log('tempData', tempData)
            const Results: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json   
            /*****************************************/
             /*****************************************/
             const setDatarows: any = {}
             setDatarows.time = time;
             setDatarows.keycache = keycache_row;
             setDatarows.data = row;
             console.log('Set Cache key cache rows', keycache);
             console.log('Set Cache setDatarows', setDatarows);
             /*****************************************/
             const setDataCache: any = {}
             setDataCache.time = time;
             setDataCache.keycache = keycache;
             setDataCache.data = Results;
             await Cache.SetCacheData(setDataCache);
            var payload = {
                response: {
                    result: "true",
                    remark: "home",
                    StatusDescription: ' success',
                    message_th: 'สำเร็จ',
                    StatusCode: 200,
                    time_ms: null
                },
                input_query: query,
                total_page: totalpages,
                total: row,
                page: page,
                perpage: size,
                data: Results,
            };
            ok(res, payload);
        }        
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error);

    }
}
export const home = async (req: Request, res: Response, next: NextFunction) => { 
    const headers: any = req.headers
    const body: any = req.body
    const query: any = req.query
    const params: any = req.params
    let date: any = Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds 
    try { 
        const ResultDATA: any[] = [];  
        const status = query.status;   
        const idx = query.idx;
        const category_id = query.category_id;
        const category_parent_id = query.category_parent_id; 
        const approve_user_id = query.approve_user_id; 
        const record_status = query.record_status; 
        const keyword = query.keyword;
        let newKeyword: string | undefined = undefined
        if (keyword && typeof keyword == 'string') {
          newKeyword = decodeURI(keyword)
        } 
        const start: string = query.start || null;
        const end: string = query.end || null;
        const order: string = query.order || null;
        const debug: number = query.debug || null;
        const deletekey: number = query.cachedelete || null;
        const page: number = Number(query.page) || 1;
        const size: number = Number(query.size) || 15;
        const limit = Number(query.limit) || 15;

       /******************/
       let filter_rows: any = {} 
       filter_rows.idx= idx || null;
       filter_rows.category_id=category_id || null; 
       filter_rows.category_parent_id = category_parent_id || null;
       filter_rows.approve_user_id = approve_user_id || null;
       filter_rows.record_status =  record_status || null;
       filter_rows.keyword=newKeyword || null;
       filter_rows.order = order || null;            
       filter_rows.start=start || null;
       filter_rows.end=end || null;
       filter_rows.pages=null || null;
       filter_rows.sizepsge=null;
       filter_rows.isCount=1;
       /******************/
       console.warn(`filter_rows `, filter_rows);
       /******************/ 
       const filter: any = {}  
       filter.idx= idx || null;
       filter.category_id= category_id|| null; 
       filter.category_parent_id = category_parent_id || null;
       filter.approve_user_id = approve_user_id || null;
       filter.record_status =  record_status || null;
       filter.keyword=newKeyword || null;
       filter.status = status || null;   
       filter.order = order || null;
       filter.start=start || null;
       filter.end=end || null;
       filter.pages=page;
       filter.sizepsge=size;
       filter.isCount = 0; 
       console.log(`filter `, filter); 
       /******************/
        const rs: any = getCustomRepository(CmsblogDetailsRepository); 
        console.log("ResultDATA", ResultDATA)  
        console.log("rs", rs)  
        const rows:any = await rs.getWhereRs(filter_rows);
        const setDatarows: any = {}  
        const getCount:any = rows
        console.log("getCount",getCount) 
        const row: number = rows.length;  
        console.log("rows",rows) 
        /******************/
        const Result = await rs.getWhereRs(filter); 
        //console.warn(`ResultArray `,Result);  
        const totalpages: number = Math.round((row / size)) || 1;
        // console.log(`total_pages=`,totalpages); 
        console.warn(Result)  
        /******************/
        let tempData = [];
          // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
          for (const [key,value] of Object.entries(Result)) {
            const value = Result[key]  
            const idx:number= value.idx || 0;  
            const title:string= value.title || null;  
            const description_short:string= value.description_short || null;  
            const thumb_path:string= value.thumb_path || null;  
            const banner_path:string= value.banner_path || null;  
            const parent_idx:number= value.parent_idx || null;  
            const child_order:number= value.child_order || null;  
            const credit_by:number= value.credit_by || null;  
            const record_status:number= value.record_status || null;  
            const create_date:string= value.create_date || null;  
            const start_date:string= value.start_date || null;  
            const end_date:string= value.end_date || null;   
            const event_date:string= value.event_date || null;  
            const create_user_id:number= value.create_user_id || null;  
            const update_date:string= value.update_date || null;  
            const update_user_id:string= value.update_user_id || null;  
            const approve_user_id:number= value.approve_user_id || null;  
            const seo_keywords:any= value.seo_keywords || null;  
            const seo_description:any= value.seo_description || null;  
            const hashtag:any= value.hashtag || null;  
            const view_count:any= value.view_count || null;  
            const editor_picks:any= value.editor_picks || null;  
            const encyclopedia:any= value.encyclopedia || null;  
            const adminLock:any= value.adminLock || null;  
            const isKnowledge:any= value.isKnowledge || null;  
            const stay_time_sec:any= value.stay_time_sec || null;  
            const category_id: number = value.category_id || null;
            const category_parent_id: number = value.category_parent_id || 0;  
            const category_name_th:any= value.category_name_th || null;    
            const category_name_en:any= value.category_name_en || null;   
            const zone_id:any= value.zone_id || null;  
            const user_id: any = value.user_id || null;    
            const uid: any = value.uid || null; 
            const psn_display_name:any= value.psn_display_name || null;  
            const firstname:any= value.firstname || null;    
            const lastname:any= value.lastname || null;  
            const user_fullname:any= value.user_fullname || null;   
            const thumbnail:any= value.thumbnail || null;  
            const banner:string= value.banner || null;  
            const create_date_th : string = Validators.toThaiDate(value.create_date); 
            const update_date_th: string = Validators.toThaiDate(value.update_date); 
            const content_type: string = value.content_type || null; 
            const psn_display_image: string = value.psn_display_image || null;
            
            const data = { 
                          idx:idx,  
                          uid:uid,
                          title:title,  
                          description_short:description_short,  
                          thumb_path:thumb_path,  
                          banner_path:banner_path,  
                          parent_idx:parent_idx,  
                          child_order:child_order,  
                          credit_by:credit_by,  
                          record_status:record_status,  
                          create_date:create_date,  
                          start_date:start_date,  
                          end_date:end_date,   
                          event_date:event_date,  
                          create_user_id:create_user_id,  
                          update_date:update_date,  
                          update_user_id:update_user_id,  
                          approve_user_id:approve_user_id,  
                          seo_keywords:seo_keywords,  
                          seo_description:seo_description,  
                          hashtag:hashtag,  
                          view_count:view_count,  
                          editor_picks:editor_picks,  
                          encyclopedia:encyclopedia,  
                          adminLock:adminLock,  
                          isKnowledge:isKnowledge,  
                          stay_time_sec:stay_time_sec,  
                          category_id:category_id,  
                          category_name_th:category_name_th,    
                          category_name_en:category_name_en,   
                          zone_id:zone_id,  
                          user_id:user_id,    
                          psn_display_name:psn_display_name,  
                          firstname:firstname,    
                          lastname:lastname,  
                          user_fullname:user_fullname,   
                          thumbnail:thumbnail,  
                          banner:banner,  
                          create_date_th:create_date_th,   
                          update_date_th:update_date_th, 
                          content_type:content_type,         
                          psn_display_image:psn_display_image,                
                    } 
            tempData.push(data);   
        } 
        console.log('tempData', tempData) 
        const Results: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json   
        /*****************************************/  
        filter.pages=page;
        filter.sizepsge=size;
        var payload = {
                    response: {
                        result: "true",
                        remark: "home",
                        StatusDescription: ' success',
                        message_th: 'สำเร็จ', 
                        StatusCode: 200,
                        time_ms: null
                    },
                    input_query:query,
                    total_page: totalpages,
                    total: row, 
                    page: page,
                    perpage: size,
                    data: Results,
                };
        ok(res, payload);
        
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error);

    }
}
export const datails = async (req: Request, res: Response, next: NextFunction) => { 
        const headers: any = req.headers
        const body: any = req.body
        const query: any = req.query
        const params: any = req.params
        let date: any = Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds 
        try { 
                    const ResultDATA: any[] = [];
                    const idx = query.idx;
                    const category_id = query.category_id;
                    if (idx == null) {
                        var rss = {
                            response: {
                                result: "true",
                                remark: "Warning!!",
                                StatusDescription: 'idx is null',
                                message_th: 'ไม่พบข้อมูล idx',
                                StatusCode: 404,
                                time_ms: null
                            },
                            data: null,
                            input: query,
                        };
                        NotFound(res, rss);
                        return
                    }
                    const debug: number = query.debug || null;
                    const deletekey: number = query.cachedelete || null;
                    const filter: any = {}
                    filter.idx = idx;
                    console.log(`filter `, filter);
                    /******************/
                    var keycache_set: any = category_id + idx;
                    var keycache_md5 = md5(keycache_set);
                    var keycache = 'tppy-plookblog/blog/datails/' + keycache_md5;
                    const time: Number = 600; 
              const rs: any = getCustomRepository(CmsblogDetailsRepository);
              const Result = await rs.getDetail(filter);
              console.warn(`Result `, Result);
                  
              /******************/
              let tempData = [];
              // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
              for (const [key, value] of Object.entries(Result)) {
                const value = Result[key]
                const idx: number = value.idx || 0;
                const title: string = value.title || null;
                const description_short: string = value.description_short || null;
                const description_long: string = value.description_long || null;
                const thumb_path: string = value.thumb_path || null;
                const banner_path: string = value.banner_path || null;
                const parent_idx: number = value.parent_idx || null;
                const child_order: number = value.child_order || null;
                const credit_by: number = value.credit_by || null;
                const record_StatusCode: number = value.record_status || null;
                const create_date: string = value.create_date || null;
                const start_date: string = value.start_date || null;
                const end_date: string = value.end_date || null;
                const event_date: string = value.event_date || null;
                const create_user_id: number = value.create_user_id || null;
                const update_date: string = value.update_date || null;
                const update_user_id: string = value.update_user_id || null;
                const approve_user_id: number = value.approve_user_id || null;
                const seo_keywords: any = value.seo_keywords || null;
                const seo_description: any = value.seo_description || null;
                const hashtag: any = value.hashtag || null;
                const view_count: any = value.view_count || null;
                const editor_picks: any = value.editor_picks || null;
                const encyclopedia: any = value.encyclopedia || null;
                const adminLock: any = value.adminLock || null;
                const isKnowledge: any = value.isKnowledge || null;
                const stay_time_sec: any = value.stay_time_sec || null;
                const category_id: number = value.category_id || null;
                const category_parent_id: number = value.category_parent_id || 0;
                const category_name_th: any = value.category_name_th || null;
                const category_name_en: any = value.category_name_en || null;
                const zone_id: number = value.zone_id || null;
                const user_id: number = value.user_id || null;
                const uid: any = value.uid || null;
                const psn_display_name: any = value.psn_display_name || null;
                const firstname: any = value.firstname || null;
                const lastname: any = value.lastname || null;
                const user_fullname: any = value.user_fullname || null;
                const thumbnail: any = value.thumbnail || null;
                const banner: string = value.banner || null;
                const create_date_th: string = Validators.toThaiDate(value.create_date);
                const update_date_th: string = Validators.toThaiDate(value.update_date);
                const content_type: string = value.content_type || null;
                const psn_display_image: string = value.psn_display_image || null;
                const data = {
                  idx: idx,
                  uid: uid,
                  title: title,
                  description_short: description_short,
                  description_long: description_long,
                  //thumb_path:thumb_path,  
                  //banner_path:banner_path,  
                  parent_idx: parent_idx,
                  child_order: child_order,
                  credit_by: credit_by,
                  record_StatusCode: record_status,
                  create_date: create_date,
                  start_date: start_date,
                  end_date: end_date,
                  event_date: event_date,
                  create_user_id: create_user_id,
                  update_date: update_date,
                  update_user_id: update_user_id,
                  approve_user_id: approve_user_id,
                  seo_keywords: seo_keywords,
                  seo_description: seo_description,
                  hashtag: hashtag,
                  view_count: view_count,
                  editor_picks: editor_picks,
                  encyclopedia: encyclopedia,
                  adminLock: adminLock,
                  isKnowledge: isKnowledge,
                  stay_time_sec: stay_time_sec,
                  category_id: category_id,
                  category_name_th: category_name_th,
                  category_name_en: category_name_en,
                  zone_id: zone_id,
                  user_id: user_id,
                  psn_display_name: psn_display_name,
                  firstname: firstname,
                  lastname: lastname,
                  user_fullname: user_fullname,
                  thumbnail: thumbnail,
                  banner: banner,
                  create_date_th: create_date_th,
                  update_date_th: update_date_th,
                  content_type: content_type,
                  psn_display_image: psn_display_image,
                }
                tempData.push(data);
              }
              console.log('tempData', tempData)
              const Results: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json   
                 var payload = {
                    response: {
                        result: "true",
                        remark: "category",
                        StatusDescription: ' success',
                        message_th: 'สำเร็จ', 
                        StatusCode: 200,
                        time_ms: null
                    },
                    input_query:query, 
                    data: Results,
                };
        ok(res, payload);
        
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error);

    }
}
export const zone = async (req: Request, res: Response, next: NextFunction) => { 
        const headers: any = req.headers
        const body: any = req.body
        const query: any = req.query
        const params: any = req.params
        let date: any = Date.now()
        var nowseconds = new Date().getTime()
        var now: any = nowseconds 
        try { 
            const ResultDATA: any[] = [];   
            const ads_status = query.ads_status; 
            const status = query.status;   
            const keyword = query.keyword;           
            const zone_id = query.zone_id;
            let newKeyword: string | undefined = undefined
            if (keyword && typeof keyword == 'string') {
              newKeyword = decodeURI(keyword)
            } 
            const start: string = query.start || null;
            const end: string = query.end || null;
            const order: string = query.order || null;
            const debug: number = query.debug || null;
            const deletekey: number = query.cachedelete || null;
            const page: number = Number(query.page) || 1;
            const size: number = Number(query.size) || 50;
            const limit = Number(query.limit) || 50;
            /******************/
            let filter_rows: any = {}             
            filter_rows.zone_id = zone_id || null; 
            filter_rows.ads_status =  ads_status || null;
            filter_rows.keyword=newKeyword || null;
            filter_rows.order = order || null;            
            filter_rows.start=start || null;
            filter_rows.end=end || null;
            filter_rows.pages=null || null;
            filter_rows.sizepsge=null;
            filter_rows.isCount=1;
            /******************/
            console.warn(`filter_rows `, filter_rows);
            /******************/ 
            const filter: any = {}  
            filter.zone_id = zone_id || null; 
            filter.ads_status =  ads_status || null;
            filter.keyword=newKeyword || null;
            filter.status = status || null;   
            filter.order = order || null;
            filter.start=start || null;
            filter.end=end || null;
            filter.pages=page;
            filter.sizepsge=size;
            filter.isCount = 0; 
            console.log(`filter `, filter); 
            /******************/ 
            var keycache_set: any =  keyword+zone_id+status+start+end+order+limit+size+page; 
            var keycache_md5 = md5(keycache_set);
            var keycache = 'tppy-plookblog/blog/zone/ist/' + keycache_md5;     
            var keycache_row = 'tppy-plookblog/blog/zone/ist/row/' + keycache_md5;    
            const time: Number = 600;    
            /******************/ 
                const rs: any = getCustomRepository(CmsblogZoneRepository); 
                console.log("ResultDATA", ResultDATA)  
                console.log("rs", rs)  
                const rows:any = await rs.getWhereRs(filter_rows); 
                const getCount:any = rows
                console.log("getCount",getCount) 
                const row: number = rows.length;  
                console.log("rows",rows) 
                /******************/
                const Result = await rs.getWhereRs(filter); 
                //console.warn(`ResultArray `,Result);  
                const totalpages: number = Math.round((row / size)) || 1;
                // console.log(`total_pages=`,totalpages); 
                console.warn(Result)  
                /******************/
                let tempData = [];
                  // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                  for (const [key,value] of Object.entries(Result)) {
                    const value = Result[key]  
                    const zone_id: number = value.zone_id || 0; 
                    const zone_name:number= value.zone_name || 0;  
                    const zone_url: string = value.zone_url || null;
                    const ads_StatusCode: string = value.ads_status || null;                         
                    const data = {  
                                  zone_id:zone_id,
                                  zone_name:zone_name,
                                  zone_url:zone_url,
                                  ads_status:ads_status,          
                            } 
                    tempData.push(data);   
                } 
                console.log('tempData', tempData) 
                const Results: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json   
                /*****************************************/   
                var payload = {
                    response: {
                        result: "true",
                        remark: "success",
                        StatusDescription: 'Success',
                        message_th: 'สำเร็จ', 
                        StatusCode: 200,
                        time_ms: null
                    },
                    input_query:query,
                    total_page: totalpages,
                    total: row, 
                    page: page,
                    perpage: size,
                    data: Results,
                };
        ok(res, payload);
 
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error);

    }
}  
export const category = async (req: Request, res: Response, next: NextFunction) => { 
    const headers: any = req.headers
    const body: any = req.body
    const query: any = req.query
    const params: any = req.params
    let date: any = Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds 
    try {
        const ResultDATA: any[] = [];
        const category_id = query.category_id;
        const category_parent_id = query.category_parent_id;
        const approve_user_id = query.approve_user_id;
        const record_status = query.record_status;
        const status = query.status;
        const keyword = query.keyword;
        const zone_id = query.zone_id;
        let newKeyword: string | undefined = undefined
        if (keyword && typeof keyword == 'string') {
            newKeyword = decodeURI(keyword)
        }
        const start: string = query.start || null;
        const end: string = query.end || null;
        const order: string = query.order || null;
        const debug: number = query.debug || null;
        const deletekey: number = query.cachedelete || null;
        const page: number = Number(query.page) || 1;
        const size: number = Number(query.size) || 50;
        const limit = Number(query.limit) || 50;
        /******************/
        let filter_rows: any = {}
        filter_rows.zone_id = zone_id || null;
        filter_rows.status = status || null;
        filter_rows.category_id = category_id || null;
        filter_rows.category_parent_id = category_parent_id || null;
        filter_rows.approve_user_id = approve_user_id || null;
        filter_rows.record_status = record_status || null;
        filter_rows.keyword = newKeyword || null;
        filter_rows.order = order || null;
        filter_rows.start = start || null;
        filter_rows.end = end || null;
        filter_rows.pages = null || null;
        filter_rows.sizepsge = null;
        filter_rows.isCount = 1;
        /******************/
        console.warn(`filter_rows `, filter_rows);
        /******************/
        const filter: any = {}
        filter.zone_id = zone_id || null;
        filter.status = status || null;
        filter.category_id = category_id || null;
        filter.category_parent_id = category_parent_id || null;
        filter.approve_user_id = approve_user_id || null;
        filter.record_status = record_status || null;
        filter.keyword = newKeyword || null;
        filter.status = status || null;
        filter.order = order || null;
        filter.start = start || null;
        filter.end = end || null;
        filter.pages = page;
        filter.sizepsge = size;
        filter.isCount = 0;
        console.log(`filter `, filter);
        /******************/
        var keycache_set: any = category_id + category_parent_id + keyword + zone_id + status + start + end + order + limit + size + page;
        var keycache_md5 = md5(keycache_set);
        var keycache = 'tppy-plookblog/blog/category/' + keycache_md5;
        var keycache_row = 'tppy-plookblog/blog/category/row/' + keycache_md5;
        const time: Number = 600;
        const resultcache = await Cache.GetCacheData(keycache); 
        if (resultcache != null) {
            //console.log("GetCacheData result cache ", resultcache)
            const redis_st: any = 1;
            const Result = resultcache;
            console.log("CacheData ", Result)
            if (deletekey == 1) { 
                const del: any = await Cache.DeleteCacheData(keycache); 
                console.log("DeleteCacheData keycache ", keycache)
            } else {
                const del: any = null;
            } 
            var rts = { 
                        response: {
                            result: "true",
                            remark: "success",
                            StatusDescription: 'Success',
                            message_th: 'สำเร็จ', 
                            StatusCode: 200,
                            time_ms: null
                        },
                        data: Result,
                        cache_StatusCode: redisstatus,
                        cache_type: 'redis', 
                        query: query,                       
                        category_id:category_id,
                        start: start,
                        end: end,
                        page:page,
                        size:size,                                      
                    };
                ok(res, rts); 
        } else { 
                const rs: any = getCustomRepository(CmsblogCategoryRepository);
                console.log("ResultDATA", ResultDATA)
                console.log("rs", rs)
                const rows: any = await rs.getWhereRs(filter_rows);
                const getCount: any = rows
                console.log("getCount", getCount)
                const row: number = rows.length;
                console.log("rows", rows)
                /******************/
                const Result = await rs.getWhereRs(filter);
                //console.warn(`ResultArray `,Result);  
                const totalpages: number = Math.round((row / size)) || 1;
                // console.log(`total_pages=`,totalpages); 
                console.warn(Result)
                /******************/
                let tempData = [];
                // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
                for (const [key, value] of Object.entries(Result)) {
                    const value = Result[key]
                    const category_id: number = value.category_id || 0;
                    const category_parent_id: number = value.category_parent_id || 0;
                    const category_name_th: string = value.category_name_th || null;
                    const category_name_en: string = value.category_name_en || null;
                    const category_name_code: string = value.category_name_code || null;
                    const category_name_code_short: string = value.category_name_code_short || null;
                    const deep_level: string = value.deep_level || null;
                    const direct_link: string = value.direct_link || null;
                    const theme_path: string = value.theme_path || null;
                    const trending: string = value.trending || null;
                    const pin_content_idx: string = value.pin_content_idx || null;
                    const zone_id: string = value.zone_id || null;
                    const zone_name: string = value.zone_name || null;
                    const icon: string = value.icon || null;
                        
                    const data = {
                        category_id: category_id,
                        category_parent_id: category_parent_id,
                        category_name_th: category_name_th,
                        category_name_en: category_name_en,
                        category_name_code: category_name_code,
                        category_name_code_short: category_name_code_short,
                        deep_level: deep_level,
                        direct_link: direct_link,
                        theme_path: theme_path,
                        icon: icon,
                        zone_id: zone_id,
                        zone_name: zone_name,
                    }
                    tempData.push(data);
                }
                console.log('tempData', tempData)
                const Results: any = tempData; // นำ array มาใส่ใน object เพื่อนำไปแปลงเป็น Json   
                /*****************************************/
                const setDatarows: any = {}
                setDatarows.time = time;
                setDatarows.keycache = keycache_row;
                setDatarows.data = row;
                console.log('Set Cache key cache rows', keycache);
                console.log('Set Cache setDatarows', setDatarows);
                /*****************************************/
                const setDataCache: any = {}
                setDataCache.time = time;
                setDataCache.keycache = keycache;
                setDataCache.data = Results;
                await Cache.SetCacheData(setDataCache);
                console.log('Set Cache key cache', keycache);
                console.log('Set Cache setDataCache', setDataCache);
                var payload = {
                    response: {
                        result: "true",
                        remark: "success",
                        StatusDescription: 'category',
                        message_th: 'สำเร็จ',
                        StatusCode: 200,
                        time_ms: null
                    },
                    input_query: query,
                    total_page: totalpages,
                    total: row,
                    page: page,
                    perpage: size,
                    data: Results,
                };
                ok(res, payload);
        } 
    } catch (error: any) {
        res.json(serverError(error?.message));
        console.log(error);

    }
}
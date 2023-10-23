import { EntityRepository, getRepository, Repository, EntityManager  } from "typeorm";
import { CmsblogCategory } from "../entities/CmsblogCategory.entity"; 
import * as crypto from 'crypto'
var CryptoJS = require("crypto-js");
import * as Md5 from "md5-typescript";
var md5 = require('md5');
@EntityRepository(CmsblogCategory)
export class CmsblogCategoryRepository extends Repository<CmsblogCategory>{
 
    async getWhereRs(filter: any) {  
            const category_id= filter.category_id;
            const category_parent_id= filter.category_parent_id;
            const zone_id = filter.zone_id;    
            const keyword = filter.keyword; 
            const ads_status= filter.ads_status;
            const status= filter.status; 
            const deep_level= filter.deep_level;           
            const start= filter.start;
            const end= filter.end; 
            const order= filter.order;
            const page= filter.pages;
            const size = filter.sizepsge;
            const isCount = filter.isCount;
            if (isCount == 0) {
                console.log(`rows filter `, filter); 
                console.log(`data keyword `, keyword);
                console.log(`rows isCount `, isCount); 
            } else {
                console.log(`data filter `, filter); 
                console.log(`data keyword `, keyword);
                console.log(`data isCount `, isCount); 
            }
            //console.log(`rows filter `, filter); 
            // return

            const query = this.createQueryBuilder('Cate');
                    // select
                    if(isCount==1){
                                query.select([
                                 "Cate.category_id AS category_id",
                                ]); 
                    } else {
                        //  "Cate.password AS password",
                        query.distinctOn(["Cate.category_id AS category_id"]); 
                        query.select([
                                    "Cate.category_id AS category_id",
                                    "Cate.category_parent_id AS category_parent_id",
                                    "Cate.category_name_th AS category_name_th",
                                    "Cate.category_name_en AS category_name_en",
                                    "Cate.category_name_code AS category_name_code",
                                    "Cate.category_name_code_short AS category_name_code_short",
                                    "Cate.deep_level AS deep_level",
                                    "Cate.direct_link AS direct_link",
                                    "Cate.theme_path AS theme_path",
                                    "Cate.trending AS trending",
                                    "Cate.sort_order AS sort_order",
                                    "Cate.child_background AS child_background",
                                    "Cate.child_style AS child_style",
                                    "Cate.child_template AS child_template",
                                    "Cate.child_category_id_list AS child_category_id_list",
                                    "Cate.list_menu_code AS list_menu_code",
                                    "Cate.status AS status",
                                    "Cate.weight AS weight",
                                    "Cate.zone_id AS zone_id",
                                    "Cate.is_frontend_select AS is_frontend_select",
                                    "Cate.pin_content_idx AS pin_content_idx",
                                    "Cate.seo_title AS seo_title",
                                    "Cate.seo_keyword AS seo_keyword",
                                    "Cate.seo_desc AS seo_desc",
                                    "Cate.seo_image_url AS seo_image_url",
                                    "Cate.fb_page_url AS fb_page_url",
                                    "Cate.ads_status AS ads_status",
                                    "Cate.icon AS icon", 
                                    "Cate.zone_id AS zone_id", 
                                    "zone.zone_name AS zone_name", 
                                    "zone.zone_url AS zone_url", 
                                ]); 
                                query.leftJoin(
                                    "cmsblog_zone",
                                    "zone",
                                    "zone.zone_id = Cate.zone_id"
                                );  
                    } 
                    query.where('1=1');   
                    if (status!=null) { 
                        query.andWhere("Cate.status= :status", { status }); 
                    }else{
                        query.andWhere("Cate.status=1"); 
                    } 
                    if (zone_id!=null) { 
                        query.andWhere("Cate.zone_id= :zone_id", { zone_id }); 
                    }   
                    if (ads_status!=null) { 
                        query.andWhere("Cate.ads_status= :ads_status", { ads_status }); 
                    }         
                    if (category_id!=null) { 
                        query.andWhere("Cate.category_id= :category_id", { category_id }); 
                    } 
                    if (category_parent_id!=null) { 
                        query.andWhere("Cate.category_parent_id= :category_parent_id", { category_parent_id }); 
                    }    
                    if (keyword!=null) { 
                        query.andWhere("Cate.category_name_th like :keyword", { keyword: keyword ? `%${keyword}%` : "%" }); 
                    }   
                    if(isCount==1){ 
                        query.groupBy("Cate.category_id")
                    }else{  
                        query.limit(size);
                        query.offset(size * (page - 1));
                        query.groupBy("Cate.category_id")
                    }
                    if (order=='desc') {
                        query.groupBy("Cate.category_id")
                        query.orderBy("Cate.sort_order", "DESC")  
                        query.orderBy("Cate.category_id", "DESC") 
                    } else if (order=='asc') {
                        query.groupBy("Cate.category_id")
                        query.orderBy("Cate.sort_order", "ASC")  
                        query.orderBy("Cate.category_id", "ASC")  
                    } else{
                        query.groupBy("Cate.category_id")
                        query.orderBy("Cate.sort_order", "DESC")  
                        query.orderBy("Cate.category_id", "DESC")  
                    }   
                    query.printSql()
                    query.maxExecutionTime(1000) // milliseconds.
                    console.log(`CmsblogCategory.repository  query-> `,query);
                return await query.getRawMany(); 
    }  
  
} 
 
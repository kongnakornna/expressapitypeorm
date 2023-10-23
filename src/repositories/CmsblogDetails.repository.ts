import { EntityRepository, getRepository, Repository, EntityManager  } from "typeorm";
import { CmsblogDetails } from "../entities/CmsblogDetails.entity"; 
@EntityRepository(CmsblogDetails)
export class CmsblogDetailsRepository extends Repository<CmsblogDetails>{
 
    async gethome(filter: any) {  
        const idx= filter.idx;
        const create_user_id= filter.create_user_id;
        const category_id = filter.category_id; 
        const category_parent_id = filter.category_parent_id;
        const zone_id = filter.zone_id;
        const keyword = filter.keyword; 
        const credit_by= filter.credit_by;
        const approve_user_id= filter.approve_user_id; 
        const update_user_id= filter.update_user_id;
        const record_status= filter.record_status;           
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

        const query = this.createQueryBuilder('cms');
                // select
                if(isCount==1){
                            query.select([
                             "cms.idx AS idx",
                            ]);
                            query.innerJoin(
                                "cmsblog_category_mapping",
                                "map",
                                "map.content_id = cms.idx and map.content_type=2"
                            ); 
                            query.innerJoin(
                                "cmsblog_category",
                                "cat",
                                "cat.category_id = map.category_id"
                            );                          
                            query.innerJoin(
                                "users_accounts",
                                "u",
                                "u.user_id = cms.create_user_id"
                            );                             
                            query.innerJoin(
                                "cmsblog_zone",
                                "zone",
                                "zone.zone_id = cat.zone_id"
                            ); 
                     
                } else {
                    //  "cms.password AS password",
                    query.distinctOn(["cms.idx AS idx"]); 
                    query.select([
                                "cms.idx AS idx", 
                                "cms.title AS title", 
                                "cms.description_short AS description_short",  
                                "cms.thumb_path AS thumb_path", 
                                "cms.banner_path AS banner_path", 
                                "cms.parent_idx AS parent_idx", 
                                "cms.child_order AS child_order", 
                                "cms.credit_by AS credit_by", 
                                "cms.record_status AS record_status", 
                                "cms.create_date AS create_date", 
                                "cms.start_date AS start_date", 
                                "cms.end_date AS end_date", 
                                "cms.event_date AS event_date", 
                                "cms.create_user_id AS create_user_id", 
                                "cms.update_date AS update_date", 
                                "cms.update_user_id AS update_user_id", 
                                "cms.approve_user_id AS approve_user_id", 
                                "cms.seo_keywords AS seo_keywords", 
                                "cms.seo_description AS seo_description", 
                                "cms.hashtag AS hashtag", 
                                "cms.view_count AS view_count", 
                                "cms.editor_picks AS editor_picks", 
                                "cms.encyclopedia AS encyclopedia", 
                                "cms.adminLock AS adminLock", 
                                "cms.isKnowledge AS isKnowledge", 
                                "cms.stay_time_sec AS stay_time_sec", 
                                "cat.category_parent_id AS category_parent_id",
                                "cat.category_id AS category_id",
                                "cat.category_parent_id AS category_parent_id",
                                "cat.category_name_th AS category_name_th",   
                                "cat.category_name_en AS category_name_en",  
                                "cat.zone_id AS zone_id",  
                                "map.content_type AS content_type",
                                "u.user_id AS user_id",  
                                "u.uid AS uid", 
                                "u.psn_display_name AS psn_display_name",  
                                "u.psn_firstname AS firstname",  
                                "u.psn_lastname AS lastname", 
                                "CONCAT(psn_firstname,' ',u.psn_lastname) AS user_fullname",
                                "u.psn_display_image AS psn_display_image", 
                                "CONCAT('https://static.trueplookpanya.com/',cms.thumb_path) AS thumbnail",
                                "CONCAT('https://static.trueplookpanya.com/',cms.banner_path) AS banner",
                                "cat.icon AS icon", 
                                "cat.zone_id AS zone_id", 
                                "zone.zone_name AS zone_name", 
                                "zone.zone_url AS zone_url", 
                            ]); 
                            // https://static.trueplookpanya.com/cmsblog/241/56241/banner_file.jpg
                            query.innerJoin(
                                "cmsblog_category_mapping",
                                "map",
                                "map.content_id = cms.idx and map.content_type=2"
                            ); 
                            query.innerJoin(
                                "cmsblog_category",
                                "cat",
                                "cat.category_id = map.category_id"
                            );  
                            query.innerJoin(
                                "users_accounts",
                                "u",
                                "u.user_id = cms.create_user_id"
                            );
                            query.innerJoin(
                                "cmsblog_zone",
                                "zone",
                                "zone.zone_id = cat.zone_id"
                            ); 
                } 
                query.where('1=1');  
                if (credit_by!=null) { 
                    query.andWhere("cms.create_user_id= :create_user_id", { create_user_id }); 
                }  
                if (zone_id!=null) { 
                    query.andWhere("cat.zone_id= :zone_id", { zone_id }); 
                } 
                if (category_id!=null) { 
                    query.andWhere("cms.category_id= :category_id", { category_id }); 
                } 
                if (category_parent_id!=null) { 
                    query.andWhere("cms.category_parent_id= :category_parent_id", { category_parent_id }); 
                } 
                     
                if (idx!=null) { 
                    query.andWhere("cms.idx= :idx", { idx }); 
                } 
                if (create_user_id!=null) { 
                    query.andWhere("cms.create_user_id= :create_user_id", { create_user_id }); 
                } 
                if (approve_user_id!=null) { 
                    query.andWhere("cms.approve_user_id= :approve_user_id", { approve_user_id }); 
                } 
                if (update_user_id!=null) { 
                    query.andWhere("cms.update_user_id= :update_user_id", { update_user_id }); 
                } 
                if (record_status!=null) { 
                    query.andWhere("cms.record_status= :record_status", { record_status }); 
                } else { 
                    query.andWhere("cms.record_status= 1");
                }   
                if (keyword!=null) { 
                    query.andWhere("cms.title like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                   // query.orWhere("cms.description_short like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                   // query.orWhere("cms.hashtag like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                }  
                if (start!=null && end!=null) { 
                    query.andWhere("cms.start_date BETWEEN '" + start + "' AND '" + end + "'");
                    // query.orWhere("cms.end_date  BETWEEN '" +start+"' AND '" +end+"'");
                    // query.orWhere("cms.event_date  BETWEEN '" +start+"' AND '" +end+"'");
                    // query.orWhere("cms.create_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                if(isCount==1){ 
                    query.groupBy("cms.idx")
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    query.groupBy("cms.idx")
                }
                if (order=='desc') {
                    query.groupBy("cms.idx")
                    query.orderBy("cms.idx", "DESC") 
                } else if (order=='asc') {
                    query.groupBy("cms.idx")
                    query.orderBy("cms.idx", "ASC")  
                } else{
                    query.groupBy("cms.idx")
                    query.orderBy("cms.idx", "DESC")  
                }   
                query.printSql()
                query.maxExecutionTime(1000) // milliseconds.
                console.log(`CmsblogDetails.repository  query-> `,query);
            return await query.getRawMany(); 
    }  
    
    async getWhereRs(filter: any) {  
            const idx= filter.idx;
            const create_user_id= filter.create_user_id;
            const category_id = filter.category_id;    
            const category_parent_id = filter.category_parent_id;
            const zone_id = filter.zone_id;
            const keyword = filter.keyword; 
            const credit_by= filter.credit_by;
            const approve_user_id= filter.approve_user_id; 
            const update_user_id= filter.update_user_id;
            const record_status= filter.record_status;           
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

            const query = this.createQueryBuilder('cms');
                    // select
                    if(isCount==1){
                                query.select([
                                 "cms.idx AS idx",
                                ]);
                                query.innerJoin(
                                    "cmsblog_category_mapping",
                                    "map",
                                    "map.content_id = cms.idx and map.content_type=2"
                                ); 
                                query.innerJoin(
                                    "cmsblog_category",
                                    "cat",
                                    "cat.category_id = map.category_id"
                                );                          
                                query.innerJoin(
                                    "users_accounts",
                                    "u",
                                    "u.user_id = cms.create_user_id"
                                ); 
                                query.innerJoin(
                                    "cmsblog_zone",
                                    "zone",
                                    "zone.zone_id = cat.zone_id"
                                ); 
                         
                    } else {
                        //  "cms.password AS password",
                        query.distinctOn(["cms.idx AS idx"]); 
                        query.select([
                                    "cms.idx AS idx", 
                                    "cms.title AS title", 
                                    "cms.description_short AS description_short",  
                                    "cms.thumb_path AS thumb_path", 
                                    "cms.banner_path AS banner_path", 
                                    "cms.parent_idx AS parent_idx", 
                                    "cms.child_order AS child_order", 
                                    "cms.credit_by AS credit_by", 
                                    "cms.record_status AS record_status", 
                                    "cms.create_date AS create_date", 
                                    "cms.start_date AS start_date", 
                                    "cms.end_date AS end_date", 
                                    "cms.event_date AS event_date", 
                                    "cms.create_user_id AS create_user_id", 
                                    "cms.update_date AS update_date", 
                                    "cms.update_user_id AS update_user_id", 
                                    "cms.approve_user_id AS approve_user_id", 
                                    "cms.seo_keywords AS seo_keywords", 
                                    "cms.seo_description AS seo_description", 
                                    "cms.hashtag AS hashtag", 
                                    "cms.view_count AS view_count", 
                                    "cms.editor_picks AS editor_picks", 
                                    "cms.encyclopedia AS encyclopedia", 
                                    "cms.adminLock AS adminLock", 
                                    "cms.isKnowledge AS isKnowledge", 
                                    "cms.stay_time_sec AS stay_time_sec",  
                                    "cat.category_id AS category_id",
                                    "cat.category_parent_id AS category_parent_id",
                                    "cat.category_name_th AS category_name_th",   
                                    "cat.category_name_en AS category_name_en",  
                                    "cat.zone_id AS zone_id",  
                                    "map.content_type AS content_type",
                                    "u.user_id AS user_id",  
                                    "u.uid AS uid", 
                                    "u.psn_display_name AS psn_display_name",  
                                    "u.psn_firstname AS firstname",  
                                    "u.psn_lastname AS lastname", 
                                    "CONCAT(psn_firstname,' ',u.psn_lastname) AS user_fullname",
                                    "u.psn_display_image AS psn_display_image", 
                                    "CONCAT('https://static.trueplookpanya.com/',cms.thumb_path) AS thumbnail",
                                    "CONCAT('https://static.trueplookpanya.com/',cms.banner_path) AS banner",
                                    "cat.icon AS icon", 
                                    "cat.zone_id AS zone_id", 
                                    "zone.zone_name AS zone_name", 
                                    "zone.zone_url AS zone_url", 
                                ]); 
                                // https://static.trueplookpanya.com/cmsblog/241/56241/banner_file.jpg
                                query.innerJoin(
                                    "cmsblog_category_mapping",
                                    "map",
                                    "map.content_id = cms.idx and map.content_type=2"
                                ); 
                                query.innerJoin(
                                    "cmsblog_category",
                                    "cat",
                                    "cat.category_id = map.category_id"
                                );  
                                query.innerJoin(
                                            "users_accounts",
                                            "u",
                                            "u.user_id = cms.create_user_id"
                                );  
                                query.innerJoin(
                                    "cmsblog_zone",
                                    "zone",
                                    "zone.zone_id = cat.zone_id"
                                ); 
                    } 
                    query.where('1=1');  
                    if (credit_by!=null) { 
                        query.andWhere("cms.create_user_id= :create_user_id", { create_user_id }); 
                    }
                    if (category_id!=null) { 
                        query.andWhere("cat.category_id= :category_id", { category_id }); 
                    } 
                    if (category_parent_id!=null) { 
                        query.andWhere("cat.category_parent_id= :category_parent_id", { category_parent_id }); 
                    } 
                    if (zone_id!=null) { 
                        query.andWhere("cat.zone_id= :zone_id", { zone_id }); 
                    }  
                    if (idx!=null) { 
                        query.andWhere("cms.idx= :idx", { idx }); 
                    } 
                    if (create_user_id!=null) { 
                        query.andWhere("cms.create_user_id= :create_user_id", { create_user_id }); 
                    } 
                    if (approve_user_id!=null) { 
                        query.andWhere("cms.approve_user_id= :approve_user_id", { approve_user_id }); 
                    } 
                    if (update_user_id!=null) { 
                        query.andWhere("cms.update_user_id= :update_user_id", { update_user_id }); 
                    } 
                    if (record_status!=null) { 
                        query.andWhere("cms.record_status= :record_status", { record_status }); 
                    } else { 
                        query.andWhere("cms.record_status= 1");
                    }    
                    if (keyword!=null) { 
                        query.andWhere("cms.title like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                       // query.orWhere("cms.description_short like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                       // query.orWhere("cms.hashtag like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                    }  
                    if (start!=null && end!=null) { 
                        query.andWhere("cms.start_date BETWEEN '" + start + "' AND '" + end + "'");
                        // query.orWhere("cms.end_date  BETWEEN '" +start+"' AND '" +end+"'");
                        // query.orWhere("cms.event_date  BETWEEN '" +start+"' AND '" +end+"'");
                        // query.orWhere("cms.create_date  BETWEEN '" +start+"' AND '" +end+"'");
                    } 
                    if(isCount==1){ 
                        query.groupBy("cms.idx")
                    }else{  
                        query.limit(size);
                        query.offset(size * (page - 1));
                        query.groupBy("cms.idx")
                    }
                    if (order=='desc') {
                        query.groupBy("cms.idx")
                        query.orderBy("cms.idx", "DESC") 
                    } else if (order=='asc') {
                        query.groupBy("cms.idx")
                        query.orderBy("cms.idx", "ASC")  
                    } else{
                        query.groupBy("cms.idx")
                        query.orderBy("cms.idx", "DESC")  
                    }   
                    query.printSql()
                    query.maxExecutionTime(1000) // milliseconds.
                    console.log(`CmsblogDetails.repository  query-> `,query);
                return await query.getRawMany(); 
    }  

    async getDetail(filter: any) {  
              
                        const idx= filter.idx;  
                        const category_id = filter.category_id;
                        const record_status= filter.record_status || null;                          
                        console.log(`getDetail filter `, filter); 
                        //return
                        const query = this.createQueryBuilder('cms');
                        query.distinctOn(["cms.idx AS idx"]);  
                        query.select([
                                        "cms.idx AS idx", 
                                        "cms.title AS title", 
                                        "cms.description_short AS description_short",  
                                        "cms.description_long AS description_long", 
                                        "cms.thumb_path AS thumb_path", 
                                        "cms.banner_path AS banner_path", 
                                        "cms.parent_idx AS parent_idx", 
                                        "cms.child_order AS child_order", 
                                        "cms.credit_by AS credit_by", 
                                        "cms.record_status AS record_status", 
                                        "cms.create_date AS create_date", 
                                        "cms.start_date AS start_date", 
                                        "cms.end_date AS end_date", 
                                        "cms.event_date AS event_date", 
                                        "cms.create_user_id AS create_user_id", 
                                        "cms.update_date AS update_date", 
                                        "cms.update_user_id AS update_user_id", 
                                        "cms.approve_user_id AS approve_user_id", 
                                        "cms.seo_keywords AS seo_keywords", 
                                        "cms.seo_description AS seo_description", 
                                        "cms.hashtag AS hashtag", 
                                        "cms.view_count AS view_count", 
                                        "cms.editor_picks AS editor_picks", 
                                        "cms.encyclopedia AS encyclopedia", 
                                        "cms.adminLock AS adminLock", 
                                        "cms.isKnowledge AS isKnowledge", 
                                        "cms.stay_time_sec AS stay_time_sec", 
                                        "cat.category_parent_id AS category_parent_id",
                                        "cat.category_id AS category_id",
                                        "cat.category_parent_id AS category_parent_id",
                                        "cat.category_name_th AS category_name_th",   
                                        "cat.category_name_en AS category_name_en",  
                                        "cat.zone_id AS zone_id",  
                                        "map.content_type AS content_type",
                                        "u.user_id AS user_id",  
                                        "u.uid AS uid",  
                                        "u.psn_display_name AS psn_display_name",  
                                        "u.psn_firstname AS firstname",  
                                        "u.psn_lastname AS lastname", 
                                        "u.psn_display_image AS psn_display_image", 
                                        "CONCAT(psn_firstname,' ',u.psn_lastname) AS user_fullname",
                                    
                                        "CONCAT('https://static.trueplookpanya.com/',cms.thumb_path) AS thumbnail",
                                        "CONCAT('https://static.trueplookpanya.com/',cms.banner_path) AS banner",
                                    ]); 
                                // https://static.trueplookpanya.com/cmsblog/241/56241/banner_file.jpg
                                query.innerJoin(
                                    "cmsblog_category_mapping",
                                    "map",
                                    "map.content_id = cms.idx and map.content_type=2"
                                ); 
                                query.innerJoin(
                                    "cmsblog_category",
                                    "cat",
                                    "cat.category_id = map.category_id"
                                );  
                                query.innerJoin(
                                    "users_accounts",
                                    "u",
                                    "u.user_id = cms.create_user_id"
                                );  
                     
                    query.where('1=1');       
                    query.andWhere("cms.idx= :idx", { idx });
                    if (record_status!=null) { 
                        query.andWhere("cms.record_status= :record_status", { record_status }); 
                    } else { 
                        query.andWhere("cms.record_status= 1");
                    }  
                    query.groupBy("cms.idx")
                    query.orderBy("cms.idx", "DESC")  
                    query.printSql()
                    query.maxExecutionTime(1000) // milliseconds.
                    console.log(`CmsblogDetails.repository  query-> `,query);
                return await query.getRawMany(); 
                // return await query.getRawOne(); 
    }  

    async getDetails(filter: any) {  
              
                        const idx= filter.idx;  
                        const category_id = filter.category_id;
                        const record_status= filter.record_status || null;                          
                        console.log(`getDetail filter `, filter); 
                        //return
                        const query = this.createQueryBuilder('cms');
                        query.distinctOn(["cms.idx AS idx"]);  
                        query.select([
                                        "cms.idx AS idx", 
                                        "cms.title AS title", 
                                        "cms.description_short AS description_short",  
                                        "cms.description_long AS description_long", 
                                        "cms.thumb_path AS thumb_path", 
                                        "cms.banner_path AS banner_path", 
                                        "cms.parent_idx AS parent_idx", 
                                        "cms.child_order AS child_order", 
                                        "cms.credit_by AS credit_by", 
                                        "cms.record_status AS record_status", 
                                        "cms.create_date AS create_date", 
                                        "cms.start_date AS start_date", 
                                        "cms.end_date AS end_date", 
                                        "cms.event_date AS event_date", 
                                        "cms.create_user_id AS create_user_id", 
                                        "cms.update_date AS update_date", 
                                        "cms.update_user_id AS update_user_id", 
                                        "cms.approve_user_id AS approve_user_id", 
                                        "cms.seo_keywords AS seo_keywords", 
                                        "cms.seo_description AS seo_description", 
                                        "cms.hashtag AS hashtag", 
                                        "cms.view_count AS view_count", 
                                        "cms.editor_picks AS editor_picks", 
                                        "cms.encyclopedia AS encyclopedia", 
                                        "cms.adminLock AS adminLock", 
                                        "cms.isKnowledge AS isKnowledge", 
                                        "cms.stay_time_sec AS stay_time_sec", 
                                        "cat.category_parent_id AS category_parent_id",
                                        "cat.category_id AS category_id",
                                        "cat.category_parent_id AS category_parent_id",
                                        "cat.category_name_th AS category_name_th",   
                                        "cat.category_name_en AS category_name_en",  
                                        "cat.zone_id AS zone_id",  
                                        "map.content_type AS content_type",
                                        "u.user_id AS user_id",  
                                        "u.uid AS uid",  
                                        "u.psn_display_name AS psn_display_name",  
                                        "u.psn_firstname AS firstname",  
                                        "u.psn_lastname AS lastname", 
                                        "u.psn_display_image AS psn_display_image", 
                                        "CONCAT(psn_firstname,' ',u.psn_lastname) AS user_fullname",
                                    
                                        "CONCAT('https://static.trueplookpanya.com/',cms.thumb_path) AS thumbnail",
                                        "CONCAT('https://static.trueplookpanya.com/',cms.banner_path) AS banner",
                                    ]); 
                                // https://static.trueplookpanya.com/cmsblog/241/56241/banner_file.jpg
                                query.innerJoin(
                                    "cmsblog_category_mapping",
                                    "map",
                                    "map.content_id = cms.idx and map.content_type=2"
                                ); 
                                query.innerJoin(
                                    "cmsblog_category",
                                    "cat",
                                    "cat.category_id = map.category_id"
                                );  
                                query.innerJoin(
                                    "users_accounts",
                                    "u",
                                    "u.user_id = cms.create_user_id"
                                );  
                     
                    query.where('1=1');       
                    query.andWhere("cms.idx= :idx", { idx });
                    if (record_status!=null) { 
                        query.andWhere("cms.record_status= :record_status", { record_status }); 
                    } else { 
                        query.andWhere("cms.record_status= 1");
                    }  
                    query.groupBy("cms.idx")
                    query.orderBy("cms.idx", "DESC")  
                    query.printSql()
                    query.maxExecutionTime(1000) // milliseconds.
                    console.log(`CmsblogDetails.repository  query-> `,query);
                return await query.getRawMany(); 
                // return await query.getRawOne(); 
    } 
} 

/*

{
    "og:app_id": "889828308363702",
    "og:title": "15 ไอเดียผมเฉดสีม่วง สดใสเจิดจ้า จนถึงลึกลับน่าค้นหา",
    "og:type": "article",
    "og:locale": "th_TH",
    "og:url": "https://www.trueplookpanya.com/blog/content/65701",
    "og:image": "https://static.trueplookpanya.com/cmsblog/1701/65701/thumb_file.jpg",
    "og:site_name": "trueplookpanya.com",
    "og:description": "สีม่วงเป็นสีที่มาแรงในเทรนด์แฟชั่นปีนี้ ทั้งเสื้อผ้า การแต่งหน้าไม่เว้นแม่แต่สีผม ที่ปีนี้เหล่าช่างทำผมมืออาชีพต่างการันตีีว่าปี 2018 เทรนด์ผมสีม่วงจะกลับมาฮ็อตฮิต ปังเวอร์แน่นอน! ว่าแต่สีม่วงเองก็มีห ..."
}

category_list

files
relate_by_menu


*/
//  https://www.trueplookpanya.com/blog/content/65701?debug=json
// og
// category_list
// category_show 
// relate_content
/*

relate_by_content
relate_by_menu
category_list
checkValidContent_data
zones

{
    "1": "Plook Knowledge",
    "10": "Plook ธรรมะ",
    "20": "Education",
    "30": "Plook ครู",
    "40": "Plook friend",
    "50": "Plook blog",
    "60": "Plook Admissions",
    "70": "PPPConnextED",
    "80": "TrueClickLife",
    "90": "TruePlookpanya",
    "100": "tcas",
    "101": "Meiji Tensai",
    "102": "Explorer"
}
zone_id

cmsblog_category_mapping
cmsblog_category

knowledge_context_2014
cmsblog_details_context_2014_map
cmsblog_details

editor_picks

knowledge_context_2014_map
mul_source

mul_content

select
					lt.id as labelTag_id
					,lt.label_name as labelTag_name
					,lt.label_key as labelTag_key
					,tc.meaning as labelTag_Group
					,ltm.idx as map_id
					,ltm.project_id as map_project_id
					,ltm.content_id as map_content_id
					,ltm.addDateTime as map_dateTime
					from label_tag_map ltm
					inner join label_tag lt on ltm.label_tag_id=lt.id
					inner join tb_code tc on tc.tableName='LABEL_TAG' and tc.fieldName='LABEL_KEY' and lt.label_key=tc.fieldValue
					where ltm.project_id=$project_id and ltm.content_id=$content_id 
					" . $criteria . "
					order by lt.label_key


*/
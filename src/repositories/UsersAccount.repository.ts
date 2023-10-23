import { EntityRepository, Repository } from "typeorm";
import { UsersAccount } from "../entities/UsersAccount.entity";
@EntityRepository(UsersAccount)
export class UsersAccountRepository extends Repository<UsersAccount>{
    getWhereALL(filter: any) {
        const user_id= filter.user_id;
        const keyword = filter.keyword; 
        const member_id= filter.member_id;
        const user_email= filter.user_email;  
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
        const query = this.createQueryBuilder('u');
                // select
                if(isCount==1){
                    query.select([
                            "u.user_id AS user_id", 
                            ]); 
                } else {
                    // select
                    query.select([
                            "u.*",  
                            ]); 
                } 
                query.where('1=1'); 
                if (user_id!=null) { 
                    query.andWhere("u.user_id= :user_id", { user_id }); 
                } 
                if (user_email!=null) { 
                    query.andWhere("u.user_email= :user_email", { user_email }); 
                }  
                if (start!=null && end!=null) { 
                    query.andWhere("u.user_user_user_create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("u.user_update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                if (keyword!=null) { 
                    query.andWhere("u.psn_display_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                } 
                if(isCount==1){ 
                    query.groupBy("u.user_id")
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    query.groupBy("u.user_id")
                }
                if (order=='desc') {
                    query.orderBy("u.user_id", "DESC") 
                } else{
                    query.groupBy("u.user_id")
                    query.orderBy("u.user_id", "ASC") 
                }  
                console.log(`UsersAccount  query-> `,query);
            return query.getRawMany(); 
    }
    getWhereRs(filter: any) {
        const user_id= filter.user_id;
       // const keyword = filter.keyword; 
        const member_id= filter.member_id;
        const user_email= filter.user_email;  
        const start= filter.start;
        const end= filter.end; 
        const order= filter.order;
        const page= filter.pages;
        const size = filter.sizepsge;
        const isCount = filter.isCount;
        console.log(`user_id`, user_id); 
        console.log(`isCount `, isCount);  
        console.log(`filter `, filter);  
        const query = this.createQueryBuilder('u');
                // select
                if(isCount==1){
                    query.select([
                            "u.user_id AS user_id", 
                            ]); 
                } else {
                    // select
                    query.select([ 
                                "u.user_id  AS user_id", 
                                "u.member_id  AS member_id", 
                                "u.user_username  AS user_username", 
                                "u.user_password  AS user_password", 
                                "u.user_password_tmp  AS user_password_tmp", 
                                "u.user_email  AS user_email", 
                                "u.user_status  AS user_status", 
                                "u.user_group  AS user_group", 
                                "u.user_permission  AS user_permission", 
                                "u.user_create_date   AS user_create_date ", 
                                "u.user_create_ip  AS user_create_ip", 
                                "u.user_active_date  AS user_active_date", 
                                "u.user_update_date  AS user_update_date", 
                                "u.user_login_date  AS user_login_date", 
                                "u.user_question  AS user_question", 
                                "u.user_answer  AS user_answer", 
                                "u.psn_display_name  AS psn_display_name", 
                                "u.psn_display_image  AS psn_display_image", 
                                "u.psn_display_banner  AS psn_display_banner", 
                                "u.psn_firstname  AS psn_firstname", 
                                "u.psn_lastname  AS psn_lastname", 
                                "u.psn_sex  AS psn_sex", 
                                "u.psn_address  AS psn_address", 
                                "u.psn_postcode  AS psn_postcode", 
                                "u.psn_province  AS psn_province", 
                                "u.psn_tel  AS psn_tel", 
                                "u.psn_id_number  AS psn_id_number", 
                                "u.psn_birthdate  AS psn_birthdate", 
                                "u.psn_public_status  AS psn_public_status", 
                                "u.job_name  AS job_name", 
                                "u.job_address  AS job_address", 
                                "u.job_edu_name  AS job_edu_name", 
                                "u.job_edu_level  AS job_edu_level", 
                                "u.job_edu_degree  AS job_edu_degree", 
                                "u.acc_user_facebook  AS acc_user_facebook", 
                                "u.acc_user_google  AS acc_user_google", 
                                "u.acc_user_twitter  AS acc_user_twitter", 
                                "u.acc_user_tvw  AS acc_user_tvw", 
                                "u.acc_user_tvw_nid  AS acc_user_tvw_nid", 
                                "u.introduce  AS introduce", 
                                "u.privacy_policy_status  AS privacy_policy_status", 
                                "u.curator_child_email  AS curator_child_email", 
                                "u.salutation  AS salutation", 
                                "u.school_id  AS school_id", 
                                "u.class  AS class", 
                                "u.class_room  AS class_room", 
                                "u.district_id  AS district_id", 
                                "u.amphur_id  AS amphur_id", 
                                "u.province_id  AS province_id", 
                                "u.geo_id  AS geo_id", 
                                "u.idx  AS idx", 
                                "u.apple_id  AS apple_id", 
                                "u.appuserid  AS appuserid", 
                                "u.uid  AS uid",  
                            ]); 
                } 
                query.where('1=1'); 
               // query.andWhere("u.user_status!=2"); 
                if (user_id!=null) { 
                    query.andWhere("u.user_id= :user_id", { user_id }); 
                } 
                if (user_email!=null) { 
                    query.andWhere("u.user_email= :user_email", { user_email }); 
                }  
                if (start!=null && end!=null) { 
                    query.andWhere("u.user_user_user_create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("u.user_update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                /*
                if (keyword!=null) { 
                    query.andWhere("u.psn_display_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                } 
                */
                
                if(isCount==1){ 
                    //query.groupBy("u.user_id")
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    //query.groupBy("u.user_id")
                }
                if (order=='desc') {
                    query.orderBy("u.user_id", "DESC") 
                } else{
                    //query.groupBy("u.user_id")
                    query.orderBy("u.user_id", "ASC") 
                }  
                console.log(`UsersAccount  query-> `,query);
            return query.getRawMany(); 
    }
    getWhereRsOne(filter: any) {
        const user_id= filter.user_id;
       // const keyword = filter.keyword; 
        const member_id= filter.member_id;
        const user_email= filter.user_email;  
        const start= filter.start;
        const end= filter.end; 
        const order= filter.order;
        const page= filter.pages;
        const size = filter.sizepsge;
        const isCount = filter.isCount;
        if (isCount == 0) {
            console.log(`rows filter `, filter); 
            //console.log(`data keyword `, keyword);
            console.log(`rows isCount `, isCount); 
        } else {
            console.log(`data filter `, filter); 
            //console.log(`data keyword `, keyword);
            console.log(`data isCount `, isCount); 
        }
        const query = this.createQueryBuilder('u');
                // select
                if(isCount==1){
                    query.select([
                            "u.user_id AS user_id", 
                            ]); 
                } else {
                    // select
                    query.select([ 
                                "u.user_id  AS user_id", 
                                "u.member_id  AS member_id", 
                                "u.user_username  AS user_username", 
                                "u.user_password  AS user_password", 
                                "u.user_password_tmp  AS user_password_tmp", 
                                "u.user_email  AS user_email", 
                                "u.user_status  AS user_status", 
                                "u.user_group  AS user_group", 
                                "u.user_permission  AS user_permission", 
                                "u.user_create_date   AS user_create_date ", 
                                "u.user_create_ip  AS user_create_ip", 
                                "u.user_active_date  AS user_active_date", 
                                "u.user_update_date  AS user_update_date", 
                                "u.user_login_date  AS user_login_date", 
                                "u.user_question  AS user_question", 
                                "u.user_answer  AS user_answer", 
                                "u.psn_display_name  AS psn_display_name", 
                                "u.psn_display_image  AS psn_display_image", 
                                "u.psn_display_banner  AS psn_display_banner", 
                                "u.psn_firstname  AS psn_firstname", 
                                "u.psn_lastname  AS psn_lastname", 
                                "u.psn_sex  AS psn_sex", 
                                "u.psn_address  AS psn_address", 
                                "u.psn_postcode  AS psn_postcode", 
                                "u.psn_province  AS psn_province", 
                                "u.psn_tel  AS psn_tel", 
                                "u.psn_id_number  AS psn_id_number", 
                                "u.psn_birthdate  AS psn_birthdate", 
                                "u.psn_public_status  AS psn_public_status", 
                                "u.job_name  AS job_name", 
                                "u.job_address  AS job_address", 
                                "u.job_edu_name  AS job_edu_name", 
                                "u.job_edu_level  AS job_edu_level", 
                                "u.job_edu_degree  AS job_edu_degree", 
                                "u.acc_user_facebook  AS acc_user_facebook", 
                                "u.acc_user_google  AS acc_user_google", 
                                "u.acc_user_twitter  AS acc_user_twitter", 
                                "u.acc_user_tvw  AS acc_user_tvw", 
                                "u.acc_user_tvw_nid  AS acc_user_tvw_nid", 
                                "u.introduce  AS introduce", 
                                "u.privacy_policy_status  AS privacy_policy_status", 
                                "u.curator_child_email  AS curator_child_email", 
                                "u.salutation  AS salutation", 
                                "u.school_id  AS school_id", 
                                "u.class  AS class", 
                                "u.class_room  AS class_room", 
                                "u.district_id  AS district_id", 
                                "u.amphur_id  AS amphur_id", 
                                "u.province_id  AS province_id", 
                                "u.geo_id  AS geo_id", 
                                "u.idx  AS idx", 
                                "u.apple_id  AS apple_id", 
                                "u.appuserid  AS appuserid", 
                                "u.uid  AS uid",  
                            ]); 
                } 
                query.where('1=1'); 
                if (user_id!=null) { 
                    query.andWhere("u.user_id= :user_id", { user_id }); 
                } 
                if (user_email!=null) { 
                    query.andWhere("u.user_email= :user_email", { user_email }); 
                }  
                if (start!=null && end!=null) { 
                    query.andWhere("u.user_user_user_create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("u.user_update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                /*
                if (keyword!=null) { 
                    query.andWhere("u.psn_display_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                } 
                */
                
                if(isCount==1){ 
                    //query.groupBy("u.user_id")
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    //query.groupBy("u.user_id")
                }
                if (order=='desc') {
                    query.orderBy("u.user_id", "DESC") 
                } else{
                    //query.groupBy("u.user_id")
                    query.orderBy("u.user_id", "ASC") 
                }  
                console.log(`UsersAccount  query-> `,query);
            return query.getRawOne(); 
    }
    getWhereChk(filter: any) {
        const user_id= filter.user_id;  
        const member_id= filter.member_id; 
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('u');
                query.select(["u.*",]); 
                query.where('1=1');                
                query.andWhere("u.user_id= :user_id", { user_id });  
                if(member_id!=null){                    
                    query.andWhere("u.member_id= :member_id", { member_id }); 
                }
               // query.groupBy("u.user_id")
               // query.orderBy("u.user_id", "ASC") 
                console.log(`UsersAccount  query-> `,query);
        return query.getRawMany(); 
    }
    insertData(input: any) {
        console.warn(`user_id=> `, input.user_id); 
        console.warn(`users_account_delete_temp input=> `, input); 
        return this.createQueryBuilder("users_account_delete_temp")
            .insert()
            .into("users_account_delete_temp")
            .values(input)
            .execute();
    }
    updateData(input: any) {
        const user_id= input.user_id;  
        const user_update_date = input.user_update_date;   
        const idx= user_id;   
        const values ={  
                        user_update_date: user_update_date,
                        idx: idx,
          }
        console.log(`Result_update values `,values);  
        console.log(`Result_update user_id `,user_id);  
        return this.createQueryBuilder("users_account")
                    .update("users_account")
                    .set(values)
                    .where("user_id = :user_id", { user_id})
                    .execute()
                    
    } 
    deleteData(input: any) {
        console.log(`Result_update user_id `, input);  
        const user_id = input.user_id;  
        if (user_id == '543622') {
            console.log(`Result_update user_id `, user_id);  
        } else {
            console.log(`Result_update user_id `, user_id);   
            return  this.createQueryBuilder("users_account")
                        .delete()
                        .from("users_account")
                        .where("user_id = :user_id", { user_id })
                        .execute()
        }
         
    }
    /************************/ 
} 
/************************/
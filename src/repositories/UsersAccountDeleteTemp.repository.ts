import { EntityRepository, Repository } from "typeorm";
import { UsersAccountDeleteTemp } from "../entities/UsersAccountDeleteTemp.entity";
@EntityRepository(UsersAccountDeleteTemp)
export class UsersAccountDeleteTempRepository extends Repository<UsersAccountDeleteTemp>{
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
        const query = this.createQueryBuilder('tmp');
                // select
                if(isCount==1){
                    query.select([
                            "tmp.user_id AS user_id", 
                            ]); 
                } else {
                    // select
                    query.select([
                            "tmp.*",  
                            ]); 
                } 
                query.where('1=1'); 
                if (user_id!=null) { 
                    query.andWhere("tmp.user_id= :user_id", { user_id }); 
                } 
                if (user_email!=null) { 
                    query.andWhere("tmp.user_email= :user_email", { user_email }); 
                }  
                if (start!=null && end!=null) { 
                    query.andWhere("tmp.user_user_user_create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("tmp.user_update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                if (keyword!=null) { 
                    query.andWhere("tmp.psn_display_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                } 
                if(isCount==1){ 
                    query.groupBy("tmp.user_id")
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    query.groupBy("tmp.user_id")
                }
                if (order=='desc') {
                    query.orderBy("tmp.user_id", "DESC") 
                } else{
                    query.groupBy("tmp.user_id")
                    query.orderBy("tmp.user_id", "ASC") 
                }  
                console.log(`UsersAccount  query-> `,query);
            return query.getRawMany(); 
    }
    getWhereRs(filter: any) {
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
        const query = this.createQueryBuilder('tmp');
                // select
                if(isCount==1){
                    query.select([
                            "tmp.user_id AS user_id", 
                            ]); 
                } else {
                    // select
                    query.select([ 
                                "tmp.user_id  AS user_id", 
                                "tmp.member_id  AS member_id", 
                                "tmp.user_username  AS user_username", 
                                "tmp.user_password  AS user_password", 
                                "tmp.user_password_tmp  AS user_password_tmp", 
                                "tmp.user_email  AS user_email", 
                                "tmp.user_status  AS user_status", 
                                "tmp.user_group  AS user_group", 
                                "tmp.user_permission  AS user_permission", 
                                "tmp.user_create_date   AS user_create_date ", 
                                "tmp.user_create_ip  AS user_create_ip", 
                                "tmp.user_active_date  AS user_active_date", 
                                "tmp.user_update_date  AS user_update_date", 
                                "tmp.user_login_date  AS user_login_date", 
                                "tmp.user_question  AS user_question", 
                                "tmp.user_answer  AS user_answer", 
                                "tmp.psn_display_name  AS psn_display_name", 
                                "tmp.psn_display_image  AS psn_display_image", 
                                "tmp.psn_display_banner  AS psn_display_banner", 
                                "tmp.psn_firstname  AS psn_firstname", 
                                "tmp.psn_lastname  AS psn_lastname", 
                                "tmp.psn_sex  AS psn_sex", 
                                "tmp.psn_address  AS psn_address", 
                                "tmp.psn_postcode  AS psn_postcode", 
                                "tmp.psn_province  AS psn_province", 
                                "tmp.psn_tel  AS psn_tel", 
                                "tmp.psn_id_number  AS psn_id_number", 
                                "tmp.psn_birthdate  AS psn_birthdate", 
                                "tmp.psn_public_status  AS psn_public_status", 
                                "tmp.job_name  AS job_name", 
                                "tmp.job_address  AS job_address", 
                                "tmp.job_edu_name  AS job_edu_name", 
                                "tmp.job_edu_level  AS job_edu_level", 
                                "tmp.job_edu_degree  AS job_edu_degree", 
                                "tmp.acc_user_facebook  AS acc_user_facebook", 
                                "tmp.acc_user_google  AS acc_user_google", 
                                "tmp.acc_user_twitter  AS acc_user_twitter", 
                                "tmp.acc_user_tvw  AS acc_user_tvw", 
                                "tmp.acc_user_tvw_nid  AS acc_user_tvw_nid", 
                                "tmp.introduce  AS introduce", 
                                "tmp.privacy_policy_status  AS privacy_policy_status", 
                                "tmp.curator_child_email  AS curator_child_email", 
                                "tmp.salutation  AS salutation", 
                                "tmp.school_id  AS school_id", 
                                "tmp.class  AS class", 
                                "tmp.class_room  AS class_room", 
                                "tmp.district_id  AS district_id", 
                                "tmp.amphur_id  AS amphur_id", 
                                "tmp.province_id  AS province_id", 
                                "tmp.geo_id  AS geo_id", 
                                "tmp.idx  AS idx", 
                                "tmp.apple_id  AS apple_id", 
                                "tmp.appuserid  AS appuserid", 
                                "tmp.delete_date  AS delete_date", 
                                "tmp.uid  AS uid",  
                            ]); 
                } 
                query.where('1=1');                
                if (user_id!=null) { 
                    query.andWhere("tmp.user_id= :user_id", { user_id }); 
                } 
                if (user_email!=null) { 
                    query.andWhere("tmp.user_email= :user_email", { user_email }); 
                }  
                if (start!=null && end!=null) { 
                    query.andWhere("tmp.user_user_user_create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("tmp.user_update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                if (keyword!=null) { 
                    query.andWhere("tmp.psn_display_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                } 
                if(isCount==1){ 
                    query.groupBy("tmp.user_id")
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    query.groupBy("tmp.user_id")
                }
                if (order=='desc') {
                    query.orderBy("tmp.user_id", "DESC") 
                } else{
                    query.groupBy("tmp.user_id")
                    query.orderBy("tmp.user_id", "ASC") 
                }  
                console.log(`UsersAccount  query-> `,query);
            return query.getRawMany(); 
    }
    getWhereChk(filter: any) {
        const user_id= filter.user_id;  
        const member_id= filter.member_id; 
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('tmp');
                query.select(["tmp.*",]); 
                query.where('1=1');                
                query.andWhere("tmp.user_id= :user_id", { user_id });  
                if(member_id!=null){                    
                    query.andWhere("tmp.member_id= :member_id", { member_id }); 
                }
               // query.groupBy("tmp.user_id")
               // query.orderBy("tmp.user_id", "ASC") 
                console.log(`UsersAccount  query-> `,query);
        return query.getRawMany(); 
    }
    insertData(input: any) {
        /*
            const user_id = input.user_id;
            const member_id=input.member_id;
            const user_username=input.user_username;
            const user_password=input.user_password;
            const user_password_tmp=input.user_password_tmp;
            const user_email=input.user_email;
            const user_status=input.user_status;
            const user_group=input.user_group;
            const user_permission=input.user_permission;
            const user_create_date =input.user_create_date;
            const user_create_ip=input.user_create_ip;
            const user_active_date=input.user_active_date;
            const user_update_date=input.user_update_date;
            const user_login_date=input.user_login_date;
            const user_question=input.user_question;
            const user_answer=input.user_answer;
            const psn_display_name=input.psn_display_name;
            const psn_display_image=input.psn_display_image;
            const psn_display_banner=input.psn_display_banner;
            const psn_firstname=input.psn_firstname;
            const psn_lastname=input.psn_lastname;
            const psn_sex=input.psn_sex;
            const psn_address=input.psn_address;
            const psn_postcode=input.psn_postcode;
            const psn_province=input.psn_province;
            const psn_tel=input.psn_tel;
            const psn_id_number=input.psn_id_number;
            const psn_birthdate=input.psn_birthdate;
            const psn_public_status=input.psn_public_status;
            const job_name=input.job_name;
            const job_address=input.job_address;
            const job_edu_name=input.job_edu_name;
            const job_edu_level=input.job_edu_level;
            const job_edu_degree=input.job_edu_degree;
            const acc_user_facebook=input.acc_user_facebook;
            const acc_user_google=input.acc_user_google;
            const acc_user_twitter=input.acc_user_twitter;
            const acc_user_tvw=input.acc_user_tvw;
            const acc_user_tvw_nid=input.acc_user_tvw_nid;
            const introduce=input.introduce;
            const privacy_policy_status=input.privacy_policy_status;
            const curator_child_email=input.curator_child_email;
            const salutation=input.salutation;
            const school_id=input.school_id;
            const class_var=input.class;
            const class_room=input.class_room;
            const district_id=input.district_id;
            const amphur_id=input.amphur_id;
            const province_id=input.province_id;
            const geo_id=input.geo_id;
            const idx=input.idx;
            const apple_id=input.apple_id;
            const appuserid=input.appuserid;
            const delete_date=input.appuserid;
            const uid=input.uid;
            const values ={ 
                        user_id : user_id,
                        member_id: member_id,
                        user_username: user_username,
                        user_password: user_password,
                        user_password_tmp: user_password_tmp,
                        user_email: user_email,
                        user_StatusCode: user_status,
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
                        psn_public_StatusCode: psn_public_status,
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
                        privacy_policy_StatusCode: privacy_policy_status,
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
                        delete_date: delete_date,
                        uid: uid,
            } 
        */
            console.log('users_account_delete_temp ',input);  
        return this.createQueryBuilder("users_account_delete_temp")
            .insert()
            .into("users_account_delete_temp")
            .values(input)
            .execute();
    }
    updateData(input: any) {
        const user_id= input.user_id;  
        const user_update_date = input.user_update_date;   
        const user_status= input.user_status;   
        const values ={  
                        user_update_date: user_update_date,
                        user_StatusCode: user_status,
          }
        console.log(`Result_update values `,values);  
        console.log(`Result_update user_id `,user_id);  
        return this.createQueryBuilder("users_account_delete_temp")
                    .update("users_account_delete_temp")
                    .set(values)
                    .where("user_id = :user_id", { user_id})
                    .execute()
                    
    }  
    /************************/ 
} 
import { EntityRepository, Repository } from "typeorm";
import { CrsMyWislish } from "../entities/CrsMyWislish.entity";
import { MulLevel } from "../entities/MulLevel.entity";
import { CrsCategory } from "../entities/CrsCategory.entity";
import { CrsCourse } from "../entities/CrsCourse.entity";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";
import { MulCategories } from "../entities/MulCategories.entity";
import { UsersAccount } from "../entities/UsersAccount.entity";
@EntityRepository(CrsMyWislish)
export class CrsMyWislishRepository extends Repository<CrsMyWislish>{
    getWhereRs(filter: any) {  
            const user_id= filter.user_id;
            const course_id= filter.course_id;
            const keyword = filter.keyword; 
            const category_id= filter.category_id;
            const subject_id= filter.subject_id; 
            const subject_parent_id= filter.subject_parent_id;
            const mul_level_id= filter.level_id;
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
            const query = this.createQueryBuilder('w');
                    // select
                    if(isCount==1){
                        query.select([
                                 "w.wislish_id AS wislish_id",
                                ]);
                        query.innerJoin(
                            "crs_course",
                            "co",
                            "co.course_id = w.course_id"
                        );
                        query.leftJoin(
                            "users_account",
                            "u",
                            "u.user_id = w.user_id"
                        );
                        query.leftJoin(
                            "crs_category",
                            "cate",
                            "cate.category_id = co.category_id"
                        );
                        query.leftJoin(
                            "mul_level",
                            "l",
                            "l.mul_level_id = co.class_level"
                        );
                        query.leftJoin(
                            "mul_category_2017",
                            "sb",
                            "sb.mul_category_id = co.subject_id"
                        );
                        query.leftJoin(
                            "mul_category_2017",
                            "psb",
                            "psb.mul_category_id = co.subject_parent_id"
                        );
                    } else {
                        // select
                        query.select([
                                "w.wislish_id AS wislish_id",
                                "w.user_id AS user_id", 
                                "w.course_id AS course_id", 
                                "w.status AS status", 
                                "w.create_date AS create_date", 
                                "w.update_date AS update_date", 
                                "cate.category_id as category_id",
                                "cate.category_name as category", 
                                "co.class_level as level_id",  
                                "l.mul_level_name AS level_name",
                                "sb.mul_category_name AS subject_name",
                                "psb.mul_category_name AS parent_subject_name", 
                                "co.category_id as category_id",  
                                "co.subject_id as subject_id",  
                                "co.subject_parent_id as subject_parent_id",  
                                "co.course_name AS course_name", 
                                "CONCAT('https://static.trueplookpanya.com/',co.file_path,'',co.image_cover) AS course_thumbnail",
                                "CONCAT('https://static.trueplookpanya.com/',cate.file_path,'',cate.image_cover) AS category_thumbnail",
                                "u.psn_display_name AS display_name",  
                                "u.psn_firstname as firstname",  
                                "u.psn_lastname as lastname",  
                                ]);
                        query.innerJoin(
                            "crs_course",
                            "co",
                            "co.course_id = w.course_id"
                        );
                        query.leftJoin(
                            "users_account",
                            "u",
                            "u.user_id = w.user_id"
                        );
                        query.leftJoin(
                            "crs_category",
                            "cate",
                            "cate.category_id = co.category_id"
                        );
                        query.leftJoin(
                            "mul_level",
                            "l",
                            "l.mul_level_id = co.class_level"
                        );
                        query.leftJoin(
                            "mul_category_2017",
                            "sb",
                            "sb.mul_category_id = co.subject_id"
                        );
                        query.leftJoin(
                            "mul_category_2017",
                            "psb",
                            "psb.mul_category_id = co.subject_parent_id"
                        );
                    } 
                    query.where('1=1');
                    query.andWhere("w.user_id= :user_id", { user_id }); 
                    if (course_id!=null) { 
                        query.andWhere("co.course_id= :course_id", { course_id }); 
                    } 
                    if (subject_id!=null) { 
                        query.andWhere("co.subject_id= :subject_id", { subject_id }); 
                    } 
                    if (subject_parent_id!=null) { 
                        query.andWhere("co.subject_parent_id= :subject_parent_id", { subject_parent_id }); 
                    } 
                    if (category_id!=null) { 
                        query.andWhere("co.category_id= :category_id", { category_id }); 
                    } 
                    if (mul_level_id!=null) { 
                        query.andWhere("l.mul_level_id= :mul_level_id", { mul_level_id }); 
                    }  
                    if (keyword!=null) { 
                        query.andWhere("co.course_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                    } 
                    query.andWhere("w.status = 1")
                    query.andWhere("co.is_enable = 1")
                    query.andWhere("co.is_delete = 0")
                    if (start!=null && end!=null) { 
                        query.andWhere("w.create_date  BETWEEN '" + start + "' AND '" + end + "'");
                        //query.andWhere("w.update_date  BETWEEN '" +start+"' AND '" +end+"'");
                    } 
                    if(isCount==1){ 
                        query.groupBy("w.wislish_id")
                    }else{  
                        query.limit(size);
                        query.offset(size * (page - 1));
                        query.groupBy("w.wislish_id")
                    }
                    if (order=='desc') {
                        query.orderBy("w.wislish_id", "DESC") 
                    } else{
                        query.groupBy("w.wislish_id")
                        query.orderBy("w.wislish_id", "ASC")  
                    }  
                    console.log(`CrsMyWislish.repository  query-> `,query);
                return query.getRawMany(); 
    }   
    getWhereChk(filter: any) {
        const course_id = filter.course_id; 
        const user_id= filter.user_id; 
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('mc');
                query.select(["mc.wislish_id AS wislish_id",]);                 
                query.where("mc.course_id= :course_id", { course_id }); 
                query.andWhere("mc.user_id= :user_id", { user_id }); 
                query.groupBy("mc.wislish_id")
                query.orderBy("mc.wislish_id", "ASC") 
                console.log(`query-> `,query);
        return query.getRawMany(); 
    }
    insertData(input: any) {
        const user_id= input.user_id;  
        const course_id= input.course_id; 
        const create_date= input.create_date; 
        const update_date = input.update_date; 
        const status = input.status;    
        return this.createQueryBuilder()
        .insert()
        .into("crs_my_wislish")
        .values({
                    user_id: user_id, 
                    course_id: course_id,
                    create_date: create_date,
                    update_date: update_date,
                    status: status,
                })
        .execute();
    }
    updateData(input: any) {
        const user_id= input.user_id;  
        const course_id= input.course_id; 
        const create_date= input.create_date; 
        const update_date= input.update_date;
        const status = input.status;    
        const values ={ 
                        update_date: update_date, 
                        status: status,
                      }    
        return this.createQueryBuilder("crs_my_wislish")
                    .update("crs_my_wislish")
                    .set(values)  
                    .andWhere("course_id = :course_id", { course_id})
                    .execute()
    }
    updateDatastatus(input: any) {
        const user_id= input.user_id;  
        const course_id= input.course_id; 
        const create_date= input.create_date; 
        const update_date= input.update_date;
        const status : number = input.status;    
        const values ={  status: status, }  
        console.warn(`input `,input);
        console.warn(`values `, values);
        // UPDATE crs_my_wislish SET  status = '0' WHERE user_id = 543622 AND course_id=1 
        return this.createQueryBuilder("crs_my_wislish")
                    .update("crs_my_wislish")
                    .set(values) 
                    .where("user_id = :user_id", { user_id}) 
                    .andWhere("course_id = :course_id", { course_id})
                    .execute()
    } 
    deleteData(input: any) {
        const user_id= input.user_id;  
        const course_id= input.course_id; 
        return  this.createQueryBuilder("crs_my_wislish")
                    .delete()
                    .from("crs_my_wislish") 
                    .where("user_id = :user_id", { user_id}) 
                    .andWhere("course_id = :course_id", { course_id})
                    .execute()
    }
} 
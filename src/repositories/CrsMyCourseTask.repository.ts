import { EntityRepository, Repository } from "typeorm";
import { CrsMyCourse } from "../entities/CrsMyCourse.entity";
import { MulLevel } from "../entities/MulLevel.entity";
import { CrsCategory } from "../entities/CrsCategory.entity";
import { CrsCourse } from "../entities/CrsCourse.entity";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";
import { UsersAccount } from "../entities/UsersAccount.entity";
import { CrsMyCourseTask } from "../entities/CrsMyCourseTask.entity";
// table crs_course_task 
@EntityRepository(CrsMyCourseTask)
export class CrsMyCourseTaskRepository extends Repository<CrsMyCourseTask>{
    getWhereRs(filter: any) {
        const course_id = filter.course_id;
        const task_id = filter.task_id;
        const user_id= filter.user_id; 
        const keyword = filter.keyword; 
        const category_id = filter.category_id;
        const task_learning_status= filter.task_learning_status; 
        const subject_id= filter.subject_id; 
        const subject_parent_id= filter.subject_parent_id;
        const mul_level_id= filter.mul_level_id;
        const start= filter.start;
        const end = filter.end;        
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
        const query = this.createQueryBuilder('t');
                // select
                if(isCount==1){
                    query.select([
                        "t.course_id AS course_id", 
                        "t.task_id AS task_id", 
                        "t.user_id AS user_id", 
                    ]);
                    query.innerJoin(
                        "crs_course_task",
                        "task",
                        "task.task_id = t.task_id"
                    ); 
                    query.innerJoin(
                        "users_account",
                        "u",
                        "u.user_id = t.user_id"
                    ); 
                    query.innerJoin(
                        "crs_course",
                        "co",
                        "co.course_id = task.course_id"
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
                    query.leftJoin(
                        "crs_type_task",
                        "ctype",
                        "ctype.type_id = task.type_id"
                    );
                } else {
                    // select
                    query.select([
                            "t.course_id AS course_id", 
                            "t.task_id AS task_id", 
                            "t.user_id AS user_id",                        
                            "t.task_learning_status AS task_learning_status",
                            "t.create_date AS create_date", 
                            "t.update_date AS update_date",                              
                            "cate.category_id as category_id",
                            "cate.category_name as category_name", 
                            "l.mul_level_name AS level_name",
                            "sb.mul_category_name AS subject_name",
                            "psb.mul_category_name AS parent_subject_name", 
                            "task.task_title AS task_title",  
                            "task.link_url AS link_url", 
                            "task.sort AS sort",  
                            "co.num_view as view",
                            "co.course_name AS course_name",
                            "co.sub_description as description", 
                            "co.subject_id as subject_id",
                            "co.subject_parent_id as subject_parent_id",
                            "co.institution as institution",
                            "co.course_period as period",
                            "co.number_of_exam as number_of_exam",
                            "co.number_of_video as number_of_video",
                            "co.number_of_plan as number_of_plan",
                            "co.number_of_quiz as number_of_quiz",
                            "co.course_ratings as course_ratings",
                            "co.create_date as create_date",
                            "co.update_date as update_date",
                            "co.class_level as level_id",                          
                            "u.psn_display_name AS display_name",
                            "CONCAT(u.psn_firstname,' ',u.psn_lastname) AS fullname",  
                            "ctype.type_name as type_name",
                            "ctype.type_name_th as type_name_th",
                            "CONCAT('https://static.trueplookpanya.com/',co.file_path,'',co.image_cover) AS course_thumbnail",
                            "CONCAT('https://static.trueplookpanya.com/',cate.file_path,'',cate.image_cover) AS category_thumbnail",                             
                            ]);
                    query.innerJoin(
                        "crs_course_task",
                        "task",
                        "task.task_id = t.task_id"
                    ); 
                    query.innerJoin(
                        "users_account",
                        "u",
                        "u.user_id = t.user_id"
                    ); 
                    query.innerJoin(
                        "crs_course",
                        "co",
                        "co.course_id = t.course_id"
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
                    query.leftJoin(
                        "crs_type_task",
                        "ctype",
                        "ctype.type_id = task.type_id"
                    );
                } 
                query.where('1=1');
                if (task_id!=null) { 
                    query.andWhere("t.task_id= :task_id", { task_id }); 
                }if (course_id!=null) { 
                    query.andWhere("t.course_id= :course_id", { course_id }); 
                }if (user_id!=null) { 
                    query.andWhere("t.user_id= :user_id", { user_id }); 
                }  
                if (task_learning_status!=null) { 
                    query.andWhere("t.task_learning_status= :task_learning_status", { task_learning_status }); 
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
                if (keyword!=null) { 
                    query.andWhere("l.mul_level_id= :mul_level_id", { mul_level_id }); 
                }  
                if (keyword!=null) { 
                    query.andWhere("co.course_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                }  
                query.andWhere("co.is_enable = 1")
                query.andWhere("co.is_delete = 0")
                query.andWhere("task.is_enable = 1")
                query.andWhere("task.is_delele = 0")
                if (start!=null && end!=null) { 
                    query.andWhere("t.create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("t.update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                if(isCount==1){ 
                    query.groupBy("t.task_id")
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    query.groupBy("t.task_id")
                }
                if (order=='desc') {
                    query.orderBy("task.sort ", "DESC") 
                    query.orderBy("task.task_id", "DESC") 
                } else{ 
                    query.orderBy("task.sort ", "ASC") 
                    query.orderBy("task.task_id", "ASC") 
                }  
                console.log(`CrsMyCourseTask  query-> `,query);
            return query.getRawMany(); 
    } 
    getWhereChk(filter: any) {
        const course_id = filter.course_id;
        const task_id = filter.task_id;
        const user_id= filter.user_id;  
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('mc');
                query.select(["mc.course_id AS course_id",]); 
                query.where('1=1');                
                query.andWhere("mc.course_id= :course_id", { course_id });
                query.andWhere("mc.task_id= :task_id", { task_id });  
                query.andWhere("mc.user_id= :user_id", { user_id });  
                query.groupBy("mc.task_id")
                query.orderBy("mc.task_id", "ASC") 
                console.log(`query-> `,query);
        return query.getRawMany(); 
    } 
    getWhereChk2(filter: any) {
        const course_id = filter.course_id;
        const task_id = filter.task_id;
        const user_id= filter.user_id; 
        const task_learning_status= filter.task_learning_status; 
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('mc');
                query.select(["mc.course_id AS course_id",]); 
                query.where('1=1');                
                query.andWhere("mc.course_id= :course_id", { course_id });
                query.andWhere("mc.task_id= :task_id", { task_id });  
                query.andWhere("mc.user_id= :user_id", { user_id }); 
                query.andWhere("mc.task_learning_status= :task_learning_status", { task_learning_status });  
                query.groupBy("mc.task_id")
                query.orderBy("mc.task_id", "ASC") 
                console.log(`query-> `,query);
        return query.getRawMany(); 
    }
    insertData(input: any) {
        const user_id= input.user_id; 
        const task_id= input.task_id; 
        const course_id= input.course_id; 
        const create_date= input.create_date; 
        const update_date= input.update_date; 
        const task_learning_status= input.task_learning_status; 
        const values ={
                        user_id: user_id,
                        task_id: task_id,
                        course_id: course_id,
                        create_date: create_date,
                        update_date: update_date,
                        task_learning_StatusCode: task_learning_status,
                    }    
        return this.createQueryBuilder("crs_my_course_task")
            .insert()
            .into("crs_my_course_task")
            .values(values)
            .execute();
    }
    updateData(input: any) {
        const user_id= input.user_id; 
        const task_id= input.task_id; 
        const course_id= input.course_id; 
        const create_date= input.create_date; 
        const update_date= input.update_date; 
        const task_learning_status= input.task_learning_status; 
        const values ={
                    update_date: update_date,
                    task_learning_StatusCode: task_learning_status,
                      }    
        return this.createQueryBuilder("crs_my_course_task")
                    .update("crs_my_course_task")
                    .set(values)
                    //.where('1=1')
                    //.andWhere("user_id = :user_id", { user_id})
                    .where("user_id = :user_id", { user_id})
                    .andWhere("task_id = :task_id", { task_id})
                    .andWhere("course_id = :course_id", { course_id})
                    .execute()
    } 
    deleteData(input: any) {
        const user_id= input.user_id; 
        const task_id= input.task_id; 
        const course_id= input.course_id; 
        return  this.createQueryBuilder("crs_my_course_task")
                    .delete()
                    .from("crs_my_course_task")
                    //.where('1=1')
                    //.andWhere("user_id = :user_id", { user_id})
                    .where("user_id = :user_id", { user_id})
                    .andWhere("task_id = :task_id", { task_id})
                    .andWhere("course_id = :course_id", { course_id})
                    .execute()
    }                
}
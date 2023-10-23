import { EntityRepository, Repository } from "typeorm";
import { CrsMyCourse } from "../entities/CrsMyCourse.entity";
import { MulLevel } from "../entities/MulLevel.entity";
import { CrsCategory } from "../entities/CrsCategory.entity";
import { CrsCourse } from "../entities/CrsCourse.entity";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";
import { UsersAccount } from "../entities/UsersAccount.entity";
import { CrsMyCourseTask } from "../entities/CrsMyCourseTask.entity";
// table crs_type_task 
@EntityRepository(CrsMyCourse)
export class CrsMyCourseRepository extends Repository<CrsMyCourse>{
    getWhereRs(filter: any) {
        const course_id= filter.course_id;
        const keyword = filter.keyword; 
        const category_id= filter.category_id;
        const subject_id= filter.subject_id; 
        const subject_parent_id= filter.subject_parent_id;
        const mul_level_id= filter.mul_level_id;
        const start= filter.start;
        const end= filter.end;
        const user_id= filter.user_id; 
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
        const query = this.createQueryBuilder('mc');
                // select
                if(isCount==1){
                    query.select([
                            "mc.my_course_id AS my_course_id", 
                            ]);
                    query.innerJoin(
                        "crs_course",
                        "co",
                        "co.course_id = mc.course_id"
                    ); 
                    query.innerJoin(
                        "users_account",
                        "u",
                        "u.user_id = mc.user_id"
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
                            "mc.my_course_id AS my_course_id",
                            "mc.user_id AS user_id",
                            "mc.course_id AS course_id",
                            "mc.course_progress AS progress", 
                            "mc.create_date AS create_date",
                            "mc.update_date AS update_date",
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
                        "co.course_id = mc.course_id"
                    ); 
                    query.innerJoin(
                        "users_account",
                        "u",
                        "u.user_id = mc.user_id"
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
                query.andWhere("mc.user_id= :user_id", { user_id }); 
                if (course_id!=null) { 
                    query.andWhere("mc.course_id= :course_id", { course_id }); 
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
                if (start!=null && end!=null) { 
                    query.andWhere("mc.create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("mc.update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                if(isCount==1){ 
                    query.groupBy("mc.my_course_id")
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    query.groupBy("mc.my_course_id")
                }
                if (order=='desc') {
                    query.orderBy("mc.my_course_id", "DESC") 
                } else{
                    query.groupBy("mc.my_course_id")
                    query.orderBy("mc.my_course_id", "ASC") 
                }  
                console.log(`CrsMyCourse  query-> `,query);
            return query.getRawMany(); 
    }
    getWhereChk(filter: any) {
        const course_id= filter.course_id; 
        const user_id= filter.user_id; 
        const course_progress= filter.course_progress; 
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('mc');
                query.select(["mc.*",]); 
                query.where('1=1');                
                query.andWhere("mc.course_id= :course_id", { course_id });  
                query.andWhere("mc.user_id= :user_id", { user_id }); 
                if(course_progress!=null){                    
                    query.andWhere("mc.course_progress= :course_progress", { course_progress }); 
                }
               // query.groupBy("mc.my_course_id")
               // query.orderBy("mc.my_course_id", "ASC") 
                console.log(`CrsMyCourse  query-> `,query);
        return query.getRawMany(); 
    }
    insertData(input: any) {
        const user_id= input.user_id; 
        const course_id= input.course_id; 
        const create_date= input.create_date; 
        const update_date= input.update_date; 
        const course_progress= input.course_progress; 
        const values ={
                        user_id: user_id,
                        course_id: course_id,
                        create_date: create_date,
                        update_date: update_date,
                        course_progress: course_progress,
                    }    
        return this.createQueryBuilder("crs_my_course")
            .insert()
            .into("crs_my_course")
            .values(values)
            .execute();
    }
    updateData(input: any) {
        const my_course_id= input.my_course_id;  
        const update_date= input.update_date; 
        const course_progress = input.course_progress; 
        /*
        const values ={
                        user_id: user_id,
                        course_id: course_id, 
                        update_date: update_date,
                        course_progress: course_progress,
        } 
        */
        const values ={  
                        update_date: update_date,
                        course_progress: course_progress,
          }
        console.log(`My_Course_Result_update values `,values);  
        console.log(`My_Course_Result_update my_course_id `,my_course_id);  
        return this.createQueryBuilder("crs_my_course")
                    .update("crs_my_course")
                    .set(values)
                    .where("my_course_id = :my_course_id", { my_course_id})
                    .execute()
                    
    } 
    deleteData(input: any) {
        const my_course_id= input.my_course_id;  
        return  this.createQueryBuilder("crs_my_course")
                    .delete()
                    .from("crs_my_course")
                    .where("my_course_id = :my_course_id", { my_course_id })
                    .execute()
    }
    /************************/
    getWhereChkMyTask(filter: any) {
        const course_id = filter.course_id;
        const task_id = filter.task_id;
        const user_id= filter.user_id; 
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('mc');
                query.select(["mc.course_id AS course_id",]); 
                query.where('1=1');                
                query.andWhere("mc.course_id= :course_id", { course_id });
                if (task_id!=null) { 
                    query.andWhere("mc.task_id= :task_id", { task_id });  
                } 
                query.groupBy("mc.task_id")
                query.orderBy("mc.task_id", "ASC") 
                console.log(`query-> `,query);
        return query.getRawMany(); 
    }
    insertDataMyTask(input: any) {
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
                        task_learning_status: task_learning_status,
                    }    
        return this.createQueryBuilder("crs_my_course_task")
            .insert()
            .into("crs_my_course_task")
            .values(values)
            .execute();
    }
    updateDataMyTask(input: any) {
        const user_id= input.user_id; 
        const task_id= input.task_id; 
        const course_id= input.course_id; 
        const create_date= input.create_date; 
        const update_date= input.update_date; 
        const task_learning_status= input.task_learning_status; 
        const values ={
                    update_date: update_date,
                    task_learning_status: task_learning_status,
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
    deleteDataMyTask(input: any) {
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
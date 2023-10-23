import { EntityRepository, Repository } from "typeorm";

import { CrsCategory } from "../entities/CrsCategory.entity";
import { CrsCourse } from "../entities/CrsCourse.entity";
import { CrsCourseTask } from "../entities/CrsCourseTask.entity";
import { MulCategories } from "../entities/MulCategories.entity";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";
import { MulLevel } from "../entities/MulLevel.entity";
import { UsersAccount } from "../entities/UsersAccount.entity";
@EntityRepository(CrsCourseTask)
export class CrsCourseTaskRepository extends Repository<CrsCourseTask>{
    getWhereRs(filter: any) {
        const course_id= filter.course_id;
        const task_id= filter.task_id;
        const content_id= filter.content_id;
        const keyword = filter.keyword; 
        const type_id= filter.type_id; 
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
        console.log(`qs filter=> `,filter);
        const query = this.createQueryBuilder('t');
                // select
                if(isCount==1){
                        query.select([
                                "t.task_id as task_id",
                                ]);
                        query.innerJoin(
                                    "crs_type_task",
                                    "type",
                                    "type.type_id = t.type_id"
                                );
                        query.leftJoin(
                                "users_account",
                                "u",
                                "u.user_id =t.create_by"
                            );
                        query.leftJoin(
                                    "users_account",
                                    "ud",
                                    "ud.user_id =t.update_by"
                                );
                } else {
                    // select
                    query.select([
                                "t.task_id as task_id",
                                "t.content_id as content_id",
                                "t.task_title as task_title",
                                "t.task_detail as task_detail", 
                                "t.link_url AS link_url",
                                "t.sort as sort",
                                "t.create_date as create_date",
                                "t.update_date as update_date",
                                "t.create_by as create_by",
                                "t.update_by as update_by",
                                "type.type_name as type_name", 
                                "type.type_name_th as type_name_th",
                                "u.psn_display_name AS create_by_display_name",
                                "ud.psn_display_name AS update_by_display_name",
                                "CONCAT(u.psn_firstname,' ',u.psn_lastname) AS create_by_fullname", 
                                "CONCAT(ud.psn_firstname,' ',ud.psn_lastname) AS update_by_fullname",
                            ]);
                    query.innerJoin(
                                "crs_type_task",
                                "type",
                                "type.type_id = t.type_id"
                            );
                    query.leftJoin(
                                "users_account",
                                "u",
                                "u.user_id =t.create_by"
                            );
                    query.leftJoin(
                                "users_account",
                                "ud",
                                "ud.user_id =t.update_by"
                            );
                } 
                query.where('1=1');
                query.andWhere("t.course_id= :course_id", { course_id }); 
                if (task_id!=null) { 
                    query.andWhere("t.task_id= :task_id", { task_id });
                }if (content_id!=null) { 
                    query.andWhere("t.content_id= :content_id", { content_id });
                }if (type_id!=null) { 
                    query.andWhere("t.type_id= :type_id", { type_id });
                }if (keyword!=null) {
                    query.andWhere("t.task_title like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                }if (start!=null && end!=null) { 
                    query.andWhere("t.create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("t.update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                if(isCount==1){ 
                    query.groupBy("t.task_id");
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    query.groupBy("t.task_id");
                }
                if (order=='desc') {
                    query.orderBy("t.sort", "DESC");
                    query.orderBy("t.task_id", "DESC");
                } else{
                    query.orderBy("t.sort", "ASC");
                    query.orderBy("t.task_id", "ASC");
                }
               console.log(`CrsCourseTask -> TypeORM-> query `,query);
            return query.getRawMany(); 
    } 
    //
    getWhereChkTask(filter: any) {
        const course_id = filter.course_id;
        const task_id = filter.task_id;  
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('t');
                query.select(["t.course_id AS course_id",]); 
                query.where('1=1');
                query.andWhere("t.course_id= :course_id", { course_id });  
                query.andWhere("t.task_id= :task_id", { task_id }); 
                query.groupBy("t.task_id")
                query.orderBy("t.task_id", "ASC") 
                console.log(`query-> `,query);
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
                if (task_id!=null) { 
                    query.andWhere("mc.task_id= :task_id", { task_id });  
                } 
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
                        task_learning_status: task_learning_status,
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
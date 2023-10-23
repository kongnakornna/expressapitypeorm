import { EntityRepository, Repository } from "typeorm";
import { MulLevel } from "../entities/MulLevel.entity";
import { CrsCategory } from "../entities/CrsCategory.entity";
import { CrsCourse } from "../entities/CrsCourse.entity";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";
import { MulCategories } from "../entities/MulCategories.entity";
import { UsersAccount } from "../entities/UsersAccount.entity";
@EntityRepository(CrsCourse)
export class CrsCourseRepository extends Repository<CrsCourse>{
    getWhereRs(filter: any) {
        const course_id= filter.course_id;
        const keyword = filter.keyword; 
        const category_id= filter.category_id;
        const subject_id= filter.subject_id; 
        const subject_parent_id= filter.subject_parent_id;
        const class_level= filter.class_level;
        const start= filter.start;
        const end= filter.end;
        const ratings= filter.ratings; 
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
        const query = this.createQueryBuilder('co');
                // select
                if(isCount==1){
                        query.select([
                                "co.course_id as course_id",
                                ]);
                        query.innerJoin(
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
                                "co.course_id as course_id",
                                "co.num_view as view",
                                "co.course_name AS course_name",
                                "co.sub_description as description",
                                "co.category_id as category_id",
                                "co.subject_id as subject_id",
                                "co.subject_parent_id as subject_parent_id",
                                "co.institution as institution",
                                "co.course_period as period",
                                "co.number_of_exam as number_exam",
                                "co.number_of_video as number_video",
                                "co.number_of_plan as number_plan",
                                "co.number_of_quiz as number_quiz",
                                "co.course_ratings as ratings",
                                "co.create_date as create_date",
                                "co.update_date as update_date",
                                "cate.category_id as category_id",
                                "cate.category_name as category",
                                "co.class_level as level_id",
                                "l.mul_level_name AS level_name",
                                "sb.mul_category_name AS subject_name",
                                "psb.mul_category_name AS parent_subject_name",
                                "CONCAT('https://static.trueplookpanya.com/',co.file_path,'',co.image_cover) AS course_thumbnail",
                                "CONCAT('https://static.trueplookpanya.com/',cate.file_path,'',cate.image_cover) AS category_thumbnail",
                            ]);
                    query.innerJoin(
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
                // if status is defined then add a where clause to the query 
                query.andWhere("co.is_enable= 1"); 
                query.andWhere("co.is_delete= 0"); 
                if (course_id!=null) { 
                    query.andWhere("co.course_id= :course_id", { course_id });
                }if (category_id!=null) { 
                    query.andWhere("co.category_id= :category_id", { category_id });
                }if (subject_id!=null) { 
                    query.andWhere("co.subject_id= :subject_id", { subject_id });
                }if (subject_parent_id!=null) { 
                    query.andWhere("co.subject_parent_id= :subject_parent_id", { subject_parent_id });
                }if (class_level!=null) { 
                    query.andWhere("co.class_level= :class_level", { class_level });
                }if (keyword!=null) {
                    query.andWhere("co.course_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                }if (ratings!=null) { 
                    query.andWhere("co.course_ratings= :ratings", { ratings });
                }if (start!=null && end!=null) { 
                    query.andWhere("co.create_date  BETWEEN '" + start + "' AND '" + end + "'");
                    //query.andWhere("co.update_date  BETWEEN '" +start+"' AND '" +end+"'");
                } 
                if(isCount==1){ 
                    query.groupBy("co.course_id");
                }else{  
                    query.limit(size);
                    query.offset(size * (page - 1));
                    query.groupBy("co.course_id");
                }
                if (order=='desc') {
                    query.orderBy("co.course_id", "DESC");
                } else{
                    query.orderBy("co.course_id", "ASC");
                }
               console.log(`CrsCourse -> TypeORM-> query `,query);
            return query.getRawMany(); 
    
    } 
    getWhereChk(filter: any) {
        const course_id = filter.course_id; 
        console.log(`data filter `, filter);        
        const query = this.createQueryBuilder('co');
                query.select(["co.course_id AS course_id"]); 
                query.where('1=1');  
                query.andWhere("co.course_id= :course_id", { course_id }); 
                query.andWhere("co.is_enable= 1"); 
                query.andWhere("co.is_delete= 0");  
                console.log(`query-> `,query);
        return query.getRawMany(); 
    }
} 
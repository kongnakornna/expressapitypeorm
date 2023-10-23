import "reflect-metadata"; 
import {createConnection} from "typeorm";  
import {EntityRepository, Repository } from "typeorm";
import { CrsSection } from "../entities/CrsSection.entity";
import {CrsSectionChild } from "../entities/CrsSectionChild.entity";
import { CrsMyWislish } from "../entities/CrsMyWislish.entity";
import { MulLevel } from "../entities/MulLevel.entity";
import { CrsCategory } from "../entities/CrsCategory.entity";
import { CrsCourse } from "../entities/CrsCourse.entity";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";
import { MulCategories } from "../entities/MulCategories.entity";
import { UsersAccount } from "../entities/UsersAccount.entity";
import {getConnection,getManager} from "typeorm";
// table crs_type_task 
@EntityRepository(CrsSectionChild)
export class CrsSectionChildRepository extends Repository<CrsSectionChild>{
        getWhereRs(filter: any) {  
                    const child_id = filter.child_id;
                    const section_id = filter.section_id;
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
                    const query = this.createQueryBuilder("s");
                        // select
                    if(isCount==1){
                            query.select([
                                        "s.child_id AS child_id",
                                        ]);
                            query.innerJoin(
                                "crs_section",
                                "se",
                                "se.section_id = s.section_id"
                            );
                            query.innerJoin(
                                "crs_course",
                                "co",
                                "co.course_id = s.course_id"
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
                                    "s.child_id AS child_id",
                                    "s.section_id AS section_id",
                                    "s.course_id AS course_id",
                                    "s.title AS title",
                                    "se.section_name AS section_name",
                                    "s.link_url AS url", 
                                    "s.is_enable AS status", 
                                    "s.update_date AS update_date", 
                                    "s.create_date AS create_date",   
                                    "CONCAT('https://static.trueplookpanya.com/',s.file_path,'',s.image) AS thumbnail",
                                    "co.category_id as category_id",  
                                    "co.subject_id as subject_id",  
                                    "co.subject_parent_id as subject_parent_id",  
                                    "co.course_name AS course_name",                                  
                                    "l.mul_level_name AS level_name",
                                    "sb.mul_category_name AS subject_name",
                                    "psb.mul_category_name AS parent_subject_name",  
                                    "CONCAT('https://static.trueplookpanya.com/',co.file_path,'',co.image_cover) AS course_thumbnail",
                                    "CONCAT('https://static.trueplookpanya.com/',cate.file_path,'',cate.image_cover) AS category_thumbnail", 
                                    ]);
                            query.innerJoin(
                                "crs_section",
                                "se",
                                "se.section_id = s.section_id"
                            );
                            query.innerJoin(
                                "crs_course",
                                "co",
                                "co.course_id = s.course_id"
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
                    query.andWhere("s.section_id= :section_id", { section_id }); 
                    if (child_id!=null) { 
                        query.andWhere("s.child_id= :child_id", { child_id }); 
                    } 
                    if (course_id!=null) { 
                      //  query.andWhere("s.course_id= :course_id", { course_id }); 
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
                        query.andWhere("s.title like :keyword", { keyword: keyword ? `%${keyword}%` : "%" });
                    }  
                    query.andWhere("s.is_enable = 1")
                    query.andWhere("s.is_delete = 0")
                    if (start!=null && end!=null) { 
                        query.andWhere("s.create_date  BETWEEN '" + start + "' AND '" + end + "'");
                        //query.andWhere("s.update_date  BETWEEN '" +start+"' AND '" +end+"'");
                    } 
                    if(isCount==1){ 
                        query.groupBy("s.child_id")
                    }else{  
                        query.limit(size);
                        query.offset(size * (page - 1));
                        query.groupBy("s.child_id");
                    }
                    if (order=='desc') {
                        query.orderBy("s.sort", "DESC");  
                        query.orderBy("s.child_id", "DESC"); 
                    } else{
                        query.groupBy("s.child_id");
                        query.orderBy("s.sort", "ASC");  
                        query.orderBy("s.child_id", "ASC");  
                    }  
        return query.getRawMany(); 
    } 
} 
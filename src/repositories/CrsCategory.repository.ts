import { EntityRepository, Repository } from "typeorm";
import { CrsCategory } from "../entities/CrsCategory.entity";
@EntityRepository(CrsCategory)
export class CrsCategoryRepository extends Repository<CrsCategory>{
    findAllCrsCategory(limit: number) {
        return this.createQueryBuilder("c")
            .select([
                // "*"
                "c.category_id AS id",
                "c.category_name AS category_name",
                "c.sub_description AS sub_description",
                //"c.file_path AS file_path", 
                //"c.image_cover AS image_cover", 
                //"c.is_delete AS is_delete", 
                 "c.is_enable AS enable", 
                //"c.create_date AS create_date", 
                //"c.update_date AS update_date", 
                //"c.create_by AS create_by", 
                //"c.update_by AS update_by",  
                "CONCAT('https://static.trueplookpanya.com/',c.file_path, '/',c.image_cover) AS thumbnail",
            ]) 
            .where("c.is_enable = '1' ")
            .andWhere("c.is_delete = '0' ") 
            .orderBy("c.category_id", "ASC")
            .limit(limit)
            .getRawMany();
    }
    findCrsCategory(CategoryId: number){
        return this.createQueryBuilder("c")
            .select([
                "c.category_id AS id",
                "c.category_name AS category_name",
                "c.sub_description AS sub_description",
                //"c.file_path AS file_path", 
                //"c.image_cover AS image_cover", 
                //"c.is_delete AS is_delete", 
                "c.is_enable AS enable", 
                //"c.create_date AS create_date", 
                //"c.update_date AS update_date", 
                //"c.create_by AS create_by", 
                //"c.update_by AS update_by", 
                "CONCAT('https://static.trueplookpanya.com/',c.file_path, '/',c.image_cover) AS thumbnail",
            ]) 
            .where("c.is_enable = '1' ")
            .andWhere("c.is_delete = '0' ") 
            .andWhere("c.category_id = :CategoryId", { CategoryId })
            .orderBy("c.category_id", "ASC")
            .limit(1)
            .getRawMany();
    }
}

// table cCategory
/*
// table c_category  as  cCategory
    category_id
    category_name
    sub_description
    image_cover
    is_delete
    is_enable
    create_date
    update_date
    file_path
    create_by
    update_by

 forEach

*/
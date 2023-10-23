import { EntityRepository, Repository } from "typeorm";
import { MulCategories } from "../entities/MulCategories.entity";

@EntityRepository(MulCategories)
export class MulCategoriesRepository extends Repository<MulCategories>{
    findAlldata() {
        return this.createQueryBuilder("m")
            .select([
                 "m.*" 
            ])
            //.where("m.mul_parent_id IN (mul_parent_id)", { mul_parent_id: [0] }) 
            .where("m.mul_category_id IN (1000,2000,3000,4000,5000,6000,7000,8000,9000)") 
            .andWhere("m.mul_parent_id=0") 
            //.andWhere("m.mul_category_id IN (mul_category_id)", { mul_category_id: [1000,2000,3000,4000,5000,6000,7000,8000,9000] }) 
            //.andWhere("m.mul_category_id>= 1000")
            //.andWhere("m.mul_category_id<= 9000") 
            .orderBy("m.mul_category_id", "ASC") 
            .getRawMany();
    }
    findiddata(id: number){
        return this.createQueryBuilder("m")
            .select([
                "m.mul_category_id AS mul_category_id",
                "m.mul_parent_id AS mul_parent_id",
                "m.mul_category_name AS mul_category_name", 
                "m.level AS level", 
            ]) 
            .where("m.mul_category_id = :id", { id })
            .andWhere("m.parent_id= 0")
            .orderBy("m.mul_category_id", "ASC") 
            .getRawOne();
    }
    findarentiddata(id: number){
        return this.createQueryBuilder("m")
            .select([
                "m.mul_category_id AS mul_category_id",
                "m.mul_parent_id AS mul_parent_id",
                "m.mul_category_name AS mul_category_name", 
                "m.level AS level", 
            ]) 
            .where("m.mul_parent_id = :id", { id }) 
            .orderBy("m.mul_category_id", "ASC") 
            .getRawMany();
    }
}
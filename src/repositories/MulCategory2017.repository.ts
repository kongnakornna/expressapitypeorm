import { EntityRepository, Repository } from "typeorm";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";

@EntityRepository(MulCategory2017)
export class MulCategory2017Repository extends Repository<MulCategory2017>{
    findAlldata() {
        return this.createQueryBuilder("m")
            .select([
                 "*" 
            ])
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
import { EntityRepository, Repository } from "typeorm";
import { MulLevel } from "../entities/MulLevel.entity";
// table m._type_task 
@EntityRepository(MulLevel)
export class MulLevelRepository extends Repository<MulLevel>{
    findAllMulLevel() {
        return this.createQueryBuilder("m")
            .select([
                // "*"
                "m.mul_level_id AS level_id",
                "m.mul_level_parent_id AS parent_id",
                "m.mul_level_name AS level_name", 
            ])
            .orderBy("m.mul_level_id", "ASC") 
            .getRawMany();
    }
    findLevelid(id: number){
        return this.createQueryBuilder("m")
            .select([
                "m.mul_level_id AS level_id",
                "m.mul_level_parent_id AS parent_id",
                "m.mul_level_name AS level_name", 
            ]) 
            .where("m.mul_level_id = :id", { id })
            .andWhere("m.parent_id= 0")
            .orderBy("m.mul_level_id", "ASC") 
            .getRawOne();
    }
    findLevelparentid(id: number){
        return this.createQueryBuilder("m")
            .select([
                "m.mul_level_id AS level_id",
                "m.mul_level_parent_id AS parent_id",
                "m.mul_level_name AS level_name", 
            ]) 
            .where("m.mul_level_parent_id = :id", { id }) 
            .orderBy("m.mul_level_id", "ASC") 
            .getRawMany();
    }
}
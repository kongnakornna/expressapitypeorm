import { EntityRepository, Repository } from "typeorm";
import { CrsSection } from "../entities/CrsSection.entity";
// table crs_type_task 
@EntityRepository(CrsSection)
export class CrsSectionRepository extends Repository<CrsSection>{
    findAll() {
        return this.createQueryBuilder("s")
            .select([
                // "*"
                "s.section_id AS id",
                "s.section_name AS section_name",
                "s.description AS description",
                "s.is_enable AS status", 
            ])
            .where("s.is_enable = 1")
            .andWhere ("s.is_delete = 0")
            .orderBy("s.section_id", "ASC") 
            .getRawMany();
    } 
    findid(section_id: number){
        return this.createQueryBuilder("s")
            .select([
                "s.section_id AS id",
                "s.section_name AS section_name",
                "s.description AS description",
                "s.is_enable AS status",  
            ]) 
            .where("s.section_id = :section_id", { section_id })
            .andWhere("s.is_enable = 1")
            .andWhere ("s.is_delete = 0")
            .orderBy("s.section_id", "ASC") 
            .getRawOne();
    }
}
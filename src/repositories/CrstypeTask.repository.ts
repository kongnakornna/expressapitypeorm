import { EntityRepository, Repository } from "typeorm";
import { CrsTypeTask } from "../entities/CrsTypeTask.entity";
// table crs_type_task 
@EntityRepository(CrsTypeTask)
export class CrsTypeTaskRepository extends Repository<CrsTypeTask>{
    findAllCrsTypeTask(limit: number) {
        return this.createQueryBuilder("crs")
            .select([
                // "*"
                "crs.type_id AS id",
                "crs.type_name AS type_name",
                "crs.type_name_th AS type_name_th",
                "crs.status AS status", 
            ])
            .orderBy("crs.type_id", "ASC")
            .limit(limit)
            .getRawMany();
    }
    findCrsTypeTask(typeId: number, limit: number){
        return this.createQueryBuilder("crs")
            .select([
                "crs.type_id AS id",
                "crs.type_name AS type_name",
                "crs.type_name_th AS type_name_th",
                "crs.status AS status", 
                "task.task_title AS taskname", 
            ])
             .leftJoin(
                "crs_course_task",
                "task",
                "crs.type_id = task.type_id"
            ) 
            .where ("crs.type_id = :typeId",{ typeId })
            .orderBy("crs.type_id", "ASC")
            .limit(1)
            .getRawOne();
    }
}
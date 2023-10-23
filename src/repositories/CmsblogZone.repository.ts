import { EntityRepository, getRepository, Repository, EntityManager  } from "typeorm";
import { CmsblogZone } from "../entities/CmsblogZone.entity"; 
@EntityRepository(CmsblogZone)
export class CmsblogZoneRepository extends Repository<CmsblogZone>{
 
    async getWhereRs(filter: any) {  
            const zone_id= filter.zone_id; 
            const keyword = filter.keyword; 
            const ads_status= filter.ads_status;           
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
            //console.log(`rows filter `, filter); 
            // return

            const query = this.createQueryBuilder('z');
                    // select
                    if(isCount==1){
                                query.select([
                                 "z.zone_id AS zone_id",
                                ]); 
                    } else {
                        //  "z.password AS password",
                        query.distinctOn(["z.zone_id AS zone_id"]); 
                        query.select([
                                    "z.zone_id AS zone_id",
                                    "z.zone_name AS zone_name",
                                    "z.zone_url AS zone_url",
                                    "z.ads_status AS ads_status", 
                                ]);  
                    } 
                    query.where('1=1');    
                    if (zone_id!=null) { 
                        query.andWhere("z.zone_id= :zone_id", { zone_id }); 
                    }   
                    if (ads_status!=null) { 
                        query.andWhere("z.ads_status= :ads_status", { ads_status }); 
                    } 
                    if (keyword!=null) { 
                        query.andWhere("z.zone_name like :keyword", { keyword: keyword ? `%${keyword}%` : "%" }); 
                    }   
                    if(isCount==1){ 
                        query.groupBy("z.zone_id")
                    }else{  
                        query.limit(size);
                        query.offset(size * (page - 1));
                        query.groupBy("z.zone_id")
                    }
                    if (order=='desc') {
                       //query.groupBy("z.zone_id")  
                        query.orderBy("z.zone_id", "DESC") 
                    } else if (order=='asc') {
                        //query.groupBy("z.zone_id") 
                        query.orderBy("z.zone_id", "ASC")  
                    } else{
                        //query.groupBy("z.zone_id") 
                        query.orderBy("z.zone_id", "DESC")  
                    }   
                    query.printSql()
                    query.maxExecutionTime(1000) // milliseconds.
                    console.log(`CmsblogZoneRepository  query-> `,query);
                return await query.getRawMany(); 
    }  
  
} 
 
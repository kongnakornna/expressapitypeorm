import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class CmsblogZone {
    @PrimaryGeneratedColumn()
    id!: number;
 
    @Column()
    zone_id!: number;

    @Column()
    zone_name!: string;

    @Column()
    zone_url!: string;

    @Column()
    ads_status!: number;
}
/*
id
zone_id
zone_name
zone_url
ads_status

*/
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
// table crs_type_task  as  CrsTypeTask
@Entity()
export class CrsTypeTask {
    @PrimaryGeneratedColumn()
    type_id!: number;
 
    @Column()
    type_name!: string;

    @Column()
    type_name_th!: string;

    @Column()
    status!: number;
}
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class MulLevel{
    @PrimaryGeneratedColumn()
    mul_level_id!: number;
 
    @Column()
    mul_level_parent_id!: number;

    @Column()
    mul_level_name!: string;
}
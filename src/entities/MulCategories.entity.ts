import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class MulCategories {
    @PrimaryGeneratedColumn()
    mul_category_id!: number;
 
    @Column()
    mul_parent_id!: number;

    @Column()
    mul_category_name!: string;

    @Column()
    level!: string;
 
}

 

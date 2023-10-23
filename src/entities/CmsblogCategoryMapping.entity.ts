import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class CmsblogCategoryMapping {
    @PrimaryGeneratedColumn()
    category_id!: number;
 
    @Column()
    content_id!: number;

    @Column()
    content_type!: number;

    @Column()
    updated_at!: string;
 
}

/*
 
cmsblog_category_mapping

category_id
content_id
content_type
updated_at

*/
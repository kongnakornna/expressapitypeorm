import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class KnowledgeContext2014{
    @PrimaryGeneratedColumn()
    knowledge_context_id!: number;
 
    @Column()
    mul_level_id!: number;

    @Column()
    mul_category_id!: number;
 
    @Column()
    knowledge_context_name!: string;

    @Column()
    knowledge_context_keyword!: string;
    
    @Column()
    knowledge_context_description!: string;
    
    @Column()
    add_date!: string;
    
    @Column()
    last_update_date!: string;
}
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class KnowledgeContext2014Map{
    @PrimaryGeneratedColumn()
    idx!: number;
 
    @Column()
    context_id!: number;

    @Column()
    content_id!: number;
 
    @Column()
    table_id!: number;

    @Column()
    addDataTime!: string;
}
 
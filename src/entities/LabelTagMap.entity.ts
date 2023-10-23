import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LabelTagMap {
    @PrimaryGeneratedColumn()
    idx!: number;

    @Column()
    project_id?: number;
   
    @Column()
    content_id?: number;
   
    @Column()
    label_tag_id?: number;
   
    @Column()
    addDateTime?: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrmAnswer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    question_id!: number;
    
    @Column()
    vdo!: string;
    
    @Column()
    file_name_ser!: string;
    
    @Column()
    file_path!: string;
    
    @Column()
    file_type!: string;
    
    @Column()
    thumb_s!: string;
    
    @Column()
    thumb_m!: string;
    
    @Column()
    thumb_l!: string;
    
    @Column()
    name!: string;
    
    @Column()
    description!: string;
    
    @Column()
    keyword!: string;
    
    @Column()
    advise!: number;
    
    @Column()
    pageview!: number;
    
    @Column()
    created_by!: string;
    
    @Column()
    created_on!: string;
    
    @Column()
    updated_by!: string;
    
    @Column()
    updated_on!: string;
    
    @Column()
    media_qty!: string;
    
    @Column()
    media_duration!: string;
   

}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,ManyToMany, UpdateDateColumn, JoinColumn } from "typeorm";
import { UsersAccount } from "./UsersAccount.entity";
import { MulLevel } from "../entities/MulLevel.entity";
import { CrsCategory } from "../entities/CrsCategory.entity";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";
@Entity()
export class CrsCourse {
    @PrimaryGeneratedColumn() 
    course_id!: number;
 
    @Column()
    course_name!: string;

    @Column()
    sub_description!: string;

    @Column()
    description!: string;

    @Column()
    image_cover!: string;

    @Column()
    institution!: string;

    @ManyToMany(_type => CrsCategory, CrsCategory => CrsCategory.category_id, { eager: false })
    @JoinColumn({ name: 'category_id' })
    category_id!: CrsCategory;

    @ManyToMany(_type => MulCategory2017, MulCategory2017 => MulCategory2017.mul_category_id, { eager: false })
    @JoinColumn({ name: 'subject_id' })
    subject_id!: MulCategory2017;

    @ManyToMany(_type => MulCategory2017, MulCategory2017 => MulCategory2017.mul_category_id, { eager: false })
    @JoinColumn({ name: 'subject_parent_id' })
    subject_parent_id!: MulCategory2017;
 
    @ManyToMany(_type => MulLevel, MulLevel => MulLevel.mul_level_id, { eager: false })
    @JoinColumn({ name: 'class_level' })
    class_level!: MulLevel;
 
    @Column()
    course_period!: number;

    @Column()
    number_of_exam!: number;

    @Column()
    number_of_video!: number;

    @Column()
    number_of_plan!: number;

    @Column()
    number_of_quiz!: number;

    @Column()
    course_ratings!: number;

    @Column()
    num_view!: number;

    @Column()
    is_enable!: number;

    @Column()
    is_delete!: number;

    @Column()
    create_by!: number;

    @Column()
    update_by!: number;

    @Column("date")
    create_date!: Date;

    @Column("date")
    update_date!: Date;

    @Column()
    file_path!: string; 
}

/*
Tb crs_course  as  CrsCourse 
    course_id
    course_name
    sub_description
    description
    image_cover
    institution
    category_id
    subject_id
    subject_parent_id
    class_level
    course_period
    number_of_exam
    number_of_video
    number_of_plan
    number_of_quiz
    course_ratings
    num_view
    is_enable
    is_delete
    create_by
    update_by
    create_date
    update_date
    file_path 

*/
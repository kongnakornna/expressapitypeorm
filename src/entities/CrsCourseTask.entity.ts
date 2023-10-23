import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,ManyToMany, UpdateDateColumn, JoinColumn } from "typeorm";
import { CrsCourse } from "../entities/CrsCourse.entity";
import { CrsTypeTask } from "../entities/CrsTypeTask.entity";
@Entity()
export class CrsCourseTask {
    @PrimaryGeneratedColumn()
    task_id!: number;
    
    @ManyToOne(_type => CrsCourse, CrsCourse => CrsCourse.course_id, { eager: false })
    @JoinColumn({ name: 'course_id' })
    course_id!: CrsCourse;

    @Column()
    task_title!: string;

    @Column()
    link_url!: string;
 
    @Column()
    is_enable!: number;

    @Column()
    is_delele!: number;

    @Column()
    create_date!: string;

    @Column()
    update_date!: string;

    @ManyToMany(_type => CrsTypeTask, CrsTypeTask => CrsTypeTask.type_id, { eager: false })
    @JoinColumn({ name: 'type_id' })
    type_id!: CrsTypeTask;

    @Column()
    sort!: number;

    @Column()
    create_by!: number;

    @Column()
    update_by!: number;

    @Column()
    task_detail!: string;

    @Column()
    content_id!: number; 
}
/*
Tb crs_course_task  as  CrsCourseTask 
    task_id
    course_id
    task_title
    link_url
    is_enable
    is_delele
    create_date
    update_date
    type_id
    sort
    create_by
    update_by
    task_detail
    content_id
*/
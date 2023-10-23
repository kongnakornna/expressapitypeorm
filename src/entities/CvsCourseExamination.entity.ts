import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class CvsCourseExamination {
    @PrimaryGeneratedColumn()
    id?: number;
 
    @Column()
    member_id!: string;

    @Column()
    mul_root_id?: number;

    @Column()
    mul_level_id?: number;
    
    @Column()
    exam_type_id!: number;
    
    @Column()
    exam_name!: string;
    
    @Column()
    exam_time!: number;
    
    @Column()
    exam_code!: string;
    
    @Column()
    exam_random!: string;
    
    @Column()
    exam_show_ans!: string;
    
    @Column()
    exam_percent!: string;
    
    @Column()
    exam_keyword!: string;
    
    @Column()
    exam_status!: number;

    @Column()
    exam_delete_flag!: string;

    @Column()
    exam_add_date!: string;

    @Column()
    exam_update_date!: string;

    @Column()
    exam_encode!: string;

    @Column()
    exam_reccomment!: string;

    @Column()
    year_path!: string;

    @Column()
    user_id!: number;

    @Column()
    view_count!: string;

    @Column()
    thumbnail!: string;

    @Column()
    banner!: string;

    @Column()
    isShow_answer!: number;

    @Column()
    isShow_rank!: number;

    @Column()
    isRequireLogin!: number;
}

/*
    // table cvs_course_examination  as  CvsCourseExamination
        id
        member_id
        mul_root_id
        mul_level_id
        exam_type_id
        exam_name
        exam_time
        exam_code
        exam_random
        exam_show_ans
        exam_percent
        exam_keyword
        exam_status
        exam_delete_flag
        exam_add_date
        exam_update_date
        exam_encode
        exam_reccomment
        year_path
        user_id
        view_count
        thumbnail
        banner
        isShow_answer
        isShow_rank
        isRequireLogin

*/

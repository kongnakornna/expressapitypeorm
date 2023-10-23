import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class MulContent {
    @PrimaryGeneratedColumn()
    mul_content_id!: number;
    
    @Column()
    mul_category_id!: number;

    @Column()
    mul_level_id!: number;

    @Column()
    mul_content_subject!: string;

    @Column()
    mul_content_text!: string;

    member_id!: string;

    @Column()
    approve_by!: string;

    @Column()
    mul_tag!: string;

    @Column()
    flag!: string;

    @Column()
    add_date!: string;

    @Column()
    mul_recommend!: string;

    @Column()
    mul_update_date!: string;

    @Column()
    mul_content_status!: string;

    @Column()
    mul_security_code!: string;

    @Column()
    ref_post_id!: string;

    @Column()
    year_path!: string;

    @Column()
    plookpanya_booth!: string;

    @Column()
    flag_logo!: string;

    @Column()
    grade_a!: string;

    @Column()
    content_stage!: string;

    @Column()
    view_count!: number;

    @Column()
    thumbnail_name!: string;

    @Column()
    thumbnail_path!: string;

    @Column()
    content_weight!: number;

    @Column()
    stay_time_sec!: number;

    @Column()
    publish_date!: string; 
}

/*
// table mul_content  as  MulContent
    mul_content_id
    mul_category_id
    mul_level_id
    mul_content_subject
    mul_content_text
    member_id
    approve_by
    mul_tag
    flag
    add_date
    mul_recommend
    mul_update_date
    mul_content_status
    mul_security_code
    ref_post_id
    year_path
    plookpanya_booth
    flag_logo
    grade_a
    content_stage
    view_count
    thumbnail_name
    thumbnail_path
    content_weight
    stay_time_sec
    publish_date


*/

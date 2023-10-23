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

    @Column()
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
    _mul_recommend!: string;

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
    view_count!: string;

    @Column()
    thumbnail_name!: string;

    @Column()
    thumbnail_path!: string;

    @Column()
    content_weight!: string;

    @Column()
    stay_time_sec!: string;
}
 
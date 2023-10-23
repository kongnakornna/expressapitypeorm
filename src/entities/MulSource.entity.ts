import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class MulSource{
    @PrimaryGeneratedColumn()
    mul_source_id!: number;
 
    @Column()
    mul_content_id!: number;

    @Column()
    mul_type_id!: number;

    @Column()
    mul_title!: string;

    @Column()
    mul_shortdesc!: string;
    
    @Column()
    mul_destination!: string;
    
    @Column()
    mul_md!: string;
    
    @Column()
    mul_filename!: string;
    
    @Column()
    mul_filesize!: string;
    
    @Column()
    mul_image_file!: string;
    
    @Column()
    mul_thumbnail_file!: string;
    
    @Column()
    _mul_tag!: string;
    
    @Column()
    _mul_conv_status!: string;
    
    @Column()
    _mul_file_status!: string;
    
    @Column()
    mul_source_status!: string;
    
    @Column()
    mul_source_update_datetime!: string;
    
    @Column()
    _mul_delete_flag!: string;
    
    @Column()
    is_move!: string;
    
    @Column()
    status_delete!: string;
    
    @Column()
    mul_section!: string;
    
    @Column()
    duration!: string;
    
    @Column()
    check!: string;
    
    @Column()
    content_stage!: string;
    
    @Column()
    weight!: number;
    
    @Column()
    view_count!: number;
}
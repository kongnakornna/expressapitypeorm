import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class CrsCategory {
    @PrimaryGeneratedColumn()
    category_id!: number;
 
    @Column()
    category_name!: string;

    @Column()
    sub_description!: string;
    
    @Column()
    image_cover!: string;

    @Column()
    is_delete!: number;

    @Column()
    is_enable!: number;

    @Column()
    create_date!: string;

    @Column()
    update_date!: string;

    @Column()
    file_path!: string;

    @Column()
    create_by!: string;

    @Column()
    update_by!: string;
 
}

/*
    // table crs_category  as  CrsCategory
        category_id
        category_name
        sub_description
        image_cover
        is_delete
        is_enable
        create_date
        update_date
        file_path
        create_by
        update_by
*/

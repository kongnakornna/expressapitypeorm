import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class CrsSection {
    @PrimaryGeneratedColumn() 
    section_id!: number;
 
    @Column("text", { nullable: false })
    section_name!: string;

    @Column("text", { nullable: false })
    sub_description!: string;

    @Column("text", { nullable: false })
    description!: string;

    @Column("integer", { nullable: false})
    is_enable!: number;

    @Column("integer", { nullable: false})
    is_delete!: number;

    @Column("integer", { nullable: false})
    create_by!: number;

    @Column("integer", { nullable: false})
    update_by!: number;

    @Column()
    create_date!: Date;
    
    @Column()
    update_date!: Date;
}

/*
Tb  crs_section =>  CrsSection
    section_id
    section_name
    description
    is_enable
    is_delete
    create_by
    update_by
    create_date
    update_date


*/
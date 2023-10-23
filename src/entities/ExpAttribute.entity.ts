import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExpAttribute {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    attribute_name!: string;
    
    @Column()
    attribute_banner!: string;

    @Column()
    ordering!: number;

    @Column()
    status!: number;

    @Column()
    create_date!: string;

    @Column()
    modify_date!: string;
}
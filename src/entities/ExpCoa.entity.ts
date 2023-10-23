import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExpCoa {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    occupation_id!: number;

    @Column()
    attribute_id!: number;

    @Column()
    detail!: string;

    @Column()
    sort_order!: number;

    @Column()
    status!: number;

    @Column()
    create_date!: string;

    @Column()
    modify_date!: string;
}
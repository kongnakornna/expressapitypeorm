import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExpOccupation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    occupation_parent_id?: number;

    @Column()
    occupation_name?: string;

    @Column()
    occupation_banner?: string;

    @Column()
    occupation_banner_pc?: string;

    @Column()
    occupation_banner_mb?: string;

    @Column()
    sort_order?: number;

    @Column()
    status?: number;

    @Column()
    view_count?: number;

    @Column()
    create_date?: string;

    @Column()
    modify_date?: string;
}

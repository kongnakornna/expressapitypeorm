import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class LabelTag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    label_name?: string;

    @Column()
    label_key?: number;
}

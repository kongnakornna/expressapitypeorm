import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class OrmQuestion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    cat_id?: number;

    @Column({ nullable: true })
    content_id?: number;

    @Column({ nullable: true })
    file?: string;

    @Column({ nullable: true })
    thumb_s?: string;

    @Column({ nullable: true })
    thumb_m?: string;

    @Column({ nullable: true })
    thumb_l?: string;

    @Column({ nullable: true })
    file_type?: string;

    @Column({ nullable: true })
    file_name_ser?: string;

    @Column({ nullable: true })
    file_path?: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    keyword?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    status?: string;

    @Column({ nullable: true })
    answer_id?: number;

    @Column({ nullable: true })
    pageview?: number;

    @Column({ nullable: true })
    created_by?: string;

    @Column({ nullable: true })
    created_on?: string;

    @Column({ nullable: true })
    updated_by?: string;

    @Column({ nullable: true })
    updated_on?: string;

    @Column({ nullable: true })
    media_qty?: string;

    @Column({ nullable: true })
    media_duration?: string;

    @Column({ nullable: true })
    advise?: string;

    @Column({ nullable: true })
    level_id?: string;

}
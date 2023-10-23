import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class CmsblogDetails {
    @PrimaryGeneratedColumn()
    idx!: number;

    @Column()
    title!: string;

    @Column()
    description_short!: string;

    @Column()
    description_long!: string;

    @Column()
    thumb_path!: string;

    @Column()
    banner_path!: string;

    @Column()
    parent_idx!: number;

    @Column()
    child_order!: number;

    @Column()
    credit_by!: string;

    @Column()
    record_status!: string;

    @Column()
    create_date!: string;

    @Column()
    start_date!: string;

    @Column()
    end_date!: string;

    @Column()
    event_date!: string;

    @Column()
    create_user_id!: number;
    
    @Column()
    update_date!: string;

    @Column()
    update_user_id!: number;

    @Column()
    approve_user_id!: number;

    @Column()
    seo_keywords!: string;

    @Column()
    seo_description!: string;

    @Column()
    hashtag!: string;

    @Column()
    view_count!: number;

    @Column()
    editor_picks!: number;

    @Column()
    encyclopedia!: number;

    @Column()
    adminLock!: number;

    @Column()
    isKnowledge!: number;

    @Column()
    stay_time_sec!: number;
}

/*
idx
title
description_short
description_long
thumb_path
banner_path
parent_idx
child_order
credit_by
record_status
create_date
start_date
end_date
event_date
create_user_id
update_date
update_user_id
approve_user_id
seo_keywords
seo_description
hashtag
view_count
editor_picks
encyclopedia
adminLock
isKnowledge
stay_time_sec

*/
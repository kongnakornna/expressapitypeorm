import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CmsblogCategory {
    @PrimaryGeneratedColumn()
    category_id!: number;

    @Column()
    category_parent_id!: number;

    @Column()
    category_name_th!: string;

    @Column()
    category_name_en!: string;

    @Column()
    category_name_code!: string;

    @Column()
    category_name_code_short!: string;

    @Column()
    deep_level!: number;

    @Column()
    direct_link!: string;

    @Column()
    theme_path!: string;

    @Column()
    trending!: string;

    @Column()
    sort_order!: number;

    @Column()
    child_background!: string;

    @Column()
    child_style!: string;

    @Column()
    child_template!: string;

    @Column()
    child_category_id_list!: string;

    @Column()
    list_menu_code!: string;

    @Column()
    status!: number;

    @Column()
    weight!: number;

    @Column()
    zone_id!: number;

    @Column()
    is_frontend_select!: number;

    @Column()
    pin_content_idx!: number;

    @Column()
    seo_title!: string;

    @Column()
    seo_keyword!: string;

    @Column()
    seo_desc!: string;

    @Column()
    seo_image_url!: string;

    @Column()
    fb_page_url!: string;
    
    @Column()
    ads_status!: string;

    @Column()
    icon!: string;
}

/*
cmsblog_category

category_id
category_parent_id
category_name_th
category_name_en
category_name_code
category_name_code_short
deep_level
direct_link
theme_path
trending
sort_order
child_background
child_style
child_template
child_category_id_list
list_menu_code
status
weight
zone_id
is_frontend_select
pin_content_idx
seo_title
seo_keyword
seo_desc
seo_image_url
fb_page_url
ads_status
icon


*/
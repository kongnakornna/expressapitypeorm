import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class MediaSumView {
    @PrimaryGeneratedColumn()
    view_id!: number;

    @Column({nullable:true})
    content_view_id?: number;
    
    @Column({nullable:true})
    content_view_val?: number;
    
    @Column({nullable:true})
    content_view_table?: string;
    
    @Column({nullable:true})
    last_update?: string;
}
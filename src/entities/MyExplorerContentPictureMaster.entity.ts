import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MyExplorerContentPictureMaster {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    created_at!: string;
    
    @Column()
    updated_at!: string;

    @Column()
    pic_url!: string;
    
    @Column()
    pic_type!: string;
   
    @Column()
    pic_description!: string;
}
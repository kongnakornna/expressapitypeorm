import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MyExplorerContentPicture {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    created_at!: string;
    
    @Column()
    updated_at!: string;

    @Column()
    user_id!: number;
    
    @Column()
    pic_id!: number;
}
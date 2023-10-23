import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MyExplorerContent {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    created_at!: string;
    
    @Column()
    updated_at!: string;
    
    @Column()
    user_id!: number;

    @Column()
    lifestyle_content!: string;

    @Column()
    family_content!: string;

    @Column()
    wealth_content!: string;

    @Column()
    health_content!: string;

}
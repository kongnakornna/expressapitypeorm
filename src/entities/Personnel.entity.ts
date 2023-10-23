import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Personnel {
    @PrimaryGeneratedColumn()
    personnel_id!: number;

    @Column({ nullable: true })
    psn_id?: string;

    @Column({ nullable: true })
    member_id?: string;
    
    @Column({ nullable: true })
    psn_name?: string;
    
    @Column({ nullable: true })
    psn_lastname?: string;
    
    @Column({ nullable: true })
    psn_sex?: string;
    
    @Column({ nullable: true })
    psn_birthdate?: string;
    
    @Column({ nullable: true })
    psn_email?: string;
    
    @Column({ nullable: true })
    psn_address?: string;
    
    @Column({ nullable: true })
    postal_code?: string;
    
    @Column({ nullable: true })
    school_id?: number;
    
    @Column({ nullable: true })
    school_name?: string;
    
    @Column({ nullable: true })
    psn_hometel?: string;
    
    @Column({ nullable: true })
    psn_picture?: string;
    
    @Column({ nullable: true })
    occ_id?: number;
    
    @Column({ nullable: true })
    province_id?: number;
    
    @Column({ nullable: true })
    psn_delete_flag?: string;
    
    @Column({ nullable: true })
    psn_upd_date?: string;
    
    @Column({ nullable: true })
    qual_id?: number;
    
    @Column({ nullable: true })
    psn_display_name?: string;
    
    @Column({ nullable: true })
    psn_profile_status?: string;
    
    @Column({ nullable: true })
    psn_firstcome?: string;
    
    @Column({ nullable: true })
    true_emp_code?: string;
    
    @Column({ nullable: true })
    company_id?: number;
    
    @Column({ nullable: true })
    company_name?: string;
    
    @Column({ nullable: true })
    folder_path?: string;
    
    @Column({ nullable: true })
    school_level?: string;
    
    @Column({ nullable: true })
    school_room?: string;
    
    @Column({ nullable: true })
    rand_code?: string;
    
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
@Entity()
export class UsersAccountDeleteTemp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;
    
  @Column()
  member_id!: string;

  @Column()
  user_username!: string;

  @Column()
  user_password!: string;

  @Column()
  user_password_tmp!: string;

  @Column()
  user_email!: string;

  @Column()
  user_status!: string;

  @Column()
  user_group!: string;

  @Column()
  user_permission!: string;

  @Column({ type: 'date' })
  user_create_date!: Date;

  @Column()
  user_create_ip!: string;

  @Column({ type: 'date' })
  user_active_date!: Date;

  @Column({ type: 'date' })
  user_update_date!: Date;

  @Column({ type: 'date' })
  user_login_date!: Date;

  @Column()
  user_question!: string;

  @Column()
  user_answer!: string;

  @Column()
  psn_display_name!: string;

  @Column()
  psn_display_image!: string;

  @Column()
  psn_display_banner!: string;

  @Column()
  psn_firstname!: string;

  @Column()
  psn_lastname!: string;

  @Column()
  psn_sex!: string;

  @Column()
  psn_address!: string;

  @Column()
  psn_postcode!: string;

  @Column()
  psn_province!: string;

  @Column()
  psn_tel!: string;

  @Column()
  psn_id_number!: string;

  @Column()
  psn_birthdate!: string;

  @Column()
  psn_public_status!: string;

  @Column()
  job_name!: string;

  @Column()
  job_address!: string;

  @Column()
  job_edu_name!: string;

  @Column()
  job_edu_level!: string;

  @Column()
  job_edu_degree!: string;

  @Column()
  acc_user_facebook!: string;

  @Column()
  acc_user_google!: string;

  @Column()
  acc_user_twitter!: string;

  @Column()
  acc_user_tvw!: string;

  @Column()
  acc_user_tvw_nid!: string;

  @Column()
  introduce!: string;

  @Column()
  privacy_policy_status!: string;

  @Column()
  curator_child_email!: string;

  @Column()
  salutation!: string;

  @Column()
  school_id!: string;

  @Column()
  class!: string;

  @Column()
  class_room!: string;

  @Column()
  district_id!: string;

  @Column()
  amphur_id!: string;

  @Column()
  province_id!: string;

  @Column()
  geo_id!: string;

  @Column()
  idx!: number;

  @Column()
  apple_id!: string;

  @Column()
  appuserid!: string;
    
  @Column()
  delete_date!: string;
    
  @Column()
  uid!: string; 
}

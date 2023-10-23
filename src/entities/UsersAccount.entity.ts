import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
@Entity()
export class UsersAccount {
  @PrimaryGeneratedColumn()
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

  @Column()
  user_create_date!: string;

  @Column()
  user_create_ip!: string;

  @Column()
  user_active_date!: string;

  @Column()
  user_update_date!: string;

  @Column()
  user_login_date!: string;

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
  idx!: string;

  @Column()
  apple_id!: string;

  @Column()
  appuserid!: string;

  @Column()
  uid!: string;

  @Column()
  access_token!: string;
}

/*
user_id
member_id
user_username
user_password
user_password_tmp
user_email
user_status
user_group
user_permission
user_create_date
user_create_ip
user_active_date
user_update_date
user_login_date
user_question
user_answer
psn_display_name
psn_display_image
psn_display_banner
psn_firstname
psn_lastname
psn_sex
psn_address
psn_postcode
psn_province
psn_tel
psn_id_number
psn_birthdate
psn_public_status
job_name
job_address
job_edu_name
job_edu_level
job_edu_degree
acc_user_facebook
acc_user_google
acc_user_twitter
acc_user_tvw
acc_user_tvw_nid
introduce
privacy_policy_status
curator_child_email
salutation
school_id
class
class_room
district_id
amphur_id
province_id
geo_id
idx
apple_id
appuserid
uid
access_token

*/
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, UpdateDateColumn, JoinColumn } from "typeorm";
import { UsersAccount } from "./UsersAccount.entity";
import { CrsCourse } from "./CrsCourse.entity";

@Entity()
export class CrsMyCourse {
  @PrimaryGeneratedColumn()
  my_course_id!: number;
 
  @ManyToOne(_type => UsersAccount, usersAccount => usersAccount.user_id, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user_id!: UsersAccount;
  
  @ManyToOne(_type => CrsCourse, CrsCourse => CrsCourse.course_id, { eager: false })
  @JoinColumn({ name: 'course_id' })
  course_id!: CrsCourse;
  
  @UpdateDateColumn()
  create_date!: string;

  @UpdateDateColumn()
  update_date!: string;

  @Column()
  course_progress!: number;
    
}
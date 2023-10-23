import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, UpdateDateColumn, JoinColumn } from "typeorm";
import { UsersAccount } from "./UsersAccount.entity";
import { CrsCourse } from "./CrsCourse.entity";
import { CrsCourseTask } from "./CrsCourseTask.entity";

@Entity()
export class CrsMyCourseTask {

  @PrimaryGeneratedColumn()
  course_id!: number;

  /*
  @ManyToOne(_type => CrsCourse, CrsCourse => CrsCourse.course_id, { eager: false })
  @JoinColumn({ name: 'course_id' })
  course_id!: CrsCourse;
  */

  @ManyToOne(_type => CrsCourseTask, CrsCourseTask => CrsCourseTask.course_id, { eager: false })
  @JoinColumn({ name: 'task_id' })
  task_id!: CrsCourse;

  @ManyToOne(_type => UsersAccount, usersAccount => usersAccount.user_id, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user_id!: UsersAccount;
  
  @UpdateDateColumn()
  create_date!: string;

  @UpdateDateColumn()
  update_date!: string;

  @Column()
  task_learning_status!: number;
}

/*
  --------
  crs_my_course_task
  CrsMyCourseTask
  --------
  course_id
  task_id
  user_id
  create_date
  update_date
  task_learning_status
  --------
*/
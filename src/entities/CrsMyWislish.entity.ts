import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,ManyToMany, UpdateDateColumn, JoinColumn } from "typeorm";
import { UsersAccount } from "./UsersAccount.entity";
import { CrsCourse } from "./CrsCourse.entity";
import { MulLevel } from "../entities/MulLevel.entity";
import { CrsCategory } from "../entities/CrsCategory.entity";
import { MulCategory2017 } from "../entities/MulCategory2017.entity";
@Entity()
export class CrsMyWislish {
  @PrimaryGeneratedColumn()
  wislish_id!: number;
  /*
  @ManyToMany(_type => UsersAccount, usersAccount => usersAccount.user_id, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user_id!: UsersAccount;

  @ManyToMany(_type => CrsCourse, CrsCourse => CrsCourse.course_id, { eager: false })
  @JoinColumn({ name: 'course_id' })
  course_id!: CrsCourse;
  */
  @Column()
  user_id!: number;

  @Column()
  course_id!: number;

  @Column()
  create_date!: string;

  @Column()
  update_date!: string;

  @Column()
  status!: number;
}
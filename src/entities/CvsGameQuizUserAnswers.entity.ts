import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, UpdateDateColumn, JoinColumn } from "typeorm";
import { CvsGameQuizAnswer } from "./CvsGameQuizAnswer.entity";
import { CvsGameQuizMain } from "./CvsGameQuizMain.entity";
import { UsersAccount } from "./UsersAccount.entity";

@Entity()
export class CvsGameQuizUserAnswers {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  score!: number;

  @UpdateDateColumn()
  date_create!: string;

  @ManyToOne(_type => CvsGameQuizMain, cvsGameQuizMain => cvsGameQuizMain.id, { eager: false })
  @JoinColumn({ name: 'game_id' })
  game_id!: CvsGameQuizMain;

  @ManyToOne(_type => UsersAccount, usersAccount => usersAccount.user_id, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user_id!: UsersAccount;

  @ManyToOne(_type => CvsGameQuizAnswer, CvsGameQuizAnswer => CvsGameQuizAnswer.id, { eager: false })
  @JoinColumn({ name: 'answer_id' })
  answer_id!: CvsGameQuizAnswer;
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CvsGameQuizMain } from "./CvsGameQuizMain.entity";

@Entity()
export class CvsGameQuizAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  thumb!: string;

  @Column()
  image!: string;

  @Column()
  min!: number;

  @Column()
  max!: number;

  @ManyToOne(_type => CvsGameQuizMain, cvsGameQuizMain => cvsGameQuizMain.game_quiz_answer, { eager: false })
  @JoinColumn({ name: 'quiz_main_id' })
  quiz_main_id!: CvsGameQuizMain;
}

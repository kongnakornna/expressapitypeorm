import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CvsGameQuizMain } from "./CvsGameQuizMain.entity";

@Entity()
export class CvsGameQuizQuestion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  question!: string;

  @Column()
  image!: string;

  @Column()
  question_youtube!: string;

  @ManyToOne(_type => CvsGameQuizMain, cvsGameQuizMain => cvsGameQuizMain.id, { eager: false })
  @JoinColumn({ name: 'quiz_main_id' })
  quiz_main_id!: CvsGameQuizMain;
}

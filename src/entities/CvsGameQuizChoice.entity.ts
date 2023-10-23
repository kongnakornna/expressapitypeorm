import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CvsGameQuizQuestion } from "./CvsGameQuizQuestion.entity";

@Entity()
export class CvsGameQuizChoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column()
  thumb!: string;

  @Column()
  image!: string;

  @Column()
  score!: number;

  @Column()
  answer!: number;

  @ManyToOne(_type => CvsGameQuizQuestion, cvsGameQuizQuestion => cvsGameQuizQuestion.id, { eager: false })
  @JoinColumn({ name: 'quiz_question_id' })
  quiz_question_id!: CvsGameQuizQuestion;
}

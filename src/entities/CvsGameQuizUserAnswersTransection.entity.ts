import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CvsGameQuizMain } from "./CvsGameQuizMain.entity";

@Entity()
export class CvsGameQuizUserAnswersTransection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @Column()
  sort!: number;

  @OneToMany(_type => CvsGameQuizMain, cvsGameQuizMain => cvsGameQuizMain.game_cate_id, { eager: false })
  cvs_game_quiz_main!: CvsGameQuizMain;
}

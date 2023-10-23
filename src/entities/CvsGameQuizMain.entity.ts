import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { CvsGameCategories } from "./CvsGameCategories.entity";
import { CvsGameQuizAnswer } from "./CvsGameQuizAnswer.entity";
import { CvsGameQuizQuestion } from "./CvsGameQuizQuestion.entity";
import { ExplorerCategoryQuizMap } from "./ExplorerCategoryQuizMap.entity";
import { ExplorerTypeCareer } from "./ExplorerTypeCareer.entity";

@Entity()
export class CvsGameQuizMain {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  meta_title!: string;

  @Column()
  meta_description!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  thumb!: string;

  @Column()
  image!: string;

  @Column()
  sort!: number;

  @Column()
  status!: number;

  @Column()
  view!: number;

  @Column()
  played!: number;

  @CreateDateColumn()
  cdate!: string;

  @UpdateDateColumn()
  udate!: string;

  @ManyToOne(_type => CvsGameCategories, cvsGameCategorie => cvsGameCategorie.cvs_game_quiz_main, { eager: true })
  @JoinColumn({ name: 'game_cate_id' })
  game_cate_id!: CvsGameCategories;

  @OneToMany(_type => CvsGameQuizAnswer, cvsGameQuizAnswer => cvsGameQuizAnswer.quiz_main_id, { eager: false })
  game_quiz_answer!: CvsGameQuizAnswer;

  @OneToMany(_type => CvsGameQuizQuestion, cvsGameQuizQuestion => cvsGameQuizQuestion.quiz_main_id, { eager: false })
  game_quiz_question!: CvsGameQuizQuestion;

  @OneToMany(_type => ExplorerCategoryQuizMap, explorerCategoryQuizMap => explorerCategoryQuizMap.quiz_main_id)
  explorer_category_quiz_map!: ExplorerCategoryQuizMap;
}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CvsGameQuizMain } from "./CvsGameQuizMain.entity";
import { ExplorerCategoryQuiz } from "./ExplorerCategoryQuiz.entity";
import { ExplorerCategorySkill } from "./ExplorerCategorySkill.entity";

@Entity()
export class ExplorerCategoryQuizMap {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  remark!: string;

  @Column()
  keyword!: string;

  @Column()
  image!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @Column()
  quiz_main_id!: number;

  @ManyToOne(_type => CvsGameQuizMain, cvsGameQuizMain => cvsGameQuizMain.id)
  // @JoinColumn({ name: 'quiz_main_id' })
  // quiz_main_id!: CvsGameQuizMain;

  @ManyToOne(_type => ExplorerCategoryQuiz, explorerCategoryQuiz => explorerCategoryQuiz.id)
  @JoinColumn({ name: 'explorer_category_quiz_id' })
  explorer_category_quiz_id!: ExplorerCategoryQuiz;

  @ManyToOne(_type => ExplorerCategorySkill, explorerCategorySkill => explorerCategorySkill.id)
  @JoinColumn({ name: 'explorer_category_skill_id' })
  explorer_category_skill_id!: ExplorerCategorySkill;

}
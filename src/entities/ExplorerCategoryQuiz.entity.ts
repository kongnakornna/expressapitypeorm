import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExplorerCategoryQuizMap } from "./ExplorerCategoryQuizMap.entity";

@Entity()
export class ExplorerCategoryQuiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  sort!: number;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @OneToMany(_type => ExplorerCategoryQuizMap, explorerCategoryQuizMap => explorerCategoryQuizMap.explorer_category_quiz_id)
  explorer_category_quiz_map!: ExplorerCategoryQuizMap;
}
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExplorerCategoryQuiz } from "./ExplorerCategoryQuiz.entity";

@Entity()
export class ExplorerCategorySkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column()
  sort!: number;

  @Column()
  status!: number;

  @CreateDateColumn()
  created_at!: string;

  @Column()
  created_by!: number;

  @UpdateDateColumn()
  updated_at!: string;

  @Column()
  updated_by!: number;
  

  @ManyToOne(_type => ExplorerCategoryQuiz, explorerCategoryQuiz => explorerCategoryQuiz.id)
  @JoinColumn({ name: 'explorer_category_quiz_id' })
  explorer_category_quiz_id!: ExplorerCategoryQuiz;
}
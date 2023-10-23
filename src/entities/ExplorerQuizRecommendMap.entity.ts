import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExplorerCategoryQuizMap } from "./ExplorerCategoryQuizMap.entity";
import { ExplorerFavoriteCarrer } from "./ExplorerFavoriteCarrer.entity";

@Entity()
export class ExplorerQuizRecommendMap {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @ManyToOne(_type => ExplorerCategoryQuizMap, ExplorerCategoryQuizMap => ExplorerCategoryQuizMap.quiz_main_id)
  @JoinColumn({ name: 'quiz_main_id' })
  quiz_main_id!: ExplorerCategoryQuizMap;

  @ManyToOne(_type => ExplorerFavoriteCarrer, ExplorerFavoriteCarrer => ExplorerFavoriteCarrer.career_id)
  @JoinColumn({ name: 'career_id' })
  career_id!: ExplorerFavoriteCarrer;

  @Column()
  min_score!: number;

  @Column()
  max_score!: number;

}
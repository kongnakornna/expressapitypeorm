import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";
import { IsInt, IsDate } from "class-validator";

import { ExplorerQuizRecommendMap } from "./ExplorerQuizRecommendMap.entity";
import { CvsGameQuizUserAnswers } from "./CvsGameQuizUserAnswers.entity";

@Entity()
export class ExplorerFavoriteCarrer {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @Column()
  @IsInt()
  user_id!: number;

  @Column()
  @IsInt()
  career_id!: number;

  @Column()
  @IsInt()
  favorite!: number;

}
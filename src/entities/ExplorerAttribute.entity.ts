import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ExplorerTypeCareer } from "./ExplorerTypeCareer.entity";

@Entity()
export class ExplorerAttribute {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  explorer_type_career_id!: number;

  @Column()
  name?: string;

  @Column()
  banner?: string;

  @Column()
  status?: string;

  @CreateDateColumn()
  created_at?: string;

  @UpdateDateColumn()
  udpated_at?: string;

  // @ManyToOne(_type => ExplorerTypeCareer, explorerTypeCareer => explorerTypeCareer.attribute, {eager: true})
  // @Exclude({ toPlainOnly: true })
  // @JoinColumn({name: 'explorer_type_career_id'})
  // type!: ExplorerTypeCareer;
}

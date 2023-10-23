import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ExplorerTypeCareer } from "./ExplorerTypeCareer.entity";

@Entity()
export class ExplorerCareer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: true})
  banner?: string;

  @Column({nullable: true})
  banner_pc?: string;

  @Column({nullable: true})
  banner_mb?: string;

  @Column({nullable: true})
  sort_order?: string;

  @Column({nullable: true})
  status?: string;

  @CreateDateColumn()
  created_at?: string;

  @UpdateDateColumn()
  updated_at?: string;

  @ManyToOne(() => ExplorerTypeCareer, (explorerTypeCareer) => explorerTypeCareer.explorer_career, { eager: true })
  @JoinColumn()
  explorer_type_career?: ExplorerTypeCareer;

  // @ManyToOne(_type => ExplorerTypeCareer, explorerTypeCareer => explorerTypeCareer.explorer_career, {eager: false})
  // @Exclude({ toPlainOnly: true })
  // // @JoinColumn({name: 'explorer_type_career_id'})
  // explorer_type_career?: ExplorerTypeCareer;
}

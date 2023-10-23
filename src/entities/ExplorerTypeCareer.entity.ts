import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ExplorerCareer } from "./ExplorerCareer.entity";

@Entity()
export class ExplorerTypeCareer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @OneToMany(() => ExplorerCareer, (explorerCareer) => explorerCareer.explorer_type_career, {eager: false})
  explorer_career?: ExplorerCareer;
}

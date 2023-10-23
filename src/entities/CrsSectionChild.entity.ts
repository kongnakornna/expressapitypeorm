import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,ManyToMany,  UpdateDateColumn, JoinColumn } from "typeorm";
import { CrsSection } from "./CrsSection.entity";
import { CrsCourse } from "./CrsCourse.entity";

@Entity()
export class CrsSectionChild {
  @PrimaryGeneratedColumn()
  child_id!: number;
  
  @ManyToMany(_type => CrsSection, CrsSection => CrsSection.section_id, { eager: false })
  @JoinColumn({ name: 'section_id' })
  section_id!: CrsSection;

  @ManyToOne(_type => CrsCourse, CrsCourse => CrsCourse.course_id, { eager: false })
  @JoinColumn({ name: 'course_id' })
  course_id!: CrsCourse;

  @Column()
  title!: string;

  @Column()
  link_url!: string;

  @Column()
  image!: string;

  @Column()
  sort!: number;

  @Column()
  is_enable!: number;

  @Column()
  is_delete!: number;

  @Column()
  create_by!: number;

  @Column()
  update_by!: number;

  @Column()
  create_date!: string;

  @UpdateDateColumn()
  update_date!: string;

  @Column()
  file_path!: string; 

}

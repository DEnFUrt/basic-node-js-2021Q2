import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Columns } from './column';
// import { Task } from './task';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 100 })
  title = 'Title Board';

  @OneToMany(() => Columns, (columns) => columns.board, {
    eager: true,
  })
  columns!: Columns[];
  
/*   @OneToMany(() => Task, (tasks) => tasks.board, {
    eager: true,
  })
  tasks!: Task[]; */
};

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Columns } from './column';

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

  /*   
    columns = [
      {
        id: uuid(),
        title: 'Title Column',
        order: 0,
      },
    ],

 */
}

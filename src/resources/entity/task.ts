import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 100 })
  title = 'Title Task';

  @Column('smallint')
  order = 0;

  @Column('varchar', { length: 1000 })
  description = 'Task description';

  @Column('varchar', { length: 50, nullable: true })
  userId!: string | null;

  @Column('varchar', { length: 50, nullable: true })
  boardId!: string | null;

  @Column('varchar', { length: 50, nullable: true })
  columnId!: string | null;
}

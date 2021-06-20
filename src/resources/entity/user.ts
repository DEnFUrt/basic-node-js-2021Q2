import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 20 })
  password = 'P@55w0rd';

  @Column('varchar', { length: 50 })
  name = 'USER';

  @Column('varchar', { length: 50, unique: true })
  login = 'user';
}

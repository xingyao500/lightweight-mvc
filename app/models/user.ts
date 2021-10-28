import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Repo  from '../decorators/repository'

@Repo('UserRepository')
@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'string',
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  age: number;

  @CreateDateColumn({
    type: 'date',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'date',
    name: 'updated_at',
  })
  updatedAt: Date;
}

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity  } from 'typeorm';

@Entity()
export class User extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ unique: true })
  name: string = ''

  @Column()
  password: string = ''

  @Column()
  imgName: string = ''

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

}

export default User

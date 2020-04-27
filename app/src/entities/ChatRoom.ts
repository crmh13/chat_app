import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity  } from 'typeorm';

@Entity()
export class ChatRoom extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string = ''

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

}

export default ChatRoom

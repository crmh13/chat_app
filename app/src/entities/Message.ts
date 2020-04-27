import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn  } from 'typeorm';
import { User } from './User'
import { ChatRoom } from './ChatRoom'

@Entity()
export class Message extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(type => User)
  @JoinColumn()
  user?: User

  @ManyToOne(type => ChatRoom)
  @JoinColumn()
  chatRoom?: ChatRoom

  @Column()
  message: string = ''

  @Column()
  userName: string = ''

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

}

export default Message

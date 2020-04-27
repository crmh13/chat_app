import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn  } from 'typeorm';
import { User } from './User'
import { ChatRoom } from './ChatRoom'

@Entity()
export class RoomUser extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(type => User)
  @JoinColumn()
  user?: User

  @ManyToOne(type => ChatRoom)
  @JoinColumn()
  chatRoom?: ChatRoom

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

}

export default RoomUser

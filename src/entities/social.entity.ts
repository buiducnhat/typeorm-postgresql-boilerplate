import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

export enum SocialProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socialId: string;

  @Column({ type: 'enum', enum: SocialProvider })
  provider: SocialProvider;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @ManyToOne(() => User, user => user.socials)
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}

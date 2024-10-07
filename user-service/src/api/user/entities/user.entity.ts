import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ nullable: false, primary: true })
  username: string;

  @Column()
  password: string;
}

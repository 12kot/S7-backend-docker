import { Column, Entity } from 'typeorm';

//сущность юзера. В базе у нас будет юзер с такими колонками
@Entity()
export class User {
  //первичный не нулабле. string
  @Column({ nullable: false, primary: true })
  username: string;

  @Column()
  //не нулабле. string
  password: string;
}

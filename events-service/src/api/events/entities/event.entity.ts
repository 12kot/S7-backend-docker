import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//1 в 1 как и auth-service
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({
    nullable: false,
    //автоматически заносим текущую дату в таблицу при создании ивента
    default: () => 'CURRENT_TIMESTAMP()',
  })
  date: string;
}

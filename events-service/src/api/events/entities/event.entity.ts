import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP()',
  })
  date: string;
}

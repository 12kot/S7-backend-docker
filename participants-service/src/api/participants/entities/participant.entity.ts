import { Column, Entity } from 'typeorm';

@Entity()
export class Participant {
  @Column({ primary: true })
  username: string;

  @Column({ primary: true })
  eventId: number;
}

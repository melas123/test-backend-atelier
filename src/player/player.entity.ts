import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  shortname: string;

  @Column()
  sex: string;

  @Column({ type: 'json' })
  country: { picture: string; code: string };

  @Column()
  picture: string;

  @Column({ type: 'json' })
  data: {
    rank: number;
    points: number;
    weight: number;
    height: number;
    age: number;
    last: number[];
  };
}

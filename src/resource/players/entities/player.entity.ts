import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

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

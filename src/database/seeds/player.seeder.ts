import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Player } from '../../resource/players/entities/player.entity';
import { data } from './headtohead';

export default class PlayerSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Player);

    await repository.save(data);
  }
}

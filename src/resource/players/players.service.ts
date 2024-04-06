import { Injectable, NotFoundException } from '@nestjs/common';
import { bestCountry, dmiAverage, median } from '../../utils/utils';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor() {}
  findAll(): Promise<Player[]> {
    return Player.query(
      `Select * from player order by JSON_EXTRACT(data, '$.rank')`,
    );
  }

  async findOne(id: number): Promise<Player> {
    const player = await Player.findOneBy({ id });
    if (!player) {
      throw new NotFoundException('Player not found.');
    }
    return player;
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await Player.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async getStatistics() {
    const result = await Player.find();

    return {
      bestCountry: bestCountry(result),
      averageDmi: dmiAverage(result),
      medianSize: median(result),
    };
  }
}

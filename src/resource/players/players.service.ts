import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  findAll() {
    return Player.query(
      `Select * from player order by JSON_EXTRACT(data, '$.rank')`,
    );
  }

  async findOne(id: number) {
    const player = await Player.findOneBy({ id });
    if (!player) {
      throw new NotFoundException('Player not found.');
    }
    return player;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private readonly playerRepo: Repository<Player>,
  ) {}
  findAll(): Promise<Player[]> {
    return this.playerRepo.query(
      `Select * from player order by JSON_EXTRACT(data, '$.rank')`,
    );
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playerRepo.findOneBy({ id });
    if (!player) {
      throw new NotFoundException('Player not found.');
    }
    return player;
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.playerRepo.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async getStatistics() {
    const result = await this.playerRepo.find();

    return {
      bestCountry: this.bestCountry(result),
      averageDmi: this.dmiAverage(result),
      medianSize: this.median(result),
    };
  }

  bestCountry = (listPlayers) => {
    const countries = [];
    listPlayers.forEach((element) => {
      countries.push({
        country: element.country.code,
        wins: this.calculateWins(element.data.last),
      });
    });
    return countries.reduce(function (prev, current) {
      return prev && prev.wins > current.wins ? prev : current;
    });
  };

  dmiAverage = (listPlayers) => {
    const total = listPlayers.reduce((acc, current) => {
      const imc =
        current.data.weight / 1000 / Math.pow(current.data.height / 100, 2);
      return acc + imc;
    }, 0);
    return total / listPlayers.length;
  };

  calculateWins = (str) => {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += parseInt(str[i]);
    }
    return sum;
  };

  median(elements) {
    const medianHeightArr = elements.map((element) => element.data.height);

    medianHeightArr.sort(function (a, b) {
      return a - b;
    });

    const half = Math.floor(medianHeightArr.length / 2);

    if (medianHeightArr.length % 2) return medianHeightArr[half];

    return (medianHeightArr[half - 1] + medianHeightArr[half]) / 2.0;
  }
}

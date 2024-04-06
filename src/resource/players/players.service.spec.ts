import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { data } from '../../database/seeds/headtohead';
import { Player } from './entities/player.entity';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;
  let repo: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            query: jest.fn().mockResolvedValue(data),
            find: jest.fn().mockResolvedValue(data),
            findOneBy: jest.fn().mockResolvedValue(data[0]),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    repo = module.get<Repository<Player>>(getRepositoryToken(Player));
    service = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of players', async () => {
      const players = await service.findAll();
      expect(players).toEqual(data);
    });
  });

  describe('getOne', () => {
    it('should get a single player', () => {
      const repoSpy = jest.spyOn(repo, 'findOneBy');
      expect(service.findOne(1)).resolves.toEqual(data[0]);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(service.remove(123)).resolves.toEqual({ deleted: true });
    });
    it('should return {deleted: false, message: err.message}', async () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.remove(896)).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
      expect(repoSpy).toBeCalledWith({ id: 896 });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });

  describe('get statistics', () => {
    it('should return an object of statistics', async () => {
      const statistics = await service.getStatistics();
      expect(statistics).toEqual({
        averageDmi: 23.357838995505837,
        bestCountry: {
          country: 'SRB',
          wins: 5,
        },
        medianSize: 185,
      });
    });
  });
});

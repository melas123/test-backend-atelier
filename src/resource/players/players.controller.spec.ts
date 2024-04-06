import { Test, TestingModule } from '@nestjs/testing';
import { data } from '../../database/seeds/headtohead';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

describe('PlayersController', () => {
  let controller: PlayersController;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get all players', () => {
    it('should call the service', () => {
      playersService.findAll = jest.fn().mockReturnValue({ data: [] });
      controller.findAll();
      expect(playersService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should returns the data', async () => {
      playersService.findAll = jest.fn().mockReturnValue([{}, {}]);
      const result = await controller.findAll();
      expect(result.length).toEqual(2);
    });
  });

  describe('Get a player', () => {
    it('should call the service', () => {
      playersService.findOne = jest.fn().mockReturnValue({ data: {} });
      controller.findOne({ id: 22 });
      expect(playersService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should returns the data', async () => {
      playersService.findOne = jest.fn().mockReturnValue(data[0]);
      const result = await controller.findOne({ id: data[0].id });
      expect(result.id).toEqual(data[0].id);
    });
  });

  describe('Get a statistics', () => {
    it('should call the service', () => {
      playersService.getStatistics = jest.fn().mockReturnValue({
        bestCountry: {},
        averageDmi: 22,
        medianSize: 33,
      });
      controller.getStatistics();
      expect(playersService.getStatistics).toHaveBeenCalledTimes(1);
    });

    it('should returns the data', async () => {
      playersService.getStatistics = jest.fn().mockReturnValue({
        bestCountry: {},
        averageDmi: 22,
        medianSize: 33,
      });

      const result = await controller.getStatistics();
      expect(result.averageDmi).toEqual(22);
      expect(result.medianSize).toEqual(33);
    });
  });

  describe('delete a player', () => {
    it('should call the service', () => {
      playersService.remove = jest.fn().mockReturnValue({});
      controller.remove({ id: 22 });
      expect(playersService.remove).toHaveBeenCalledTimes(1);
    });

    it('should returns void', async () => {
      playersService.remove = jest.fn().mockResolvedValue({});
      const result = await controller.remove({ id: data[0].id });
      expect(result).toEqual({});
    });
  });
});

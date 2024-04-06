import { Controller, Delete, Get, Param, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../http-exception.filter';
import { PlayersService } from './players.service';
import { DeleteOneParams } from './validators/deleteOne.validator';
import { FindOneParams } from './validators/findOne.validator';

@UseFilters(HttpExceptionFilter)
@Controller()
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of players ordered by rank' })
  findAll() {
    return this.playersService.findAll();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get some statistics' })
  getStatistics() {
    return this.playersService.getStatistics();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get a player by id' })
  @ApiResponse({
    status: 200,
    description: 'Ok.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findOne(@Param() params: FindOneParams) {
    return this.playersService.findOne(+params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete a player by his id' })
  remove(@Param('id') params: DeleteOneParams) {
    return this.playersService.remove(+params.id);
  }
}

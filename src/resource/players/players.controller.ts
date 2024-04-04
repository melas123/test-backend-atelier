import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersService } from './players.service';
import { FindOneParams } from './validators/findOne.validator';

@UseFilters(HttpExceptionFilter)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of players ordered by rank' })
  findAll() {
    return this.playersService.findAll();
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}

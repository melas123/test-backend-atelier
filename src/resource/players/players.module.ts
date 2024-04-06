import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from 'src/database/database.module';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  controllers: [PlayersController],
  providers: [
    PlayersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [DatabaseModule],
})
export class PlayersModule {}

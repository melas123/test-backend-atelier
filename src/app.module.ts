import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { PlayersController } from './resource/players/players.controller';
import { PlayersModule } from './resource/players/players.module';
import { PlayersService } from './resource/players/players.service';

@Module({
  imports: [DatabaseModule, PlayersModule],
  controllers: [PlayersController],
  providers: [
    PlayersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

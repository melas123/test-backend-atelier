import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PlayersModule } from './resource/players/players.module';

@Module({
  imports: [DatabaseModule, PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

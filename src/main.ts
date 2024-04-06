import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PlayersModule } from './resource/players/players.module';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(PlayersModule);

  const config = new DocumentBuilder()
    .setTitle('Test Technique L’Atelier - Backend')
    .setDescription('The players API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);

  // hot reload configs
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //todo: Usa los pipes para validaciones globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //* transforma a números los id
    }),
  );

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();

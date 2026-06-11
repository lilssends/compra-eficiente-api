import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
      app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        app.enableCors();

          const config = new DocumentBuilder()
              .setTitle('Compra Eficiente API')
                  .setDescription('API do aplicativo Compra Eficiente')
                      .setVersion('1.0')
                          .addBearerAuth()
                              .build();
                                const document = SwaggerModule.createDocument(app, config);
                                  SwaggerModule.setup('docs', app, document);

                                    const port = process.env.PORT || 3000;
                                      await app.listen(port);
                                        console.log(`Application running on port ${port}`);
                                        }

                                        bootstrap();

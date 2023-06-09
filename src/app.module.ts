import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'nestdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //todo lo que este en el root en cualquier carpeta y sea .entity.ts o js, cargalo
      synchronize: true, //Una vez leida, creala y sincronizala
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

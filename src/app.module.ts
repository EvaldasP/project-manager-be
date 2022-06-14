import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://Evaldas:${process.env.DB_PASSWORD}@projectmanager.lfisd3d.mongodb.net/?retryWrites=true&w=majority`,
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

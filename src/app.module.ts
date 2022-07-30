import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './services/auth/auth.module';

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
})
export class AppModule {}

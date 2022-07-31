import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    AuthModule,
    ProjectModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://Evaldas:${process.env.DB_PASSWORD}@projectmanager.lfisd3d.mongodb.net/?retryWrites=true&w=majority`,
      }),
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}

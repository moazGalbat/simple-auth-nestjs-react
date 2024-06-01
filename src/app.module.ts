import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://moazgalbat:SAnWzTBMlGT0wX3m@cluster0.ulbb7za.mongodb.net/api?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

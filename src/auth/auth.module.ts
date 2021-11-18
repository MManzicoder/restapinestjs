import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserSchema, User } from '../students/students.model';

@Module({
  imports: [
    MongooseModule.forFeature({name: User.name, Schema: UserSchema})
  ],
  controllers: [AuthController],
  providers: [AuthService]
})

export default class AuthModule {}
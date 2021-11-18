import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserSchema, User } from '../students/students.model';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: "lovelymom100percent"
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})

export default class AuthModule {}
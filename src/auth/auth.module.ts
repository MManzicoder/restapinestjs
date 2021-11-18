import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserSchema, User } from '../students/students.model';
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import * as configs from "../../config/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: "lovelymom100percent"
    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.example.com",
        secure: true,
        auth: {
          user: configs.EmailOptions.email,
          pass: configs.EmailOptions.password
        }
       },
       defaults: {
        from: `${configs.EmailOptions.email}`,
      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})

export default class AuthModule {}
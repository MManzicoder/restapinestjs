import { Module } from "@nestjs/common";
import StudentController from './students.controller';
import StudentsService from './students.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema, Student, User, UserSchema } from './students.model';
import { JwtModule } from "@nestjs/jwt";
import * as configs from "../../config/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
     JwtModule.register({
      secret: configs.TOKEN_SECRET
    }),
  ],
  controllers:[StudentController],
  providers: [StudentsService],

})
export default class StudentsModule {}

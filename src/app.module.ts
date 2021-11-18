import { Module } from '@nestjs/common';
import StudentsModule from './students/students.module';
import AuthModule from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [StudentsModule, AuthModule, MongooseModule.forRoot("mongodb://localhost/nest_api",{autoCreate: true})]
})
export class AppModule {}
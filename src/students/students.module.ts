import { Module } from "@nestjs/common";
import StudentController from './students.controller';

@Module({
  imports: [StudentController]
})

import { Module } from "@nestjs/common";
import StudentController from './students.controller';
import StudentsService from './students.service';


@Module({
  imports: [],
  controllers:[StudentController],
  providers: [StudentsService]
})
export default class StudentsModule {}

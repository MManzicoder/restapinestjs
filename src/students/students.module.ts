import { Module } from "@nestjs/common";
import StudentController from './students.controller';
import StudentsService from './students.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema, Student} from './students.model';
import StudentController from '../../dist/students/students.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}])
  ],
  controllers:[StudentController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export default class StudentsModule {}

import { Module } from "@nestjs/common";
import StudentController from './students.controller';
import StudentsService from './students.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema, Student} from './students.model';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}])
  ],
  controllers:[StudentController],
  providers: [StudentsService]
})
export default class StudentsModule {}

import { Module } from "@nestjs/common";
import StudentController from './students.controller';
import StudentsService from './students.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './students.model';


@Module({
  imports: [
    MongooseModule.forFeature([{name: "Students", schema: StudentSchema}])
  ],
  controllers:[StudentController],
  providers: [StudentsService]
})
export default class StudentsModule {}

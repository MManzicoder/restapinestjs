import { Injectable } from '@nestjs/common';
import { Student } from './students.model';
import { Message } from '../util/message';
import { StudentModel } from '../schemas/student.model';

@Injectable()
export default class StudentsService{
  students: Student[] = [];
  public getAll(): Student[]{
    const students = StudentModel.find().exec();
    console.log(students);
    return this.students;
  }
  public addStudent(names: string, email: string): Student{
   
  }
  public editStudent(id: string, names: string, email: string): Student{
   
    
  }
  public deleteStudent(id: string): {message: string, students: Student[]}{
    

}
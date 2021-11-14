import { Injectable } from '@nestjs/common';
import { Student } from './students.model';
import { Message } from '../util/message';

@Injectable()
export default class StudentsService{
  students: Student[] = [];
  public getAll(): Student[]{
    return this.students;
  }
  public addStudent(names: string, email: string): Student{
    let date = new Date();
    let id = date.toISOString() + (this.students.length+1).toString();
    const student = new Student(id, names, email);
    this.students.push(student);
    return student;
  }
  public editStudent(id: string, names: string, email: string): Student{
    let targetProduct = this.students.find((st, i) => st.id.toString() === id.toString());
    console.log(targetProduct);
    this.students.map(st => {
      if (st.id === id) {
        st.names = names;
        st.email = email;
       }
    })
    return this.students.filter(st => st.id === id)[0];
  }
  public deleteStudent(id: string): {message: string, students: Student[]}{
    this.students = this.students.filter(std => std.id !== id);
    let response = {
      message: "Deleted record successfully",
      students: this.students
    }
    return response;
  }
}
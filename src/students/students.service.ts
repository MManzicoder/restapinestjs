import { Injectable } from '@nestjs/common';
import { Student } from './students.model';

@Injectable()
export default class StudentsService{
  students: Student[] = [];
  public getAll(): Student[]{
    return this.students;
  }
  public addStudent(names: string, email: string): Student{
    let id = Date.toString() + email.substr(0, 3);
    const student = new Student(id, names, email);
    this.students.push(student);
    return student;
  }
  public editStudent(id: string,names: string, email: string): Student{
    this.students.map(st => {
      if (st.id === id) {
        st.names = names;
        st.email = email;
       }
    })
    return this.students.filter(st => st.id === id)[0];
  }
  public deleteStudent(id: string): { message: string }{
    this.students = this.students.filter(std => std.id !== id);
    return { message: "Deleted record successfully" };
  }
}
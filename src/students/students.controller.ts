import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";


import { Student } from './students.model';
import StudentsService from './students.service';
import { Message } from '../util/message';

@Controller("students")

export default class StudentController{

  constructor(private readonly studentsService: StudentsService) { }
  
  @Get()
  public getAll(): Student[]{
    return this.studentsService.getAll();
  }
  @Post()
  public addStudent(@Body() userInfo: Student): Student {
    return this.studentsService.addStudent(userInfo.names, userInfo.email);
  }

  @Put(":id")
  public updateStudent(@Param("id") id: string, @Body() userInfo: Student): Student{
    console.log(id);
    return this.studentsService.editStudent(id, userInfo.names, userInfo.email);
    
  }

  @Delete(":id")
  public deleteStudent(@Param("id") id: string): {message: string, students: Student[]}{
    return this.studentsService.deleteStudent(id);
  }
  
}

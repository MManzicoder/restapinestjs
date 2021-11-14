import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { Student } from './students.model';
import StudentsService from './students.service';

@Controller("students")

export default class StudentController{

  constructor(private readonly studentsService: StudentsService) { }
  
  @Get()
  public getAll(): Student[]{
    return this.studentsService.getAll();
  }
  @Post()
  public addStudent(@Body() names: string, @Body() email: string): Student {
    return this.studentsService.addStudent(names, email);
  }

  @Put(":id")
  public updateStudent(@Param(":id") id: string, @Body() names: string, @Body() email: string): Student{
    return this.studentsService.editStudent(id, names, email);
  }

  @Delete(":id")
  public deleteStudent(@Param(":id") id: string): {message: string}{
    return this.studentsService.deleteStudent(id);
  }
  
}

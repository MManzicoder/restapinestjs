import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StudentsService } from './students.service';
import { Student } from './students.model';

@Controller("students")

export default class StudentController{
  constructor(private readonly studentsService: StudentsService){}
  @Get()
  public sayHello(): Student[]{
    return this.studentsService.getAll();
  }
  @Post()
  public addStudent(@Body() names: string, @Body() email: string): Student {
    return this.studentsService.addStudent(names, email);
  }

  @Put(":id")
  public updateStudent(@Param(":id") id: string, @Body() names: string, @Body() email: string): Student{
    return this.updateStudent(id, names, email);
  }

  
  @Delete(":id")
  public deleteStudent(@Param(":id") id: string): Student{
    return this.deleteStudent(id);
  }
  
}

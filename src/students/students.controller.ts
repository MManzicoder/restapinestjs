import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Student } from './students.model';
import StudentsService from './students.service';
import { Message } from '../util/message';

@Controller("students")

export default class StudentController{

  constructor(private readonly studentsService: StudentsService) { }
  
  @Get()
  public getAll(){
    return this.studentsService.getAll();
  }
  @Post()
  public addStudent(@Body() userInfo){
    return this.studentsService.addStudent(userInfo);
  }

  @Put(":id")
  public updateStudent(@Param("id") id: string, @Body() userInfo: Student){
    return this.studentsService.editStudent(id, userInfo.names, userInfo.email);
  }

  @Delete(":id")
  public deleteStudent(@Param("id") id: string){
    return this.studentsService.deleteStudent(id);
  }
  
}

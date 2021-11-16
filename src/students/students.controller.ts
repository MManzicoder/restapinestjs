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
    // return this.addStudent(userInfo.names, userInfo.email);
    this.studentsService.addStudent(userInfo);
  }

  @Put(":id")
  public updateStudent(@Param("id") id: string, @Body() userInfo: Student){
    console.log(id);
    
  }

  @Delete(":id")
  public deleteStudent(@Param("id") id: string){
    
  }
  
}

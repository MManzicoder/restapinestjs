import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Student, StudentDocument, StudentResponse } from './students.model';
import { Message } from '../util/message';
import { Model } from 'mongoose';


@Injectable()
export default class StudentsService{
  constructor(@InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>) { }
  async getAll(){
    let students = await this.studentModel.find().exec();
    return students;
  }
  async addStudent(userInfo){
    const newStudent = new this.studentModel({
      names: userInfo.names,
      email: userInfo.email
    })
    // const  { _id, names, email, createdAt, updatedAt } = await newStudent.save();
    const result = await newStudent.save();
    // const res = new StudentResponse(_id, names, email, createdAt, updatedAt);
    return result;
  }
  public editStudent(id: string, names: string, email: string){
    //editing user record
    
  }
  public deleteStudent(id: string){
    //deleting user record

}
}
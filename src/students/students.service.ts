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
    const result = await newStudent.save();
    return result;
  }
  async editStudent(id: string, names: string, email: string){
    const student = await this.studentModel.findByIdAndUpdate(id, { names, email }, {new: true});
    if (!student) return { error: "Student not found" };
    return student;
  }
  async deleteStudent(id: string){
    const student = await this.studentModel.findByIdAndRemove(id);
    if (!student) return { error: "Student with id " + id + " not found" };
    return { message: "Deleted record successfully!" };

}
}
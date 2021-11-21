import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Student, StudentDocument, StudentResponse, UserDocument, User } from './students.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export default class StudentsService{
  constructor(@InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>,
    private readonly jwtService: JwtService,
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) { }
  async getAll(req) {
    
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
  async checkAuth(req) {
      const { _id } = this.jwtService.verify(req.headers.bearer);
      const user = await this.userModel.findById(_id);
      if (!user) throw new UnauthorizedException("unauthorized");
     
} 
}



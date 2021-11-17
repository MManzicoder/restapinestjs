import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from '../students/students.model';

@Injectable()
export class AuthService{
  constructor(
    @InjectModel(Student.name) private readonly userModel: Model<UserDocument>
  ) { }
  registerUser(user) {
    
  }

  loginUser(user) {
    
  }
}
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {User, UserDocument } from '../students/students.model';

@Injectable()
export class AuthService{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    private readonly jwtService: 
  ) { }
  async registerUser(user) {
   const userMatch = await this.userModel.findOne(user.email); 
   if(userMatch) throw new UnauthorizedException("Email already exists");
   if(user.password === "") throw new UnauthorizedException("Password required!");
   const newUser = new this.userModel({
     names: user.names,
     username: user.username,
     email: user.email,
     password: user.password
   })   
    const data = await newUser.save();
  }

 async loginUser(user) {
    
  }
}
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"
import mongoose from 'mongoose';
export type StudentDocument = Student & Document;

// export const studentSchema = new mongoose.Schema({
//   names: {
//     type: String,
//     required: true,
//     max: 30
//   },
//   email: {
//     type: String,
//     required: true,
//     max: 25,
//   }
// }, {
//   timestamps: true
// })
@Schema({timestamps: true})
export class Student{
  @Prop({max: 40})
    names: string;
  @Prop({max: 30})
    email: string;
}
export class StudentResponse{
  public _id: string;
  public names: string;
  public email: string;
  public createdAt: string;
  public updatedAt: string;
 constructor(id: string, names: string, email: string, createdAt: string, updatedAt: string){
   this._id = id;
   this.names = names;
   this.email = email;
   this.createdAt = createdAt;
   this.updatedAt = updatedAt;
 }
}

export const StudentSchema = SchemaFactory.createForClass(Student);
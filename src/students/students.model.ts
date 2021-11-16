import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Student{
  @Prop()
    names: string;
  @Prop()
    email: string;
      
}

export const StudentSchema = SchemaFactory.createForClass(Student);
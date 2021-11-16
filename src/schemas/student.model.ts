import mongoose from "mongoose";
const  studentSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const StudentModel = mongoose.model("student", studentSchema);
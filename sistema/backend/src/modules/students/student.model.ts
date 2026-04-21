import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true, minlength: 11, maxlength: 11 },
    email: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export const StudentModel = model('Student', studentSchema);

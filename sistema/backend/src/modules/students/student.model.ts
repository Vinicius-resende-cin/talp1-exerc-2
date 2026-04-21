import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true, unique: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

export const StudentModel = model('Student', studentSchema);

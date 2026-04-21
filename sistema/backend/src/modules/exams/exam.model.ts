import { Schema, model } from 'mongoose';

const examSchema = new Schema(
  {
    subject: { type: String, required: true },
    grade: { type: String, enum: ['MANA', 'MPA', 'MA'], required: true },
    studentId: { type: String, required: true }
  },
  { timestamps: true }
);

export const ExamModel = model('Exam', examSchema);

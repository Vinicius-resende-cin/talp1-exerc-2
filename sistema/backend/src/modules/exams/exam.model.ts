import { Schema, model } from 'mongoose';

const examSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: String, required: true },
    maxScore: { type: Number, required: true },
    studentId: { type: String, required: true }
  },
  { timestamps: true }
);

export const ExamModel = model('Exam', examSchema);

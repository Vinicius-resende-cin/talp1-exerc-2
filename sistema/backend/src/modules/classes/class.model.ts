import { Schema, model } from 'mongoose';

const courseClassSchema = new Schema(
  {
    subject: { type: String, required: true },
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    students: [{ type: String, required: true }]
  },
  { timestamps: true }
);

export const CourseClassModel = model('CourseClass', courseClassSchema);

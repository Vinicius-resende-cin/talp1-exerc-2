import nodeCron from 'node-cron';
import nodemailer from 'nodemailer';
import { ExamModel } from '../modules/exams/exam.model';
import { StudentModel } from '../modules/students/student.model';

// Create a generic email transporter using Ethereal or mock transport
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'test@ethereal.email',
    pass: 'testpass'
  }
});

export const startGradeNotificationJob = () => {
  // Run at 23:59 every day
  nodeCron.schedule('59 23 * * *', async () => {
    try {
      console.log('Running daily grade notification job...');
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // Find exams updated today
      const updatedExams = await ExamModel.find({
        updatedAt: { $gte: startOfDay, $lte: endOfDay }
      }).lean();

      if (!updatedExams.length) {
        console.log('No grades updated today.');
        return;
      }

      // Group by studentId
      const groupedByStudent: Record<string, typeof updatedExams> = {};
      for (const exam of updatedExams) {
        if (!groupedByStudent[exam.studentId]) {
          groupedByStudent[exam.studentId] = [];
        }
        groupedByStudent[exam.studentId].push(exam);
      }

      // Send emails
      for (const [studentId, exams] of Object.entries(groupedByStudent)) {
        const student = await StudentModel.findById(studentId).lean();
        if (!student || !student.email) continue;

        const gradesListHtml = exams
          .map(exam => `<li>${exam.subject}: ${exam.grade}</li>`)
          .join('');

        const mailOptions = {
          from: '"School System" <no-reply@school.com>',
          to: student.email,
          subject: 'Daily Grade Updates',
          html: `<p>Hello ${student.name},</p>
                 <p>The following grades were updated today:</p>
                 <ul>${gradesListHtml}</ul>
                 <p>Best regards,<br>School Administration</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${student.email}: ${info.messageId}`);
      }
    } catch (error) {
      console.error('Error in daily grade notification job:', error);
    }
  });

  console.log('Grade notification job scheduled.');
};

import React, { useEffect, useState } from 'react';
import { Student } from '../types/student';
import { Exam, Grade } from '../types/exam';
import { getStudents, getExams, createExam, updateExam, deleteExam } from '../services/api';

export function GradeManager(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  
  const [form, setForm] = useState<{ studentId: string; subject: string; grade: Grade }>({
    studentId: '',
    subject: '',
    grade: 'MANA'
  });

  const loadData = async () => {
    try {
      const [studentsData, examsData] = await Promise.all([getStudents(), getExams()]);
      setStudents(studentsData);
      setExams(examsData);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentId || !form.subject) return;

    try {
      // Check if this student already has an exam for this subject
      const existingExam = exams.find(ex => ex.studentId === form.studentId && ex.subject.toLowerCase() === form.subject.toLowerCase());
      if (existingExam && existingExam.id) {
        await updateExam(existingExam.id, { grade: form.grade });
      } else {
        await createExam({ studentId: form.studentId, subject: form.subject, grade: form.grade });
      }
      setForm({ ...form, subject: '' });
      loadData();
    } catch (err) {
      console.error('Failed to save grade', err);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (confirm('Remove this grade?')) {
      try {
        await deleteExam(id);
        loadData();
      } catch (err) {
        console.error('Failed to delete grade', err);
      }
    }
  };

  // Extract unique subjects across all exams to build table columns
  const uniqueSubjects = Array.from(new Set(exams.map(e => e.subject))).sort();

  return (
    <div className="student-list">
      <h2>Grade Management</h2>

      <form className="student-form" onSubmit={handleSave}>
        <h3>Assign / Update Grade</h3>
        <div className="form-group">
          <label>Student:</label>
          <select name="studentId" required value={form.studentId} onChange={handleChange}>
            <option value="" disabled>-- Select a student --</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input required type="text" name="subject" value={form.subject} onChange={handleChange} list="subjects-list" placeholder="e.g. Mathematics" />
          <datalist id="subjects-list">
            {uniqueSubjects.map(sub => <option key={sub} value={sub} />)}
          </datalist>
        </div>
        <div className="form-group">
          <label>Grade:</label>
          <select name="grade" value={form.grade} onChange={handleChange}>
            <option value="MANA">MANA</option>
            <option value="MPA">MPA</option>
            <option value="MA">MA</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">Save Grade</button>
      </form>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              {uniqueSubjects.map(sub => (
                <th key={sub}>{sub}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(students) || students.length === 0 ? (
              <tr>
                <td colSpan={uniqueSubjects.length + 1} style={{ textAlign: 'center' }}>No students found.</td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  {uniqueSubjects.map(sub => {
                    const exam = exams.find(e => e.studentId === student.id && e.subject === sub);
                    return (
                      <td key={sub}>
                        {exam ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className={`badge ${exam.grade.toLowerCase()}`}>{exam.grade}</span>
                            <button type="button" onClick={() => handleDelete(exam.id)} className="btn-icon" title="Remove grade">×</button>
                          </div>
                        ) : (
                          <span style={{ color: '#ccc' }}>-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

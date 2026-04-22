import React, { useState, useEffect } from 'react';
import { Class } from '../types/class';
import { Student } from '../types/student';
import { Exam } from '../types/exam';
import { getClasses, createClass, updateClass, deleteClass, getStudents, addStudentToClass, getExams } from '../services/api';

export function ClassManager(): JSX.Element {
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [formSubject, setFormSubject] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formSemester, setFormSemester] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudentToAdd, setSelectedStudentToAdd] = useState('');

  useEffect(() => {
    loadClasses();
    loadStudents();
    loadExams();
  }, []);

  async function loadExams() {
    try {
      const data = await getExams();
      setExams(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadClasses() {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadStudents() {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleAddStudent() {
    if (selectedClass && selectedStudentToAdd) {
      await addStudentToClass(selectedClass.id, selectedStudentToAdd);
      setSelectedStudentToAdd('');
      await loadClasses();
      
      // Update selectedClass manually to reflect new state
      const updatedClasses = await getClasses();
      const updatedSelected = updatedClasses.find(c => c.id === selectedClass.id);
      if (updatedSelected) {
        setSelectedClass(updatedSelected);
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await createClass({
      subject: formSubject,
      year: parseInt(formYear, 10),
      semester: parseInt(formSemester, 10),
    });
    setFormSubject('');
    setFormYear('');
    setFormSemester('');
    setShowForm(false);
    loadClasses();
  }

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this class?')) {
      await deleteClass(id);
      loadClasses();
    }
  }

  if (selectedClass) {
    const enrolledStudents = students.filter(s => selectedClass.students?.includes(s.id!));
    const availableStudents = students.filter(s => !selectedClass.students?.includes(s.id!));

    return (
      <div>
        <h2>information about the class "{selectedClass.subject}"</h2>
        <button onClick={() => setSelectedClass(null)}>Back to Classes</button>
        
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h3>Add Student</h3>
          <select 
            value={selectedStudentToAdd} 
            onChange={(e) => setSelectedStudentToAdd(e.target.value)}
          >
            <option value="">Select a student...</option>
            {availableStudents.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.cpf})</option>
            ))}
          </select>
          <button onClick={handleAddStudent} disabled={!selectedStudentToAdd}>Add</button>
        </div>

        {enrolledStudents.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>CPF</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map(s => {
                const exam = exams.find(e => e.studentId === s.id && e.subject.toLowerCase() === selectedClass.subject.toLowerCase());
                return (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.cpf}</td>
                    <td>{exam ? exam.grade : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No students enrolled.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Classes</h2>
      <button aria-label="Add New Class" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Class'}
      </button>

      {showForm && (
        <form onSubmit={handleSave} aria-label="Add New Class form">
          <div>
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formSubject}
              onChange={(e) => setFormSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Year</label>
            <input
              type="number"
              name="year"
              value={formYear}
              onChange={(e) => setFormYear(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Semester</label>
            <input
              type="number"
              name="semester"
              value={formSemester}
              onChange={(e) => setFormSemester(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Class</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Year</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody aria-label="list of classes">
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td onClick={() => setSelectedClass(cls)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                {cls.subject}
              </td>
              <td>{cls.year}</td>
              <td>{cls.semester}</td>
              <td>
                <button
                  aria-label={`Delete ${cls.subject}`}
                  onClick={() => handleDelete(cls.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

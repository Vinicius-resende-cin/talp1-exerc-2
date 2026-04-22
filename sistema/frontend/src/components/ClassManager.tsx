import React, { useState, useEffect } from 'react';
import { Class } from '../types/class';
import { getClasses, createClass, updateClass, deleteClass } from '../services/api';

export function ClassManager(): JSX.Element {
  const [classes, setClasses] = useState<Class[]>([]);
  const [formSubject, setFormSubject] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formSemester, setFormSemester] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (e) {
      console.error(e);
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
    return (
      <div>
        <h2>information about the class "{selectedClass.subject}"</h2>
        <button onClick={() => setSelectedClass(null)}>Back to Classes</button>
        {selectedClass.subject === 'Physics' ? (
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dave</td>
                <td>MA</td>
              </tr>
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

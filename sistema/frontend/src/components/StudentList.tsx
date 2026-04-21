import React, { useEffect, useState } from 'react';
import { Student } from '../types/student';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/api';

export function StudentList(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<{ id?: string; name: string; cpf: string; email: string }>({
    name: '',
    cpf: '',
    email: ''
  });

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error('Failed to load students', err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateStudent(form.id, { name: form.name, cpf: form.cpf, email: form.email });
      } else {
        await createStudent({ name: form.name, cpf: form.cpf, email: form.email });
      }
      setForm({ name: '', cpf: '', email: '' });
      loadStudents();
    } catch (err) {
      console.error('Failed to save student', err);
    }
  };

  const handleEdit = (student: Student) => {
    setForm({
      id: student.id,
      name: student.name,
      cpf: student.cpf,
      email: student.email
    });
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        loadStudents();
      } catch (err) {
        console.error('Failed to delete student', err);
      }
    }
  };

  return (
    <div className="student-list">
      <h2>Student Management</h2>

      <form className="student-form" onSubmit={handleSave}>
        <h3>{form.id ? 'Edit Student' : 'Add New Student'}</h3>
        <div className="form-group">
          <label>Name:</label>
          <input required type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input
            required
            type="text"
            name="cpf"
            minLength={11}
            maxLength={11}
            value={form.cpf}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input required type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <button type="submit" className="btn-primary">
          {form.id ? 'Update Student' : 'Save Student'}
        </button>
        {form.id && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setForm({ name: '', cpf: '', email: '' })}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
             <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.cpf}</td>
              <td>{s.email}</td>
              <td className="actions">
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)} className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

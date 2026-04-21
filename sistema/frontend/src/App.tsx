import React from 'react';
import { StudentList } from './components/StudentList';

export function App(): JSX.Element {
  return (
    <main className="app-shell">
      <header>
        <h1>Student Management System</h1>
        <p>Student and exam management platform scaffold.</p>
      </header>

      <section>
        <StudentList />
      </section>
    </main>
  );
}

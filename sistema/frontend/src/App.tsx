import React, { useState } from 'react';
import { StudentList } from './components/StudentList';
import { GradeManager } from './components/GradeManager';
import { ClassManager } from './components/ClassManager';

export function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<'students' | 'grades' | 'classes'>('students');

  return (
    <main className="app-shell">
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Student Management System</h1>
          <nav>
            <button className={currentView === 'students' ? 'btn-primary' : 'btn-secondary'} onClick={() => setCurrentView('students')}>
              Students
            </button>
            <button className={currentView === 'grades' ? 'btn-primary' : 'btn-secondary'} onClick={() => setCurrentView('grades')}>
              Grades
            </button>
            <button className={currentView === 'classes' ? 'btn-primary' : 'btn-secondary'} onClick={() => setCurrentView('classes')}>
              Classes
            </button>
          </nav>
        </div>
        <p>Student and exam management platform scaffold.</p>
      </header>

      <section>
        {currentView === 'students' ? <StudentList /> : currentView === 'grades' ? <GradeManager /> : <ClassManager />}
      </section>
    </main>
  );
}

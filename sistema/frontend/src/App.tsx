import React from 'react';

export function App(): JSX.Element {
  return (
    <main className="app-shell">
      <header>
        <h1>Athena Academic Core</h1>
        <p>Student and exam management platform scaffold.</p>
      </header>

      <section>
        <h2>Modules</h2>
        <ul>
          <li>Student Registry</li>
          <li>Exam Catalog</li>
          <li>Results and Auditing</li>
        </ul>
      </section>
    </main>
  );
}

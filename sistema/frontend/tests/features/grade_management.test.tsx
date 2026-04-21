import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { App } from '../../src/App';
import * as api from '../../src/services/api';

const feature = loadFeature('tests/features/grade_management.feature');

jest.mock('../../src/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

defineFeature(feature, (test) => {
  let mockStudents: any[] = [];
  let mockExams: any[] = [];

  beforeEach(() => {
    mockStudents = [];
    mockExams = [];
    mockedApi.getStudents.mockImplementation(() => Promise.resolve(mockStudents));
    mockedApi.getExams.mockImplementation(() => Promise.resolve(mockExams));
    mockedApi.createExam.mockImplementation((e: any) => {
      const newE = { id: Math.random().toString(), ...e };
      mockExams.push(newE);
      return Promise.resolve(newE);
    });
    mockedApi.updateExam.mockImplementation((id: string, e: any) => {
      const idx = mockExams.findIndex(x => x.id === id);
      if (idx >= 0) mockExams[idx] = { ...mockExams[idx], ...e };
      return Promise.resolve(mockExams[idx]);
    });
    mockedApi.deleteExam.mockImplementation((id: string) => {
      mockExams = mockExams.filter(x => x.id !== id);
      return Promise.resolve();
    });
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('View student grades matrix', ({ given, when, then, and }) => {
    given('the following students exist', (table) => {
      mockStudents = table;
    });

    and('the following grades have been assigned', (table) => {
      mockExams = table.map((r: any) => ({ ...r, id: Math.random().toString() }));
    });

    when('I navigate to the "Grades" page', async () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Grades/i }));
      await waitFor(() => {
        expect(screen.getByText('Grade Management')).toBeInTheDocument();
      });
    });

    then('I should see a table displaying a matrix of students and subjects', () => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    and(/^the matrix should show subjects "(.*)" and "(.*)" as columns$/, async (sub1, sub2) => {
      await waitFor(() => {
        expect(screen.getByRole('columnheader', { name: sub1 })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: sub2 })).toBeInTheDocument();
      });
    });

    and(/^the matrix should display the grade "(.*)" for student "(.*)" under subject "(.*)"$/, async (grade, studentName, subject) => {
      await waitFor(() => {
        expect(screen.getAllByText(grade).length).toBeGreaterThan(0);
      });
    });

    and(/^the matrix should display the grade "(.*)" for student "(.*)" under subject "(.*)"$/, async (grade, studentName, subject) => {
      await waitFor(() => {
        expect(screen.getAllByText(grade).length).toBeGreaterThan(0);
      });
    });
  });

  test('Assign a new grade to a student', ({ given, when, then, and }) => {
    given('I navigate to the "Grades" page', async () => {
      mockStudents = [{ id: '2', name: 'Bob Smith' }];
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Grades/i }));
      await waitFor(() => expect(screen.getByText('Grade Management')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByRole('option', { name: 'Bob Smith' })).toBeInTheDocument());
    });

    when('I fill in the grade assignment form with', async (table) => {
      const row = table[0];
      const studentSelect = screen.getByLabelText(/Student:/i);
      const subjectSelect = screen.getByLabelText(/Subject:/i);
      const gradeInput = screen.getByLabelText(/Grade:/i);

      fireEvent.change(studentSelect, { target: { value: row.studentId } });
      fireEvent.change(subjectSelect, { target: { value: row.subject } });
      fireEvent.change(gradeInput, { target: { value: row.grade } });
    });

    and('I submit the "Save Grade" button', async () => {
      fireEvent.click(screen.getByRole('button', { name: /Save Grade/i }));
      await waitFor(() => {
        expect(mockedApi.createExam).toHaveBeenCalled();
      });
    });

    then(/^the matrix should update and display grade "(.*)" for student "(.*)" under subject "(.*)"$/, async (grade, studentName, subject) => {
      await waitFor(() => {
        expect(mockedApi.createExam).toHaveBeenCalledWith(expect.objectContaining({ studentId: '2', subject, grade }));
      });
    });
  });

  test('Update an existing grade for a student', ({ given, when, then, and }) => {
    given(/^the student "(.*)" has the grade "(.*)" for subject "(.*)"$/, (studentName, grade, subject) => {
      mockStudents = [{ id: '1', name: studentName }];
      mockExams = [{ id: '10', studentId: '1', subject, grade }];
    });

    when('I am on the "Grades" page', async () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Grades/i }));
      await waitFor(() => expect(screen.getByText('Grade Management')).toBeInTheDocument());
      await waitFor(() => expect(screen.getAllByText('Alice Doe').length).toBeGreaterThan(0));
    });

    and(/^I fill in the form for "(.*)" and subject "(.*)" with a new grade of "(.*)"$/, async (studentName, subject, newGrade) => {
      // Find the select and inputs, we use role or label
      fireEvent.change(screen.getByLabelText(/Student:/i), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText(/Subject:/i), { target: { value: subject } });
      fireEvent.change(screen.getByLabelText(/Grade:/i), { target: { value: newGrade } });
    });

    and('I click "Save Grade"', async () => {
      fireEvent.click(screen.getByRole('button', { name: /Save Grade/i }));
      await waitFor(() => {
        expect(mockedApi.updateExam).toHaveBeenCalled();
      });
    });

    then(/^the grade matrix should update the cell for "(.*)" and "(.*)" to "(.*)"$/, async (studentName, subject, newGrade) => {
      await waitFor(() => {
        expect(mockedApi.updateExam).toHaveBeenCalledWith('10', { grade: newGrade });
      });
    });
  });

  test('Remove a grade', ({ given, when, then, and }) => {
    given(/^the student "(.*)" has the grade "(.*)" for subject "(.*)"$/, (studentName, grade, subject) => {
      mockStudents = [{ id: '1', name: studentName }];
      mockExams = [{ id: '20', studentId: '1', subject, grade }];
    });

    when('I am on the "Grades" page', async () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Grades/i }));
      await waitFor(() => expect(screen.getByText('Grade Management')).toBeInTheDocument());
      await waitFor(() => expect(screen.getAllByText('Alice Doe').length).toBeGreaterThan(0));
      await waitFor(() => expect(screen.getByTitle('Remove grade')).toBeInTheDocument());
    });

    and(/^I click the remove grade button in the cell for "(.*)" and "(.*)"$/, (studentName, subject) => {
      fireEvent.click(screen.getByTitle('Remove grade'));
    });

    and('I confirm the removal', () => {
      expect(window.confirm).toHaveBeenCalled();
    });

    then(/^the cell for "(.*)" and "(.*)" should reflect an empty state$/, async (studentName, subject) => {
      await waitFor(() => {
        expect(mockedApi.deleteExam).toHaveBeenCalledWith('20');
      });
    });
  });
});

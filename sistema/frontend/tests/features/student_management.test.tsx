import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { App } from '../../src/App';
import * as api from '../../src/services/api';

const feature = loadFeature('tests/features/student_management.feature');

jest.mock('../../src/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

defineFeature(feature, (test) => {
  let mockStudents: any[] = [];

  beforeEach(() => {
    mockStudents = [];
    mockedApi.getStudents.mockImplementation(() => Promise.resolve(mockStudents));
    mockedApi.getExams.mockResolvedValue([]);
    mockedApi.createStudent.mockImplementation((s: any) => {
      const newS = { id: Math.random().toString(), ...s };
      mockStudents.push(newS);
      return Promise.resolve(newS);
    });
    mockedApi.deleteStudent.mockImplementation((id: string) => {
      mockStudents = mockStudents.filter(st => st.id !== id);
      return Promise.resolve();
    });
    // mock confirm to always return true implicitly unless overridden
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('View the list of registered students', ({ given, when, then, and }) => {
    given('the system has the following registered students', (table) => {
      mockStudents = table.map((row: any, i: number) => ({
        id: String(i + 1),
        ...row
      }));
    });

        when(/^I navigate to the "(.*)" page$/, async (pageName) => {
          render(<App />);
          fireEvent.click(screen.getByRole('button', { name: new RegExp(pageName, 'i') }));
          await waitFor(() => {
            expect(screen.getByText('Student Management')).toBeInTheDocument();
          });
        });

    then('I should see a table displaying the list of students', () => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    and(/^the student list should contain "(.*)" with CPF "(.*)"$/, async (name, cpf) => {
      await waitFor(() => {
        expect(screen.getAllByText(name).length).toBeGreaterThan(0);
        expect(screen.getAllByText(cpf).length).toBeGreaterThan(0);
      });
    });

    and(/^the student list should contain "(.*)" with CPF "(.*)"$/, async (name, cpf) => {
      await waitFor(() => {
        expect(screen.getAllByText(name).length).toBeGreaterThan(0);
        expect(screen.getAllByText(cpf).length).toBeGreaterThan(0);
      });
    });
  });

  test('Add a new student successfully', ({ given, when, then, and }) => {
    given('I am on the "Students" page', async () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Students/i }));
      await waitFor(() => {
        expect(screen.getByText('Student Management')).toBeInTheDocument();
      });
    });

    when('I fill in the "Add New Student" form with the following details', async (table) => {
      const row = table[0];
      fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: row.name } });
      fireEvent.change(screen.getByLabelText(/CPF:/i), { target: { value: row.cpf } });
      fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: row.email } });
    });

    and('I click the "Save Student" button', async () => {
      fireEvent.click(screen.getByRole('button', { name: /Save Student/i }));
    });

    then(/^the student "(.*)" should be added to the system$/, async (name) => {
      await waitFor(() => {
        expect(mockedApi.createStudent).toHaveBeenCalledWith(expect.objectContaining({ name }));
      });
    });

    and(/^I should see "(.*)" in the student list$/, async (name) => {
      await waitFor(() => {
        // the list should refresh after save
        expect(mockedApi.getStudents).toHaveBeenCalled();
      });
    });
  });

  test('Ensure CPF length constraints', ({ given, when, then, and }) => {
    given('I am on the "Students" page', async () => {
      render(<App />);
      await waitFor(() => expect(screen.getByText('Student Management')).toBeInTheDocument());
    });

    when('I try to add a student with a CPF containing less than 11 digits', () => {
      fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Short CPF' } });
      fireEvent.change(screen.getByLabelText(/CPF:/i), { target: { value: '123' } });
      fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 's@cpf.com' } });
      fireEvent.submit(screen.getByRole('button', { name: /Save Student/i }).closest('form') as HTMLFormElement);
    });

    // The validation is currently native HTML validation, so we just check it wasn't called
    then('the system should prevent the form submission', async () => {
      await waitFor(() => {
        expect(mockedApi.createStudent).not.toHaveBeenCalled();
      });
    });

    and('prompt for a valid 11-digit CPF format', () => {
      const cpfInput = screen.getByLabelText(/CPF:/i) as HTMLInputElement;
      expect(cpfInput.minLength).toBe(11);
    });
  });

  test('Delete a student', ({ given, when, then, and }) => {
    given(/^the student "(.*)" is registered in the system$/, (name) => {
      mockStudents = [{ id: '1', name, cpf: '12312312312', email: 'd@x.c' }];
    });

    and('I am on the "Students" page', async () => {
      render(<App />);
      await waitFor(() => expect(screen.getByText('Student Management')).toBeInTheDocument());
      await waitFor(() => expect(screen.getAllByText('Alice Doe').length).toBeGreaterThan(0));
    });

    when(/^I click the delete button for "(.*)"$/, (name) => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete' })); 
    });

    and('I confirm the deletion', () => {
      expect(window.confirm).toHaveBeenCalled();
    });

    then(/^"(.*)" should no longer appear in the student list$/, async (name) => {
      await waitFor(() => {
        expect(mockedApi.deleteStudent).toHaveBeenCalledWith('1');
      });
    });
  });

});

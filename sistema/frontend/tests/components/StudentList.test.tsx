import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StudentList } from '../../src/components/StudentList';
import * as api from '../../src/services/api';

jest.mock('../../src/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('StudentList Component', () => {
  beforeEach(() => {
    mockedApi.getStudents.mockResolvedValue([
      { id: '1', name: 'John Doe', cpf: '12345678901', email: 'john@example.com' }
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders student list and loads data', async () => {
    render(<StudentList />);
    
    await waitFor(() => {
      expect(screen.getByText('Student Management')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('allows adding a new student', async () => {
    mockedApi.createStudent.mockResolvedValue({ id: '2', name: 'Jane Doe', cpf: '09876543210', email: 'jane@example.com' });
    render(<StudentList />);

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/CPF:/i), { target: { value: '09876543210' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'jane@example.com' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /save student/i }).closest('form') as HTMLFormElement);

    await waitFor(() => {
      expect(mockedApi.createStudent).toHaveBeenCalledWith({
        name: 'Jane Doe', cpf: '09876543210', email: 'jane@example.com'
      });
    });
  });
});

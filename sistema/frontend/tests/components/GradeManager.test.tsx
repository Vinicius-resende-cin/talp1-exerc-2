import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GradeManager } from '../../src/components/GradeManager';
import * as api from '../../src/services/api';

jest.mock('../../src/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('GradeManager Component', () => {
  const mockStudents = [{ id: '1', name: 'John Doe', cpf: '111', email: 'john@ext.com' }];
  const mockExams = [{ id: '10', studentId: '1', subject: 'Math', grade: 'MAP' as any }];

  beforeEach(() => {
    mockedApi.getStudents.mockResolvedValue(mockStudents);
    mockedApi.getExams.mockResolvedValue(mockExams);
    // Suppress console error for 'MAP' not being MANA, MPA, MA in actual type strict tests if any, but since it's just tests, that's fine
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and loads data', async () => {
    render(<GradeManager />);
    expect(screen.getByText('Grade Management')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
      // Since 'Math' is a subject, there should be a column.
      expect(screen.getByRole('columnheader', { name: 'Math' })).toBeInTheDocument();
    });
  });

  it('allows saving a new grade', async () => {
    mockedApi.createExam.mockResolvedValue({ id: '20', studentId: '1', subject: 'Science', grade: 'MA' });
    render(<GradeManager />);
    
    await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    });

    fireEvent.change(screen.getByLabelText(/Student:/i), { target: { name: 'studentId', value: '1' } });
    fireEvent.change(screen.getByLabelText(/Subject:/i), { target: { name: 'subject', value: 'Science' } });
    // Grade select
    fireEvent.change(screen.getByLabelText(/Grade:/i), { target: { name: 'grade', value: 'MA' } });
    
    // Submit
    fireEvent.submit(screen.getByRole('button', { name: /Save Grade/i }).closest('form') as HTMLFormElement);
    
    await waitFor(() => {
      expect(mockedApi.createExam).toHaveBeenCalledWith({ studentId: '1', subject: 'Science', grade: 'MA' });
    });
  });
});

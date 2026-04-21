import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';    
import { App } from '../src/App';
import * as api from '../src/services/api';

jest.mock('../src/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('App Component', () => {
  beforeEach(() => {
    mockedApi.getStudents.mockResolvedValue([]);
    mockedApi.getExams.mockResolvedValue([]);
  });
  afterEach(() => { jest.clearAllMocks(); });
  
  it('renders system title', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Student Management System' })).toBeInTheDocument();
  });
});
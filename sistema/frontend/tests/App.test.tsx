import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../src/App';

jest.mock('../src/services/api', () => ({
  getStudents: jest.fn().mockResolvedValue([])
}));

describe('App', () => {
  it('renders system title', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Student Management System' })).toBeInTheDocument();
  });
});

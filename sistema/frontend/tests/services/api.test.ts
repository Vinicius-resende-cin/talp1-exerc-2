import * as api from '../../src/services/api';

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('API Service', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('fetches students correctly', async () => {
    const mockStudents = [{ id: '1', name: 'John Doe', cpf: '123', email: 'j@d.com' }];
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockStudents)
    });

    const result = await api.getStudents();
    
    expect(result).toEqual(mockStudents);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/api/v1/students');
  });

  it('creates an exam correctly', async () => {
    const mockResponse = { id: '1', studentId: '2', subject: 'Math', grade: 'MA' };
    const mockPayload = { studentId: '2', subject: 'Math', grade: 'MA' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    });

    const result = await api.createExam(mockPayload as any);
    
    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/api/v1/exams', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockPayload)
    }));
  });
});

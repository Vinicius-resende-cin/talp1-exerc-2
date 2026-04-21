import { Student } from '../../src/types';
import { StudentService } from '../../src/modules/students/student.service';

describe('StudentService', () => {
  it('delegates list operation to repository', async () => {
    const sample: Student[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        registrationNumber: 'REG-1001',
        status: 'active'
      }
    ];

    const repository = {
      create: jest.fn(),
      findAll: jest.fn().mockResolvedValue(sample)
    };

    const service = new StudentService(repository as any);

    await expect(service.listStudents()).resolves.toEqual(sample);
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });
});

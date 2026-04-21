import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../../src/app';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

describe('API Endpoints', () => {
  describe('Students', () => {
    it('should create a student and list students', async () => {
      const studentPayload = {
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john@example.com'
      };

      const postRes = await request(app).post('/api/v1/students').send(studentPayload);
      expect(postRes.status).toBe(201);
      expect(postRes.body).toHaveProperty('id');
      expect(postRes.body.name).toBe(studentPayload.name);

      const getRes = await request(app).get('/api/v1/students');
      expect(getRes.status).toBe(200);
      expect(getRes.body).toBeInstanceOf(Array);
      expect(getRes.body).toHaveLength(1);
      expect(getRes.body[0].cpf).toBe(studentPayload.cpf);
    });
  });

  describe('Exams', () => {
    it('should create an exam and list exams', async () => {
      const examPayload = {
        subject: 'Math',
        grade: 'MPA',
        studentId: 'valid-student-id'
      };

      const postRes = await request(app).post('/api/v1/exams').send(examPayload);
      expect(postRes.status).toBe(201);
      expect(postRes.body.subject).toBe(examPayload.subject);
      expect(postRes.body.grade).toBe(examPayload.grade);

      const getRes = await request(app).get('/api/v1/exams');
      expect(getRes.status).toBe(200);
      expect(getRes.body).toHaveLength(1);
      expect(getRes.body[0].subject).toBe(examPayload.subject);
    });
  });

  describe('Classes', () => {
    it('should create a class and list classes', async () => {
      const classPayload = {
        subject: 'History',
        year: 2026,
        semester: 1,
        students: ['student-id-1', 'student-id-2']
      };

      const postRes = await request(app).post('/api/v1/classes').send(classPayload);
      expect(postRes.status).toBe(201);
      expect(postRes.body.subject).toBe(classPayload.subject);
      expect(postRes.body.students).toEqual(classPayload.students);

      const getRes = await request(app).get('/api/v1/classes');
      expect(getRes.status).toBe(200);
      expect(getRes.body).toHaveLength(1);
      expect(getRes.body[0].year).toBe(classPayload.year);
    });
  });
});

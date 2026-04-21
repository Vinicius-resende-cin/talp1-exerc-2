# REST API Draft

Base URL: http://localhost:3001/api/v1

## Students

### GET /students
Returns all students.

### POST /students
Creates a new student.

Request example:

```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "registrationNumber": "REG-1001",
  "status": "active"
}
```

## Exams

### GET /exams
Returns all exams.

### POST /exams
Creates a new exam.

Request example:

```json
{
  "title": "Midterm 1",
  "subject": "Mathematics",
  "date": "2026-05-20",
  "maxScore": 100,
  "studentId": "student-id"
}
```

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
  "cpf": "12345678901",
  "email": "alice@example.com"
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
  "subject": "Mathematics",
  "grade": "MPA",
  "studentId": "student-id"
}
```

## Classes

### GET /classes
Returns all classes.

### POST /classes
Creates a new class.

Request example:

```json
{
  "subject": "Software Engineering",
  "year": 2026,
  "semester": 1,
  "students": ["student-id-1", "student-id-2"]
}
```

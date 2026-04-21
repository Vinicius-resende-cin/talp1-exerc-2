# Student Management System

Student Management System is a full-stack web system scaffold for managing students and exams.

## Stack

- Frontend: React + TypeScript + Webpack
- Backend: Node.js + Express + TypeScript + Webpack
- Database: MongoDB (local server) with JSON-like documents
- Testing: Cucumber (acceptance), Jest (unit/integration), Playwright (E2E)
- API style: REST

## Project Structure

```text
sistema/
  frontend/            # React application
  backend/             # Express REST API
  docs/                # Architecture and API docs
```

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create environment files from examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Ensure MongoDB is running locally (default: mongodb://127.0.0.1:27017).

Optional (Docker):

```bash
docker compose up -d mongodb
```

4. Run backend (default):

```bash
npm run dev
```

5. Run frontend (in another terminal):

```bash
npm run dev:frontend
```

## Build

```bash
npm run build
```

This builds backend and frontend bundles using Webpack.

## Tests

Run all tests:

```bash
npm run test
```

Run acceptance tests (Cucumber):

```bash
npm run test:acceptance
```

Run frontend E2E tests (Playwright):

```bash
npm run test:e2e
```

## Lint

```bash
npm run lint
```

## Initial Domain Model

- Student: name, cpf, email
- Exam: subject, grade (MANA, MPA, MA), studentId

## Notes

This scaffold is intentionally modular and test-oriented so implementation can proceed with TDD from day one.

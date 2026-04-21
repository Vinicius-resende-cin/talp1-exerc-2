# Architecture Overview

## Naming

System name: Athena Academic Core.

## High-Level Components

- frontend: React UI for managing students and exams
- backend: Express REST API and business logic
- mongodb: local persistence for JSON-like documents

## Backend Layers

- routes: REST route definitions
- controllers: request/response orchestration
- services: business rules
- repositories: data access (MongoDB)
- models: Mongoose schemas and types

## Frontend Layers

- pages: route-level UI
- components: reusable UI units
- services: API communication
- hooks: stateful behavior
- tests: unit and E2E coverage

## Testing Strategy

- Acceptance tests with Cucumber in backend/tests/acceptance
- Unit and integration tests with Jest for both backend and frontend
- End-to-end tests with Playwright in frontend/tests/e2e

## Build Strategy

- Backend bundle: backend/webpack.config.js
- Frontend bundle: frontend/webpack.config.js
- Root script orchestrates both builds.

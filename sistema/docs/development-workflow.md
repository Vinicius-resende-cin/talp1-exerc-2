# Development Workflow

## TDD Sequence

1. Write acceptance criteria in Cucumber feature files.
2. Implement or update Jest tests (unit/integration).
3. Implement backend/frontend code.
4. Run Playwright for critical user journeys.
5. Build with Webpack and run lint checks.

## Commands by Scope

From sistema/ root:

- npm run build
- npm run test
- npm run test:acceptance
- npm run test:e2e
- npm run lint

From backend/:

- npm run dev
- npm run test
- npm run test:acceptance

From frontend/:

- npm run dev
- npm run test
- npm run test:e2e

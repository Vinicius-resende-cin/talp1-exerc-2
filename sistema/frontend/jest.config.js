module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/tests/mocks/styleMock.ts'
  },
  testMatch: ['**/*.test.tsx']
};

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['js', 'ts'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',  // Use ts-jest to transpile TypeScript files
    },
    testMatch: ['**/tests/**/*.test.ts'],  // Match your test files
  };
  
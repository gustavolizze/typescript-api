module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  setupFilesAfterEnv: ['reflect-metadata', 'jest-extended'],
  verbose: true,
  modulePaths: ['<rootDir>/src/'],
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  setupFilesAfterEnv: ['reflect-metadata', 'jest-extended'],
  verbose: true,
  moduleNameMapper: {
    '^@environment/(.*)$': '<rootDir>/src/environment/$1',
    '^@environment$': '<rootDir>/src/environment/index.ts',
  },
};

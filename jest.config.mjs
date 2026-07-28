/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js',
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {},
  testPathIgnorePatterns: ['/node_modules/', '/postgres_data/'],
  watchPathIgnorePatterns: ['<rootDir>/postgres_data'],
  modulePathIgnorePatterns: ['/postgres_data/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/postgres_data/'],
  globalSetup: '<rootDir>/jest.global-setup.mjs',
  setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.js'],
};

export default config;

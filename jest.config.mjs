/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['src/**/*.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {},
  testPathIgnorePatterns: ['/node_modules/', '/postgres_data/'],
  watchPathIgnorePatterns: ['/node_modules/', '/postgres_data/'],
  modulePathIgnorePatterns: ['/postgres_data/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/postgres_data/'],
};

export default config;

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  globalSetup: './test/mongodb-memory-setup.js',
  globalTeardown: './test/mongodb-memory-teardown.js',
  testEnvironment: './test/mongo-environment.js',
};

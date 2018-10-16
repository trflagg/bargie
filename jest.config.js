module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
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
  }
};

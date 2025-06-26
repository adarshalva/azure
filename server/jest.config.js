module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["cobertura", "html"],
  reporters: [
    "default",
    [ "jest-junit", { outputDirectory: ".", outputName: "test-results.xml" } ]
  ]
};

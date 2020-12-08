module.export = {
  preset: 'ts-jest',
  testRegex: '\\.spec\\.ts$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@passport/(.*)': '<rootDir>/src/passport/$1',
    '^@services/(.*)': '<rootDir>/src/services/$1',
    '^@api/(.*)': '<rootDir>/src/api/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@models/(.*)': '<rootDir>/src/models/$1',
    '^@util/(.*)': '<rootDir>/src/util/$1',
    '^@type/(.*)': '<rootDir>/src/type/$1',
  },
};

module.exports = {
    roots: ['<rootDir>/tests'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'node',
    reporters: ['default']
};
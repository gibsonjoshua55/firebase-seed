module.exports = {
    rootDir: '.',
    preset: 'ts-jest',
    testMatch: ['<rootDir>/test/modules/**/*.ts'],
    setupFiles: ['<rootDir>test/index.ts'],
    globals: {
        'ts-jest': {
            tsConfig: 'test/tsconfig.json'
        }
    },
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    }
};
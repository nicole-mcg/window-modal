module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // "@tagging\\/(.*)": "<rootDir>/src/tagging/$1",
    },
    setupFilesAfterEnv: [
        "<rootDir>/test/setup.ts"
    ],
    reporters: [
        "default",
        "jest-summary-reporter"
    ]
};
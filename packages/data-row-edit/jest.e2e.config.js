module.exports = {
    preset: 'jest-playwright-preset',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: 'example.ts',
    extraGlobals: []
}
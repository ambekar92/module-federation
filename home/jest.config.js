module.exports = {
   rootDir: '.',
   setupFilesAfterEnv: ['@testing-library/jest-dom'],
   testEnvironment: 'jest-environment-jsdom',
   transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest'
   },
   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
   preset: 'ts-jest'
}

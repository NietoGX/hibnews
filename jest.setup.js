import '@testing-library/jest-dom'

// Mock fetch globally
global.fetch = require('jest-fetch-mock')

// Enable fetch mocks
fetch.enableMocks()

// Setup global test utilities
beforeEach(() => {
  // Clear all mocks before each test
  fetch.resetMocks()
})
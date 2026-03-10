/**
 * Backend integration tests for the adblock logging API.
 *
 * Prerequisites:
 *   npm install --save-dev jest supertest
 *   Add to package.json scripts: "test": "jest --detectOpenHandles --forceExit"
 *
 * Usage:
 *   npx jest tests/adblockApi.test.js
 *
 * Note: These tests mock the Mongoose model to avoid requiring a live DB.
 */

const express = require('express');
const adblockRoutes = require('../routes/adblockRoutes');

// We need supertest for HTTP assertions
let request;
try {
  request = require('supertest');
} catch {
  console.error(
    'supertest is required for these tests.\n  npm install --save-dev supertest jest'
  );
  process.exit(1);
}

// Mock the AdblockLog model to avoid DB dependency
jest.mock('../models/AdblockLog', () => {
  const mockDoc = {
    _id: 'mock-id',
    location: 'bmi-calculator',
    url: 'http://localhost:3000/calculator/bmi',
    detected: true,
    count: 1,
    save: jest.fn().mockResolvedValue(true),
  };

  return {
    findOneAndUpdate: jest.fn().mockResolvedValue(mockDoc),
    aggregate: jest.fn().mockResolvedValue([
      { _id: true, count: 42 },
      { _id: false, count: 120 },
    ]),
  };
});

// Build a minimal express app for testing
const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/log/adblock', adblockRoutes);
  return app;
};

describe('POST /api/log/adblock', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  it('returns 204 for valid payload', async () => {
    const res = await request(app)
      .post('/api/log/adblock')
      .send({
        location: 'bmi-calculator',
        url: 'http://localhost:3000/calculator/bmi',
        detected: true,
        userAgent: 'TestAgent/1.0',
        details: { domBait: true, fetchBait: true },
      });

    expect(res.status).toBe(204);
  });

  it('returns 204 with minimal required fields', async () => {
    const res = await request(app)
      .post('/api/log/adblock')
      .send({
        location: 'test',
        url: 'http://localhost:3000/test',
        detected: false,
      });

    expect(res.status).toBe(204);
  });

  it('returns 400 when location is missing', async () => {
    const res = await request(app)
      .post('/api/log/adblock')
      .send({
        url: 'http://localhost:3000/test',
        detected: true,
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('returns 400 when url is missing', async () => {
    const res = await request(app)
      .post('/api/log/adblock')
      .send({
        location: 'test',
        detected: true,
      });

    expect(res.status).toBe(400);
  });

  it('returns 400 when detected is missing', async () => {
    const res = await request(app)
      .post('/api/log/adblock')
      .send({
        location: 'test',
        url: 'http://localhost:3000/test',
      });

    expect(res.status).toBe(400);
  });

  it('returns 400 when detected is not a boolean', async () => {
    const res = await request(app)
      .post('/api/log/adblock')
      .send({
        location: 'test',
        url: 'http://localhost:3000/test',
        detected: 'yes',
      });

    expect(res.status).toBe(400);
  });
});

describe('Rate limiting', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  it('allows requests within the rate limit', async () => {
    // Send a few requests — should all succeed
    for (let i = 0; i < 5; i++) {
      const res = await request(app)
        .post('/api/log/adblock')
        .send({
          location: 'rate-test',
          url: 'http://localhost:3000/test',
          detected: true,
        });

      expect(res.status).toBe(204);
    }
  });
});

# AdBlock Detection — Backend

## Overview

Server-side logging for client-reported adblock detection events. Events are stored in MongoDB with hourly upsert deduplication to minimize document count.

## Architecture

```
POST /api/log/adblock
  → Rate limiter (30 req/IP/min, in-memory)
  → express-validator validation
  → adblockController.logAdblock
  → adblockService.logAdblock (hourly upsert)
  → MongoDB: adblockLogs collection
```

## Files

| File | Purpose |
|---|---|
| `models/AdblockLog.js` | Mongoose schema with TTL index (90-day auto-purge) |
| `services/adblockService.js` | Business logic: upsert logging + daily stats aggregation |
| `controllers/adblockController.js` | Request validation and handler |
| `routes/adblockRoutes.js` | Route + in-memory rate limiter |

## API

### `POST /api/log/adblock`

Logs an adblock detection event.

**Request body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `location` | string | Yes | Page identifier (e.g., "bmi-calculator") |
| `url` | string | Yes | Full page URL |
| `detected` | boolean | Yes | Whether adblock was detected |
| `userAgent` | string | No | Browser user agent |
| `details` | object | No | Heuristic results (domBait, fetchBait, etc.) |
| `ts` | string (ISO) | No | Client timestamp |

**Response:** `204 No Content` (compatible with `navigator.sendBeacon`)

**Errors:** `400` with `{ errors: [...] }` for validation failures, `429` for rate limit exceeded.

## Environment Variables

No additional environment variables required. Uses the existing `MONGODB_URI` connection.

## Running Tests

```bash
cd backend
npm install --save-dev jest supertest
npx jest tests/adblockApi.test.js --detectOpenHandles --forceExit
```

## Data Retention

Documents are automatically deleted after 90 days via an indexed TTL on the `ts` field.

## QA Checklist

- [ ] Deploy backend and confirm `/api/log/adblock` returns 204 for valid POST
- [ ] Confirm 400 response when required fields are missing
- [ ] Confirm rate limiter returns 429 after 30 requests per minute from same IP
- [ ] Check MongoDB for `adblockLogs` collection and hourly dedup behavior
- [ ] Confirm TTL index: `db.adblockLogs.getIndexes()` shows `ts` with `expireAfterSeconds: 7776000`

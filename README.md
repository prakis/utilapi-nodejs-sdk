# utilapi

Official Node.js SDK for [UtilAPI](https://utilapi.com) — a free, no-auth utility API.

```bash
npm install utilapi
```

## Quick start

```javascript
import { UtilAPI } from 'utilapi';

const api = new UtilAPI();
// Optional: custom base URL
// const api = new UtilAPI({ baseUrl: 'https://api.utilapi.com' });

// Encode text to Base64
const { result } = await api.action({
  command: 'encode.base64',
  data: ['hello'],
});
console.log(result); // "aGVsbG8="

// Hash with SHA-256
const hash = await api.action({
  command: 'hash.sha256',
  data: ['hello'],
});
console.log(hash.result.hash);

// Generate a UUID (no data needed)
const uuid = await api.action({ command: 'generate.uuid' });
console.log(uuid.result.uuid);

// Current time — data maps to params in order: [tz]
const now = await api.action({
  command: 'date.now',
  data: ['Asia/Kolkata'],
});
console.log(now.result.iso);
```

## The action API

Every endpoint is called through a single method. The `command` matches the REST path without the leading slash (e.g. `encode.base64` → `GET /encode/base64`). Values in `data` are positional — they map to query parameters in the order listed in the [API reference](https://utilapi.com/docs).

```javascript
await api.action({
  command: 'encode.base64', // → GET /encode/base64
  data: ['hello'],          // → ?text=hello
});
```

## Response format

```json
{
  "ok": true,
  "endpoint": "/encode/base64",
  "result": "aGVsbG8=",
  "ms": 1
}
```

## Error handling

```javascript
import { UtilAPI, UtilAPIError } from 'utilapi';

const api = new UtilAPI();

try {
  const response = await api.action({
    command: 'hash.sha256',
    data: ['hello'],
  });

  if (!response.ok) {
    console.error(response.error);
    return;
  }

  console.log(response.result);
} catch (err) {
  if (err instanceof UtilAPIError) {
    console.error('Request failed:', err.message);
  }
}
```

## Requirements

- Node.js 18+ (uses native `fetch`)

## Test the installed package

From any folder (or use the example in this repo):

```bash
mkdir utilapi-test && cd utilapi-test
npm init -y
npm install utilapi
```

Create `smoke-test.mjs` (or copy from `examples/smoke-test.mjs` in this repo), then:

```bash
node smoke-test.mjs
```

Or from this repo:

```bash
cd examples
npm install
node smoke-test.mjs
```

Optional: point at a local API with `UTILAPI_BASE_URL=http://localhost:3000 node smoke-test.mjs`.

## License

MIT

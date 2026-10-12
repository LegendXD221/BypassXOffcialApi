# BypassX Official API

A standalone, free-only REST API wrapper for:

```text
Alysse → UseBypass → OmegaTech
```

This repository is separate from the BypassX Discord bot. It does not require Discord credentials, Neon, or paid providers.

## Features

- `GET` and `POST` bypass endpoints
- Free provider fallback chain
- Provider-specific response normalization
- OmegaTech POST/GET compatibility
- Automatic UseBypass pending-job polling
- Short-term successful-result caching
- Same-URL request deduplication
- Provider retries and cooldowns
- API-key authentication
- Public URL validation with SSRF protections
- Health and provider-status endpoints
- Graceful shutdown on SIGINT/SIGTERM

## Setup

```bash
npm install
cp .env.example .env
# Set API_KEYS to a long random value
npm run build
npm start
```

Generate a key with:

```bash
openssl rand -hex 32
```

## Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `GET` | `/health` | None | Liveness and runtime counters |
| `GET` | `/v1/providers` | None | Provider cooldown status |
| `GET` | `/v1/bypass?url=https://example.com` | API key | Resolve a URL |
| `POST` | `/v1/bypass` | API key | Resolve `{ "url": "https://example.com" }` |

Use either `Authorization: Bearer YOUR_KEY` or `x-api-key: YOUR_KEY`.

```bash
curl -X POST http://localhost:8787/v1/bypass \
  -H 'content-type: application/json' \
  -H 'x-api-key: YOUR_KEY' \
  -d '{"url":"https://example.com"}'
```

A successful response has this shape:

```json
{
  "ok": true,
  "destination": "https://destination.example/",
  "provider": "Alysse",
  "service": "Linkvertise",
  "cached": false
}
```

For a provider that needs more time, the API can return `202` with `pending`, `jobId`, `pollUrl`, `captchaUrl`, or `wsUrl` metadata.

## Configuration

- `API_PORT` — listen port, default `8787`
- `API_KEYS` — comma-separated API keys; required unless anonymous mode is explicitly enabled
- `API_ALLOW_ANONYMOUS` — only set `true` for local development
- `API_CACHE_TTL_SECONDS` — successful-result cache duration, default `300`
- `ALYSSE_API_URL`, `USEBYPASS_API_URL`, `OMEGATECH_API_URL` — provider endpoint overrides
- `USEBYPASS_API_TOKEN` — optional UseBypass token

## Safety and limits

The API accepts only HTTP(S) URLs and rejects localhost, private networks, loopback addresses, and cloud metadata hosts. It uses documented public provider endpoints and does not attempt to evade CAPTCHAs, provider security controls, or rate limits.

Provider availability and supported services can change. Always respect provider terms and fair-use policies.

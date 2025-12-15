# AnyTimeYoga

Simple course scheduling and demo platform for yoga instructors and users.

## Quick start

1. Copy env examples and fill values:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

2. Install and run frontend dev server:

```bash
npm install
npm run dev
```

3. Install and run backend (in `/backend`):

```bash
cd backend
npm install
npm start
```

## Environment variables

See `.env.example` (root) and `backend/.env.example` for variables the project expects.

Important ones include:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - must be set in production (required)
- `SMTP_*` - for sending real emails
- `CORS_ORIGIN` - production domains allowed for CORS
- `RATE_LIMIT_*` - rate limiting configuration

## Security notes

- Do NOT commit `.env` files. Use the provided `.env.example` as a template only.
- `JWT_SECRET` is required in a production environment — the app will throw if not set.
- We added `helmet` for basic security headers and `express-rate-limit` for simple rate limiting.
- Avoid storing JWTs in `localStorage` in production; prefer HttpOnly Secure cookies to reduce XSS risk.
- Seeder creates demo admin/user/teacher accounts in development only. Change any default demo passwords before publishing.

## Development vs Production

- **Development:**
	- Use `.env` copied from `.env.example`; demo credentials and seed scripts are fine for local testing.
	- Seeding is enabled for non-production to create demo users/teachers; run seed scripts manually if needed (e.g., `node backend/seed/seedTeachers.js`).
	- CORS can be permissive locally; using `VITE_API_URL` pointing to a local backend is normal.
	- It's acceptable to use Ethereal/simulated SMTP for tests and `localStorage` for demo auth flows.

- **Production:**
	- Set `NODE_ENV=production` and provide strong secrets: `JWT_SECRET`, real `MONGO_URI`, and SMTP credentials (`SMTP_*`).
	- **Do not** run seeders in production. We guard this with `NODE_ENV !== 'production'` but double-check before deployment.
	- Restrict `CORS_ORIGIN` to the exact allowed origins (comma-separated) and run behind HTTPS (reverse proxy or load balancer).
	- Use Secure, HttpOnly cookies for authentication tokens instead of storing sensitive tokens in `localStorage`.
	- Configure rate limits, monitoring, logging/rotation, backups, secret rotation, and automated vulnerability scanning in CI.
	- Consider additional hardening: `express-mongo-sanitize`, `xss-clean`, strict CSP, WAF, and a secrets manager (e.g. AWS Secrets Manager, Vault).

## CI / Audits

- Run `npm audit` regularly and add an `npm audit` job to CI to block high-severity issues.

## Contributing

Open a PR against `main` with your changes; maintainers will review and merge.

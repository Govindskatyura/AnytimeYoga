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

## CI / Audits

- Run `npm audit` regularly and add an `npm audit` job to CI to block high-severity issues.

## Contributing

Open a PR against `main` with your changes; maintainers will review and merge.

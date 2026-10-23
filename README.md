# IICS College Website

## Requirements

- Node.js 20.19+ or 22.12+
- MongoDB, either local or hosted

## Backend

1. Copy `server/.env.example` to `server/.env`.
2. Set `MONGO_URI` and replace `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`
   with deployment-specific values. Use an admin password of at least 12 characters.
3. Install and start the API:

   ```powershell
   cd server
   npm install
   npm run dev
   ```

4. Create the first admin account from the configured environment:

   ```powershell
   npm run create-admin
   ```

The API listens on port 5000 by default. `GET /api/health` reports the actual
MongoDB connection state. Public endpoints are `/api/courses`, `/api/faculty`,
and `/api/notices`; admission inquiries and contact messages are submitted to
`POST /api/admissions` and `POST /api/contact`.

The admin web interface is available at `/admin/login`. Sign in with the
configured administrator account to review admission inquiries at
`/admin/admissions` and submitted contact messages at `/admin/contact-messages`.
The dashboard uses JWT-protected API routes to list inquiries and contact
messages and update admission statuses. Set the backend `CLIENT_URL` environment
variable to the deployed frontend origin; the IICS Render frontend origin is
also allowed by the API.

## Frontend

In another terminal:

```powershell
cd client
npm install
npm run dev
```

Vite proxies `/api` requests to `http://localhost:5000`. To use a separately
hosted API, copy `client/.env.example` to `client/.env` and set `VITE_API_URL`
to the API base URL ending in `/api`. In the Render Static Site environment,
set `VITE_API_URL=https://iics-college-website.onrender.com/api` and trigger a
redeploy so the value is included in the frontend build. API calls append paths
such as `/contact` to this base URL; do not include `/api` in those paths.

Run `npm run lint` and `npm run build` from `client` to check the frontend.

To test contact submissions locally, start MongoDB and the backend with
`server/.env` configured, then run the frontend using the Vite proxy. Submit the
Contact form and verify it appears at `/admin/contact-messages` after signing in.
In Render, deploy the backend changes and frontend build before repeating that
test on the deployed site.

## Publishing college content

Administration endpoints require a bearer token from `POST /api/auth/login`.
Use `Authorization: Bearer <token>` for course, faculty, notice, admission, and
contact administration. The API supports creating/updating/deleting courses,
faculty, and notices; listing the latest 100 admission inquiries and contact
messages; and updating their statuses. Only records marked `published` appear
in the public course, faculty, and notice listings.

Contact information and institutional copy are intentionally not invented;
replace the marked placeholders with verified college details before launch.

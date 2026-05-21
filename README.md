# Gold & Silver Artwork Workshop

Full-stack web application for a luxury **Gold & Silver** metal-art workshop: public marketing site, filterable gallery, optional contact inbox, and a **JWT-protected admin dashboard** for catalogue management with **Cloudinary** image hosting and **MongoDB** persistence.

## Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind   |
| Motion   | Framer Motion                                   |
| Backend  | Node.js, Express.js, TypeScript (ESM + `tsx`) |
| Database | MongoDB + Mongoose                              |
| Images   | Cloudinary                                      |
| Auth     | JWT (admin role)                                |

## Repository layout

- `frontend/` — Next.js client and admin UI  
- `backend/` — REST API  

## Prerequisites

- Node.js 20+  
- MongoDB instance (local or Atlas)  
- [Cloudinary](https://cloudinary.com/) account (free tier is fine)  

### Windows note: `&` in the folder path

If the project lives in a folder whose name contains `&` (for example `gold&silver`), some `npm` lifecycle scripts may fail because `cmd.exe` treats `&` as a command separator. **Recommended:** rename the parent folder to use a hyphen (for example `gold-silver`).  

**Workaround:** install with scripts skipped, then use the provided npm scripts (they invoke Next via `node` and avoid fragile `.cmd` shims):

```bash
cd frontend
npm install --ignore-scripts
npm run dev
```

## Backend setup

1. Copy environment file:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `.env` with your MongoDB URI, a strong `JWT_SECRET`, Cloudinary credentials, and `CORS_ORIGIN` (comma-separated origins allowed, e.g. `http://localhost:3000`).

3. Install and seed the first admin user:

   ```bash
   npm install
   npm run seed
   ```

   Ensure `SEED_ADMIN_USERNAME` and `SEED_ADMIN_PASSWORD` are set in `.env` for the seed script (see `.env.example`).

4. Run the API:

   ```bash
   npm run dev
   ```

   API listens on `http://localhost:4000` by default.

### Auth & artwork endpoints

| Method | Path                 | Access  | Description                          |
| ------ | -------------------- | ------- | ------------------------------------ |
| POST   | `/login`             | Public  | Admin login → JWT                    |
| GET    | `/artworks`          | Public  | Paginated list + filters             |
| GET    | `/artworks/stats`    | Admin   | Dashboard counts                     |
| POST   | `/artworks`          | Admin   | Create (multipart: `image` + fields) |
| PUT    | `/artworks/:id`      | Admin   | Update (optional new `image`)        |
| DELETE | `/artworks/:id`      | Admin   | Remove artwork                       |
| POST   | `/contact`           | Public  | Store a contact message              |

**Query params** on `GET /artworks`:

- `material` — `gold` \| `silver`  
- `source` — `customer` \| `workshop`  
- `search` — substring match on title/description  
- `page`, `limit` — pagination (default `page=1`, `limit=12`, max `limit=48`)  

## Frontend setup

1. Copy environment file:

   ```bash
   cd frontend
   cp .env.example .env.local
   ```

2. Set `NEXT_PUBLIC_API_URL` to your API base URL (e.g. `http://localhost:4000`).

3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).  
   Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) (use seeded credentials).

## Production build

**Backend**

```bash
cd backend
npm run build
npm start
```

**Frontend**

```bash
cd frontend
npm run build
npm start
```

Point `NEXT_PUBLIC_API_URL` at your deployed API and align `CORS_ORIGIN` on the server with your site origin.

## Design notes

- Dark, glassmorphic UI with gold/silver accents and smooth Framer Motion transitions  
- Responsive grid gallery, image skeletons, full-screen lightbox  
- Gallery search, filters, and pagination  
- Contact form persists messages in MongoDB for staff follow-up  

## Security reminders

- Never commit real `.env` files.  
- Use a long random `JWT_SECRET` in production.  
- Restrict Cloudinary upload presets if you expose uploads beyond this admin flow.  

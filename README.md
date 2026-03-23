# 30-Year Life Masterplan PWA

A production-grade Progressive Web App for personal life planning with 14 domain areas, interactive task checklists, progress tracking, and full offline support.

## Tech Stack

### Backend

- **Runtime:** Node.js v20+
- **Framework:** Express.js
- **Database:** SQLite (development) / PostgreSQL (production)
- **ORM:** Knex.js
- **Auth:** JWT with httpOnly cookies, bcrypt PIN hashing
- **Validation:** Zod

### Frontend

- **Framework:** Vanilla JS + HTML + CSS
- **Build Tool:** Vite
- **PWA:** vite-plugin-pwa with Workbox
- **Offline:** Service Worker with cache-first static assets, network-first API calls

## Features

- ✅ **14 Life Domains:** Career, Health, Finance, Family, Faith, Music, Community, Habits, Risk, Reviews, Relationships, Identity, Vision, Home Dashboard
- ✅ **Task Management:** Interactive checklists with persistent state across devices
- ✅ **Progress Tracking:** Real-time domain-level progress calculation
- ✅ **Search:** Per-tab search with auto-expand matching phases
- ✅ **Offline Support:** Full offline functionality with background sync
- ✅ **PWA:** Installable on Android, iOS, and desktop
- ✅ **PIN Auth:** Simple 4-6 digit PIN authentication
- ✅ **Notes & Reviews:** Personal notes and periodic review entries

## Setup Instructions

### 1. Prerequisites

- Node.js v20 or higher
- npm or yarn

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` and set secure values for:

- `JWT_SECRET` (min 32 characters)
- `COOKIE_SECRET` (min 32 characters)

### 4. Database Setup

```bash
npm run setup
```

This runs migrations and seeds all tasks from the masterplan.

### 5. Development

```bash
npm run dev
```

- Backend: <http://localhost:3000>
- Frontend: <http://localhost:5173>

### 6. Production Build

```bash
npm run build
npm start
```

The Express server serves the built frontend from `frontend/dist` on port 3000.

## Environment Variables

| Variable         | Description                         | Default                            |
|------------------|-------------------------------------|------------------------------------|
| `PORT`           | Server port                         | `3000`                             |
| `NODE_ENV`       | Environment mode                    | `development`                      |
| `JWT_SECRET`     | JWT signing secret (min 32 chars)   | **Required**                       |
| `JWT_EXPIRES_IN` | JWT expiration                      | `30d`                              |
| `COOKIE_SECRET`  | Cookie signing secret               | **Required**                       |
| `DB_CLIENT`      | Database client (`sqlite3` or `pg`) | `sqlite3`                          |
| `DB_FILENAME`    | SQLite database file path           | `./backend/database/masterplan.db` |

For PostgreSQL production deployment, set:

- `DB_CLIENT=pg`
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## API Endpoints

All routes prefixed with `/api/v1`. Auth required except setup/login.

### Auth

- `POST /api/v1/auth/setup` - First-time PIN setup
- `POST /api/v1/auth/login` - PIN login
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Auth status

### Tasks

- `GET /api/v1/tasks` - All tasks (query: `?domain=career&done=false`)
- `GET /api/v1/tasks/:task_key` - Single task
- `PATCH /api/v1/tasks/:task_key` - Toggle task
- `GET /api/v1/tasks/search?q=...` - Search tasks

### Progress

- `GET /api/v1/progress` - All domain progress
- `GET /api/v1/progress/:domain` - Single domain progress

### Notes

- `GET /api/v1/notes` - All notes
- `POST /api/v1/notes` - Create note
- `PUT /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note

### Reviews

- `GET /api/v1/reviews` - All reviews
- `POST /api/v1/reviews` - Create review
- `GET /api/v1/reviews/:id` - Single review

## Deployment

### Railway / Render

1. Connect your Git repository
2. Set environment variables (use PostgreSQL)
3. Build command: `npm run build`
4. Start command: `npm start`
5. Run migrations: `npm run migrate`
6. Run seed: `npm run seed`

### VPS (Ubuntu)

```bash
# Install Node.js v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <your-repo>
cd masterplan
npm install
cp .env.example .env
# Edit .env with production values

# Setup database
npm run setup

# Build frontend
npm run build

# Use PM2 for process management
sudo npm install -g pm2
pm2 start backend/server.js --name masterplan
pm2 save
pm2 startup
```

## Database Migrations

```bash
# Run all pending migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback

# Create new migration
npx knex migrate:make migration_name --knexfile backend/knexfile.js
```

## Project Structure

```bash
masterplan/
├── backend/
│   ├── server.js
│   ├── app.js
│   ├── knexfile.js
│   ├── database/
│   │   ├── db.js
│   │   ├── migrations/
│   │   └── seeds/
│   ├── shared/
│   │   ├── middleware/
│   │   └── utils/
│   └── features/
│       ├── auth/
│       ├── tasks/
│       ├── progress/
│       ├── notes/
│       └── review/
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── manifest.json
    ├── public/
    │   └── icons/
    └── src/
        ├── main.js
        ├── styles/
        ├── shared/
        └── features/
```

## License

Private - Personal Use Only

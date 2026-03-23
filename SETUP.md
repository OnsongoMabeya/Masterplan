# 30-Year Life Masterplan - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
cd frontend && npm install && cd ..
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and set your JWT_SECRET and other values
```

### 3. Setup Database

```bash
npm run db:migrate
npm run db:seed
```

### 4. Development Mode

```bash
# Run both backend and frontend
npm run dev:all

# Or run separately:
# Terminal 1 - Backend (port 3000)
npm run dev

# Terminal 2 - Frontend (port 5173)
cd frontend && npm run dev
```

### 5. Production Build

```bash
# Build everything
npm run build

# Start production server
npm start
```

## Access the Application

- **Development**: <http://localhost:5173>
- **Production**: <http://localhost:3000>

## Default Credentials

On first run, you'll be prompted to create a 4-digit PIN.

## Project Structure

```bash
masterplan/
├── backend/
│   ├── database/
│   │   ├── migrations/     # Database schema
│   │   └── seeds/          # Initial data
│   ├── features/
│   │   ├── auth/           # Authentication
│   │   ├── tasks/          # Task management
│   │   ├── progress/       # Progress tracking
│   │   ├── notes/          # Notes CRUD
│   │   └── review/         # Review system
│   ├── shared/
│   │   ├── middleware/     # Auth, validation, errors
│   │   └── utils/          # JWT, responses
│   ├── app.js              # Express app
│   └── server.js           # Server entry
├── frontend/
│   ├── src/
│   │   ├── features/       # 14 domain tabs
│   │   ├── shared/         # API, auth, router
│   │   ├── styles/         # CSS files
│   │   ├── pwa/            # PWA install
│   │   ├── app.js          # Main app shell
│   │   └── main.js         # Entry point
│   ├── index.html
│   └── vite.config.js      # Vite + PWA config
└── scripts/
    ├── build.sh            # Production build
    └── dev.sh              # Dev servers
```

## Features

✅ **Backend**

- PIN-based authentication with JWT
- Task management with toggle & search
- Automatic progress calculation
- Notes and reviews CRUD
- SQLite database with Knex migrations

✅ **Frontend**

- Vanilla JS with Vite
- 14 life domain tabs
- Hash-based routing
- Responsive design
- Offline-ready PWA

✅ **PWA**

- Service worker with Workbox
- Offline support
- Install prompt
- App manifest

## Database Commands

```bash
# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:rollback

# Seed database
npm run db:seed

# Reset database (rollback, migrate, seed)
npm run db:reset
```

## Environment Variables

Required in `.env`:

- `PORT` - Backend port (default: 3000)
- `JWT_SECRET` - Secret for JWT tokens
- `JWT_EXPIRATION` - Token expiration (e.g., "7d")
- `COOKIE_SECRET` - Secret for cookie parser
- `NODE_ENV` - Environment (development/production)

## Troubleshooting

**Port already in use:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Database issues:**

```bash
# Reset database
npm run db:reset
```

**Frontend build fails:**

```bash
cd frontend
rm -rf node_modules dist
npm install
npm run build
```

## Next Steps

1. Add your own tasks or modify seed data
2. Customize domain tabs in `frontend/src/features/`
3. Add PWA icons to `frontend/public/icons/`
4. Deploy to production server

## Support

For issues or questions, refer to the README.md

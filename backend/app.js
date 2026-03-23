import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRoutes from './features/auth/auth.routes.js';
import tasksRoutes from './features/tasks/tasks.routes.js';
import progressRoutes from './features/progress/progress.routes.js';
import notesRoutes from './features/notes/notes.routes.js';
import reviewRoutes from './features/review/review.routes.js';
import metricsRoutes from './features/metrics/metrics.routes.js';
import quarterlyRoutes from './features/quarterly/quarterly.routes.js';
import { errorHandler, notFound } from './shared/middleware/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
}));
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Too many authentication attempts, please try again later' }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', tasksRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/notes', notesRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/metrics', metricsRoutes);
app.use('/api/v1/quarterly', quarterlyRoutes);

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));
  
  app.get('*', (req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendPath, 'index.html'));
    } else {
      next();
    }
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;

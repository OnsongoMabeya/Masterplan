import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const config = {
  development: {
    client: process.env.DB_CLIENT || 'better-sqlite3',
    connection: process.env.DB_CLIENT === 'pg' ? {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    } : {
      filename: process.env.DB_FILENAME || join(__dirname, 'database', 'masterplan.db')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'database', 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'database', 'seeds')
    }
  },

  production: {
    client: process.env.DB_CLIENT || 'pg',
    connection: process.env.DB_CLIENT === 'pg' ? {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false }
    } : {
      filename: process.env.DB_FILENAME || join(__dirname, 'database', 'masterplan.db')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'database', 'migrations')
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};

export default config;

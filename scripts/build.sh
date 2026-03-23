#!/bin/bash
set -e

echo "🏗️  Building 30-Year Life Masterplan..."

echo "📦 Installing dependencies..."
npm install

echo "🗄️  Running database migrations..."
npm run db:migrate

echo "🌱 Seeding database..."
npm run db:seed

echo "🎨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build complete!"
echo "🚀 Run 'npm start' to launch the application"

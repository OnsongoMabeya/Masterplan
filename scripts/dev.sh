#!/bin/bash

echo "🚀 Starting development servers..."

trap 'kill 0' EXIT

echo "📡 Starting backend server on port 3000..."
npm run dev &

echo "🎨 Starting frontend dev server on port 5173..."
cd frontend && npm run dev &

wait

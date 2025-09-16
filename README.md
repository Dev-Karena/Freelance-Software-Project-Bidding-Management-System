# Freelance Platform (Monorepo)

Quick start (local):

1) Backend
- cd apps/backend
- set env (Windows PowerShell example):
  $env:PORT="4010"; $env:MONGO_URL="mongodb://127.0.0.1:27017/freelance"; $env:JWT_SECRET="devsecret"; $env:STRIPE_SECRET_KEY="sk_test_123"
- npm run dev

2) Frontend
- cd apps/frontend
- npm run dev

API Docs: http://localhost:4010/api/docs

Stripe: test mode configured. Webhook endpoint: POST /api/wallet/webhook

Seed demo data:
- cd apps/backend
- $env:MONGO_URL="mongodb://127.0.0.1:27017/freelance"; npm run seed

Docker (optional):
- docker-compose up --build

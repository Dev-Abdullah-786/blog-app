# Blog Application - Full Stack (Next.js + NestJS)

## 📋 Prerequisites
- Node.js 18+
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/Dev-Abdullah-786/blog-app.git
cd blog-app
npm install
```
### 2. Setup Environment Files
- Create apps/backend/.env:
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret-key-change-this"
JWT_EXPIRATION="7d"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3001/auth/google/callback"
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```
- Create apps/frontend/.env.local:
```bash
NEXT_PUBLIC_GRAPHQL_URL="http://localhost:3001/graphql"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
```

### 3. Database Setup
```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 4. Start Development
```bash
# From root directory
npm run dev

# Or run separately:
# Terminal 1:
cd apps/backend
npm run start:dev

# Terminal 2:
cd apps/frontend
npm run dev
```

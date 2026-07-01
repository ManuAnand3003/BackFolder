# backfolder

Pinterest-style portfolio workspace for 5 people — projects, ideas, what's done, what's cooking.

## Stack
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Frontend**: React + Vite + Tailwind CSS + React Icons
- **Auth**: JWT via httpOnly cookies

## Quickstart

### 1. Install dependencies
cd server && npm install
cd ../client && npm install

### 2. Set up environment
cp server/.env.example server/.env
# Edit MONGO_URI and JWT_SECRET in server/.env

### 3. Seed the database (creates 5 users + sample projects)
cd server && npm run seed

### 4. Run dev servers (two terminals)
cd server && npm run dev      # → http://localhost:5000
cd client && npm run dev      # → http://localhost:5173

## Seeded accounts
| User      | Email                    | Password    | Role   |
|-----------|--------------------------|-------------|--------|
| Manu      | manu@backfolder.dev      | password123 | admin  |
| Member 2  | member2@backfolder.dev   | password123 | member |
| Member 3  | member3@backfolder.dev   | password123 | member |
| Member 4  | member4@backfolder.dev   | password123 | member |
| Member 5  | member5@backfolder.dev   | password123 | member |

## API routes
| Method | Route                | Auth         | Description             |
|--------|----------------------|--------------|-------------------------|
| POST   | /api/auth/login      | public       | Login                   |
| POST   | /api/auth/logout     | member+      | Logout                  |
| GET    | /api/auth/me         | member+      | Current user            |
| GET    | /api/projects        | member+      | All projects (filterable)|
| POST   | /api/projects        | member+      | Create project          |
| PUT    | /api/projects/:id    | owner/admin  | Update project          |
| DELETE | /api/projects/:id    | owner/admin  | Delete project          |
| GET    | /api/users/members   | member+      | Public member list      |
| PUT    | /api/users/me        | member+      | Update own profile      |
| GET    | /api/users           | admin only   | All users               |
| POST   | /api/users           | admin only   | Create user account     |

## Folder structure
backfolder/
├── server/
│   ├── config/        # DB connection
│   ├── controllers/   # Route handlers
│   ├── middleware/     # auth.js (protect + adminOnly)
│   ├── models/        # User.js, Project.js
│   ├── routes/        # authRoutes, projectRoutes, userRoutes
│   ├── scripts/       # seed.js
│   └── index.js       # Express entry point
└── client/
    └── src/
        ├── components/
        │   ├── auth/       # LoginPage, RequireAuth
        │   ├── dashboard/  # ProjectCard, MasonryBoard, FilterBar
        │   └── layout/     # AppShell, Sidebar
        ├── context/        # AuthContext
        ├── hooks/          # useProjects, useMembers
        ├── pages/          # DashboardPage + stubs
        └── utils/          # api.js (axios), colors.js

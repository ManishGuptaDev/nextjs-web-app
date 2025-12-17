# Todo App with Supabase + Prisma

A simple Next.js todo application with Supabase backend and Prisma ORM for type-safe database operations and migrations.

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed. If needed, run:
```bash
npm install
```

### 2. Setup Supabase Database

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once your project is ready, go to **Settings** → **Database**
3. Find your connection string (choose "URI" format)
4. Copy the connection string - you'll need this for the DATABASE_URL

### 3. Configure Environment Variables

Update the `.env.local` file with your Supabase credentials:

```env
# Prisma Database URL (your Supabase connection string)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Optional: Supabase client credentials
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Prisma Migrations

Create the database tables using Prisma migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Create and run the migration
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view your data
npx prisma studio
```

This will:
- Create the `todos` table with all necessary fields
- Generate TypeScript types from your schema
- Apply the migration to your database

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The app includes the following API routes:

### Get All Todos
```
GET /api/todos
```

### Create Todo
```
POST /api/todos
Body: { "title": "Todo title" }
```

### Get Single Todo
```
GET /api/todos/[id]
```

### Update Todo
```
PUT /api/todos/[id]
Body: { "title": "New title", "completed": true }
```

### Delete Todo
```
DELETE /api/todos/[id]
```

## Prisma Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Pull schema from existing database
npx prisma db pull

# Push schema changes without migrations
npx prisma db push
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET all, POST create
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE by ID
│   ├── page.tsx                  # Todo app UI
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   └── prisma.ts                 # Prisma client config
└── prisma/
    ├── schema.prisma             # Database schema
    └── migrations/               # Migration history
```


## Tech Stack

- **Next.js 16** - React framework
- **Supabase** - PostgreSQL database hosting
- **Prisma** - Type-safe ORM and migrations
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

# Prisma Setup Guide

This project uses **Prisma ORM** for type-safe database access and migrations with a Supabase PostgreSQL database.

## Why Prisma?

- ✅ **Type-safe queries** - Full TypeScript support with auto-completion
- ✅ **Easy migrations** - Version control for your database schema
- ✅ **Great DX** - Intuitive API and excellent tooling
- ✅ **Database GUI** - Prisma Studio for visual data management

## Schema Location

The database schema is defined in [`prisma/schema.prisma`](prisma/schema.prisma):

```prisma
model Todo {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  title      String
  completed  Boolean  @default(false)
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  @@map("todos")
}
```

## Working with Migrations

### Create a New Migration

When you modify the schema, create a migration:

```bash
npx prisma migrate dev --name describe_your_change
```

Example:
```bash
npx prisma migrate dev --name add_priority_field
```

This will:
1. Create a new migration file in `prisma/migrations/`
2. Apply it to your database
3. Regenerate the Prisma Client with updated types

### View Migration History

```bash
# See all migrations
ls prisma/migrations/

# Check migration status
npx prisma migrate status
```

### Apply Migrations (Production)

```bash
npx prisma migrate deploy
```

### Reset Database (Development Only)

**⚠️ WARNING: This deletes ALL data!**

```bash
npx prisma migrate reset
```

## Using Prisma Studio

Open a visual database browser:

```bash
npx prisma studio
```

This opens a GUI at `http://localhost:5555` where you can:
- View all tables and data
- Create, edit, and delete records
- Filter and search data
- No SQL required!

## Prisma Client Usage

The Prisma client is initialized in [`src/lib/prisma.ts`](src/lib/prisma.ts) with proper singleton pattern for Next.js:

```typescript
import { prisma } from '@/lib/prisma';

// Find all todos
const todos = await prisma.todo.findMany();

// Create a todo
const todo = await prisma.todo.create({
  data: { title: 'Learn Prisma', completed: false }
});

// Update a todo
const updated = await prisma.todo.update({
  where: { id: 'some-id' },
  data: { completed: true }
});

// Delete a todo
await prisma.todo.delete({
  where: { id: 'some-id' }
});
```

## Adding a New Model

1. **Edit the schema** (`prisma/schema.prisma`):

```prisma
model Category {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String
  color     String?
  createdAt DateTime @default(now()) @map("created_at")

  @@map("categories")
}
```

2. **Create and apply migration**:

```bash
npx prisma migrate dev --name add_category_model
```

3. **Use the new model**:

```typescript
const category = await prisma.category.create({
  data: { name: 'Work', color: '#FF0000' }
});
```

## Adding Relations

Example: Add categories to todos:

```prisma
model Todo {
  id         String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  title      String
  completed  Boolean   @default(false)
  categoryId String?   @map("category_id") @db.Uuid
  category   Category? @relation(fields: [categoryId], references: [id])
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime  @updatedAt @map("updated_at")

  @@map("todos")
}

model Category {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String
  todos     Todo[]
  createdAt DateTime @default(now()) @map("created_at")

  @@map("categories")
}
```

Query with relations:

```typescript
const todosWithCategories = await prisma.todo.findMany({
  include: {
    category: true
  }
});
```

## Common Prisma Queries

### Find Operations

```typescript
// Find all
await prisma.todo.findMany();

// Find with filters
await prisma.todo.findMany({
  where: { completed: false }
});

// Find with sorting
await prisma.todo.findMany({
  orderBy: { createdAt: 'desc' }
});

// Find with pagination
await prisma.todo.findMany({
  skip: 10,
  take: 10
});

// Find one
await prisma.todo.findUnique({
  where: { id: 'some-id' }
});

// Find or throw error
await prisma.todo.findUniqueOrThrow({
  where: { id: 'some-id' }
});
```

### Create Operations

```typescript
// Create one
await prisma.todo.create({
  data: { title: 'New todo' }
});

// Create many
await prisma.todo.createMany({
  data: [
    { title: 'Todo 1' },
    { title: 'Todo 2' }
  ]
});
```

### Update Operations

```typescript
// Update one
await prisma.todo.update({
  where: { id: 'some-id' },
  data: { completed: true }
});

// Update many
await prisma.todo.updateMany({
  where: { completed: false },
  data: { completed: true }
});

// Upsert (update or create)
await prisma.todo.upsert({
  where: { id: 'some-id' },
  update: { completed: true },
  create: { title: 'New todo' }
});
```

### Delete Operations

```typescript
// Delete one
await prisma.todo.delete({
  where: { id: 'some-id' }
});

// Delete many
await prisma.todo.deleteMany({
  where: { completed: true }
});
```

## Troubleshooting

### "Prisma Client is not yet generated"

Run:
```bash
npx prisma generate
```

### "Can't reach database server"

Check your `DATABASE_URL` in `.env.local` and ensure:
- Your Supabase project is active
- The connection string is correct
- Your password doesn't contain special characters (or is properly encoded)

### Schema and database out of sync

```bash
# Pull schema from database
npx prisma db pull

# Or push schema to database (without migration)
npx prisma db push
```

## Learn More

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API Reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma with Next.js](https://www.prisma.io/nextjs)

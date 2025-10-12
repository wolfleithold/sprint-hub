# PostgreSQL Migration Guide

This application has been updated to use PostgreSQL instead of SQLite for production deployment compatibility.

## Database Setup Options

### Option 1: Neon (Recommended - Free Tier Available)

1. Go to [Neon](https://neon.tech/) and create a free account
2. Create a new project
3. Copy the connection string from your dashboard
4. Update your `.env` file with the connection string

### Option 2: Supabase (Free Tier Available)

1. Go to [Supabase](https://supabase.com/) and create an account
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (URI format)
5. Update your `.env` file

### Option 3: Local PostgreSQL Development

1. Install PostgreSQL locally:
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS**: Use Homebrew: `brew install postgresql`
   - **Linux**: Use your package manager: `sudo apt-get install postgresql`

2. Create a database:
   ```sql
   createdb sprint_hub_dev
   ```

3. Update your `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/sprint_hub_dev"
   ```

## Migration Steps

1. **Choose a database option** from above and get your DATABASE_URL

2. **Update your .env file**:
   ```bash
   DATABASE_URL="your_postgresql_connection_string_here"
   ```

3. **Generate Prisma client** (after updating schema):
   ```bash
   npm run db:generate
   ```

4. **Push the schema** to your new PostgreSQL database:
   ```bash
   npm run db:push
   ```

5. **Seed the database** with initial data:
   ```bash
   npm run db:seed
   ```

6. **Test locally**:
   ```bash
   npm run dev
   ```

## Production Deployment

### For Vercel:
1. Add your DATABASE_URL in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` with your production database connection string

### For Netlify:
1. Add your DATABASE_URL in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add `DATABASE_URL` with your production database connection string

## Troubleshooting

### Connection Issues
- Make sure your DATABASE_URL is correctly formatted
- Check that your database service is running
- Verify your credentials and database name

### Migration Errors
- If you get schema errors, try: `npm run db:reset`
- Make sure you've run `npm run db:generate` after schema changes

### Local Development
- For local PostgreSQL, make sure the service is running:
  - **Windows**: Check Services or use `pg_ctl`
  - **macOS**: `brew services start postgresql`
  - **Linux**: `sudo service postgresql start`

## Benefits of PostgreSQL

- ✅ Production-ready for Vercel/Netlify
- ✅ Better performance for complex queries
- ✅ ACID compliance
- ✅ Rich data types and features
- ✅ Horizontal scaling capabilities
- ✅ Strong community and ecosystem

Your application code doesn't need to change - Prisma handles all the database differences automatically!
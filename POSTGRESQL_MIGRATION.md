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

2. Start PostgreSQL service:
   - **Windows**: It should start automatically, or use Services panel
   - **macOS**: `brew services start postgresql`
   - **Linux**: `sudo service postgresql start`

3. Create a database using Command Prompt/Terminal:

   **Windows - If psql command not found:**
   ```bash
   # Option 1: Navigate to PostgreSQL bin directory first
   cd "C:\Program Files\PostgreSQL\15\bin"
   # (Replace 15 with your PostgreSQL version number)
   
   # Then run psql
   psql -U postgres
   
   # Option 2: Use full path to psql
   "C:\Program Files\PostgreSQL\15\bin\psql" -U postgres
   ```
   
   **macOS/Linux:**
   ```bash
   # Connect to PostgreSQL as superuser
   psql -U postgres
   ```
   
   **Once connected to psql:**
   ```sql
   # Create database
   CREATE DATABASE sprint_hub_dev;
   
   # Create user (optional but recommended)
   CREATE USER sprint_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE sprint_hub_dev TO sprint_user;
   
   # Exit psql
   \q
   ```

4. Update your `.env` file:
   ```bash
   # Using postgres superuser (simple)
   DATABASE_URL="postgresql://postgres:your_postgres_password@localhost:5432/sprint_hub_dev"
   
   # Or using custom user (recommended)
   DATABASE_URL="postgresql://sprint_user:your_password@localhost:5432/sprint_hub_dev"
   ```

## Connecting pgAdmin 4

After setting up your local PostgreSQL:

1. **Open pgAdmin 4** (it opens in your browser)

2. **Add a new server:**
   - Right-click "Servers" → "Register" → "Server"

3. **General tab:**
   - Name: `Sprint Hub Local` (or any name you prefer)

4. **Connection tab:**
   - Host: `localhost`
   - Port: `5432`
   - Maintenance database: `postgres`
   - Username: `postgres` (or your custom user)
   - Password: `your_postgres_password`
   - Save password: ✅ (check this)

5. **Click "Save"**

6. **Navigate to your database:**
   - Expand "Sprint Hub Local"
   - Expand "Databases" 
   - You should see `sprint_hub_dev`

Now you can view your tables, run queries, and manage your database through pgAdmin's web interface!

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
- For pgAdmin: Check if PostgreSQL service is running on port 5432

### Migration Errors
- If you get schema errors, try: `npm run db:reset`
- Make sure you've run `npm run db:generate` after schema changes

### Local Development
- For local PostgreSQL, make sure the service is running:
  - **Windows**: Check Services or use `pg_ctl`
  - **macOS**: `brew services start postgresql`
  - **Linux**: `sudo service postgresql start`

### pgAdmin Connection Issues
- If pgAdmin can't connect, verify PostgreSQL is running
- Check if port 5432 is available
- Verify your postgres user password

### Windows psql Command Not Found
If you get "psql is not recognized" error:

1. **Find your PostgreSQL installation:**
   - Usually located at: `C:\Program Files\PostgreSQL\[version]\bin`
   - Replace `[version]` with your installed version (like 15, 14, etc.)

2. **Option 1 - Add to PATH (permanent):**
   - Open System Properties → Environment Variables
   - Edit the "Path" variable
   - Add: `C:\Program Files\PostgreSQL\15\bin`
   - Restart Command Prompt

3. **Option 2 - Use full path (temporary):**
   ```bash
   "C:\Program Files\PostgreSQL\15\bin\psql" -U postgres
   ```

4. **Option 3 - Use SQL Shell (psql) from Start Menu:**
   - Search for "SQL Shell (psql)" in Start Menu
   - This opens psql directly

## Benefits of PostgreSQL

- ✅ Production-ready for Vercel/Netlify
- ✅ Better performance for complex queries
- ✅ ACID compliance
- ✅ Rich data types and features
- ✅ Horizontal scaling capabilities
- ✅ Strong community and ecosystem

Your application code doesn't need to change - Prisma handles all the database differences automatically!
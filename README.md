# SprintHub

A progress hub designed to improve skills and get interview ready in 2 months. Built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and SQLite.

## Features

- 📊 **Dashboard** with progress tracking and visual progress ring
- 📅 **Weekly Goals** view with completion tracking
- ✅ **Daily Tasks** with interactive checklists
- 📝 **Notes** for each day
- 📚 **Resources** organized by day
- 🌙 **Dark Mode** support
- 🧪 **Comprehensive Testing** with Vitest
- 📱 **Responsive Design** with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Testing**: Vitest with Testing Library
- **Theme**: next-themes for dark mode

## Database Schema

The application uses a hierarchical data structure:

```
Sprint → Weeks → Days → Tasks
                      → Resources
```

- **Sprint**: The 8-week preparation program
- **Week**: Individual weeks with goals and progress
- **Day**: Daily entries with notes and completion status
- **Task**: Individual tasks with completion tracking
- **Resource**: Learning materials (articles, videos, tutorials)

## Setup Instructions

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wolfleithold/sprint-hub.git
   cd sprint-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   
   Create a `.env` file in the root directory:
   ```bash
   DATABASE_URL="file:./dev.db"
   ```

4. **Initialize and seed the database**

   Update the seed data to represent the correct date you begin your sprint!

   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Seed the database with initial data
- `npm run db:studio` - Open Prisma Studio to view/edit data

## API Routes

### GET /api/sprint
Returns the sprint data with all weeks, days, tasks, and resources, including progress statistics.

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "weeks": [...],
  "stats": {
    "totalTasks": number,
    "completedTasks": number,
    "totalDays": number,
    "completedDays": number,
    "completionPercentage": number
  }
}
```

### PATCH /api/task/[id]
Update a task's completion status, title, or description.

**Body:**
```json
{
  "completed": boolean,
  "title": "string",
  "description": "string"
}
```

### PATCH /api/day/[id]
Update a day's notes or completion status.

**Body:**
```json
{
  "notes": "string",
  "completed": boolean
}
```

## Testing

The project includes comprehensive tests for API routes:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch
```

Test files are located in the `__tests__` directory and cover:
- Sprint API endpoint
- Task update operations
- Day update operations

## Project Structure

```
sprint-hub/
├── app/
│   ├── api/              # API routes
│   │   ├── sprint/       # Sprint endpoints
│   │   ├── task/[id]/    # Task endpoints
│   │   └── day/[id]/     # Day endpoints
│   ├── day/[id]/         # Day detail page
│   ├── week/[id]/        # Week detail page
│   ├── layout.tsx        # Root layout with navigation
│   ├── page.tsx          # Dashboard page
│   └── providers.tsx     # Theme provider
├── components/           # React components
│   ├── ProgressRing.tsx  # Progress visualization
│   └── ThemeToggle.tsx   # Dark mode toggle
├── lib/
│   └── prisma.ts         # Prisma client instance
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding script
├── __tests__/            # Test files
└── vitest.config.ts      # Vitest configuration
```

## AI-Assisted Development

This project was developed with the assistance of AI tools to accelerate development and ensure best practices:

### Development Process

1. **Architecture & Planning**: AI helped design the database schema and application architecture following Next.js 14 best practices with the App Router.

2. **Code Generation**: AI assisted in generating:
   - Prisma schema with proper relationships and constraints
   - API routes following RESTful conventions
   - React components with TypeScript types
   - Comprehensive seed data for an 8-week interview prep plan

3. **Best Practices**: AI ensured adherence to:
   - TypeScript strict typing
   - Next.js 14 App Router patterns
   - Server and Client Component separation
   - Proper error handling and loading states
   - Accessible UI components
   - Dark mode support with next-themes

4. **Testing**: AI helped create comprehensive test coverage:
   - API endpoint tests
   - Database operation tests
   - Proper test setup and teardown

5. **Documentation**: AI generated clear documentation including:
   - Setup instructions
   - API documentation
   - Project structure overview
   - Usage examples

### Key AI Contributions

- **Rapid Prototyping**: Quickly scaffolded the entire application structure
- **Consistency**: Maintained consistent coding patterns across all files
- **Best Practices**: Applied industry standards and Next.js 14 conventions
- **Comprehensive Seed Data**: Generated realistic 8-week interview prep curriculum
- **Type Safety**: Ensured full TypeScript coverage with proper types

### Learning Points

This project demonstrates how AI can:
- Accelerate development without sacrificing quality
- Ensure consistent patterns and best practices
- Generate comprehensive test coverage
- Create detailed documentation
- Help developers learn new frameworks and patterns

## Future Enhancements

Potential features to add:
- User authentication and multiple sprint support
- Calendar integration
- Progress charts and analytics
- Export functionality (PDF reports)
- Mobile app version
- Collaboration features
- Customizable sprint templates

## License

MIT License - feel free to use this project for your own interview preparation!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

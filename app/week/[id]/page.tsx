import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getWeekData(id: string) {
  const week = await prisma.week.findUnique({
    where: { id },
    include: {
      days: {
        orderBy: { dayNumber: 'asc' },
        include: {
          tasks: {
            orderBy: { order: 'asc' },
          },
          resources: true,
        },
      },
      sprint: true,
    },
  });

  return week;
}

export default async function WeekPage({ params }: { params: { id: string } }) {
  const week = await getWeekData(params.id);

  if (!week) {
    notFound();
  }

  const goals = week.goals ? JSON.parse(week.goals) : [];
  
  const totalTasks = week.days.reduce(
    (acc, day) => acc + day.tasks.length,
    0
  );
  const completedTasks = week.days.reduce(
    (acc, day) => acc + day.tasks.filter(t => t.completed).length,
    0
  );
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold mb-2">
          Week {week.weekNumber}: {week.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date(week.startDate).toLocaleDateString()} - {new Date(week.endDate).toLocaleDateString()}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Week Progress</h2>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
          <div
            className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>

      {/* Goals */}
      {goals.length > 0 && (
        <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Goals for this Week</h2>
          <ul className="space-y-2">
            {goals.map((goal: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Days */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Days</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {week.days.map((day) => {
            const dayProgress = day.tasks.length > 0
              ? Math.round((day.tasks.filter(t => t.completed).length / day.tasks.length) * 100)
              : 0;

            return (
              <Link
                key={day.id}
                href={`/day/${day.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Day {day.dayNumber}</h3>
                  {day.completed && (
                    <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Tasks</span>
                    <span className="font-medium">{dayProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all"
                      style={{ width: `${dayProgress}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {day.tasks.filter(t => t.completed).length} / {day.tasks.length} tasks
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

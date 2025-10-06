import Link from 'next/link';
import { ProgressRing } from '@/components/ProgressRing';
import { SprintWithStats } from '@/lib/types';

async function getSprintData(): Promise<SprintWithStats> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/sprint`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch sprint data');
  }
  
  return res.json();
}

export default async function Dashboard() {
  const sprint = await getSprintData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{sprint.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{sprint.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Progress Overview */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Overall Progress</h2>
          <div className="flex flex-col items-center">
            <ProgressRing progress={sprint.stats.completionPercentage} />
            <div className="mt-6 space-y-2 w-full max-w-xs">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                <span className="font-medium">
                  {sprint.stats.completedTasks} / {sprint.stats.totalTasks}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Days:</span>
                <span className="font-medium">
                  {sprint.stats.completedDays} / {sprint.stats.totalDays}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Weeks Overview */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Weeks</h2>
          <div className="space-y-3">
            {sprint.weeks.map((week) => {
              const weekTasks = week.days.reduce(
                (acc, day) => acc + day.tasks.length,
                0
              );
              const weekCompletedTasks = week.days.reduce(
                (acc, day) =>
                  acc + day.tasks.filter((t) => t.completed).length,
                0
              );
              const weekProgress = weekTasks > 0 
                ? Math.round((weekCompletedTasks / weekTasks) * 100) 
                : 0;

              return (
                <Link
                  key={week.id}
                  href={`/week/${week.id}`}
                  className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Week {week.weekNumber}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {weekProgress}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {week.title}
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all"
                      style={{ width: `${weekProgress}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {sprint.weeks.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Weeks</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {sprint.stats.completedTasks}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Tasks Completed
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {sprint.stats.totalDays}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Days
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {sprint.stats.completedDays}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Days Completed
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ProgressRing } from '@/components/ProgressRing';
import { SprintWithStats } from '@/lib/types';
import { prisma } from '@/lib/prisma';

async function getSprintData(): Promise<SprintWithStats> {
  try {
    console.log('Fetching sprint data directly from database');
    
    const sprint = await prisma.sprint.findFirst({
      include: {
        weeks: {
          orderBy: { weekNumber: 'asc' },
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
          },
        },
      },
    });

    if (!sprint) {
      throw new Error('Sprint not found');
    }

    // Calculate progress statistics
    const totalTasks = sprint.weeks.reduce(
      (acc, week) =>
        acc +
        week.days.reduce((dayAcc, day) => dayAcc + day.tasks.length, 0),
      0
    );

    const completedTasks = sprint.weeks.reduce(
      (acc, week) =>
        acc +
        week.days.reduce(
          (dayAcc, day) =>
            dayAcc + day.tasks.filter((task) => task.completed).length,
          0
        ),
      0
    );

    const totalDays = sprint.weeks.reduce(
      (acc, week) => acc + week.days.length,
      0
    );

    const completedDays = sprint.weeks.reduce(
      (acc, week) =>
        acc + week.days.filter((day) => day.completed).length,
      0
    );

    const sprintWithStats: SprintWithStats = {
      ...sprint,
      stats: {
        totalTasks,
        completedTasks,
        totalDays,
        completedDays,
        completionPercentage:
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      },
    };

    console.log('Sprint data fetched successfully from database');
    return sprintWithStats;
  } catch (error) {
    console.error('getSprintData error:', error);
    throw error;
  }
}

export default async function Dashboard() {
  const sprint = await getSprintData();

  return (
    <div className="container mx-auto px-4 py-4 h-screen flex flex-col">
      {/* Compact Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-1">{sprint.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">{sprint.description}</p>
      </div>

      {/* Quick Stats */}
      <div className="mb-4 grid grid-cols-4 gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {sprint.weeks.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Weeks</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {sprint.stats.completedTasks}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Tasks Done</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {sprint.stats.totalDays}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Days</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {sprint.stats.completedDays}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Days Done</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid lg:grid-cols-3 gap-4 min-h-0">
        
        {/* Progress Overview */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-3 text-center">Overall Progress</h2>
            <div className="flex-1 flex flex-col items-center justify-center">
              <ProgressRing progress={sprint.stats.completionPercentage} />
              <div className="mt-4 space-y-1 w-full max-w-xs text-sm">
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
        </div>

        {/* Weeks Overview */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-3 text-center">Weeks</h2>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 content-start">
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
                    className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow min-h-[100px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-sm">Week {week.weekNumber}</h3>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {weekProgress}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {week.title}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-1.5 rounded-full transition-all"
                        style={{ width: `${weekProgress}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
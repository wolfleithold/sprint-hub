import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
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
      return NextResponse.json(
        { error: 'Sprint not found' },
        { status: 404 }
      );
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

    return NextResponse.json({
      ...sprint,
      stats: {
        totalTasks,
        completedTasks,
        totalDays,
        completedDays,
        completionPercentage:
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      },
    });
  } catch (error) {
    console.error('Error fetching sprint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sprint data' },
      { status: 500 }
    );
  }
}

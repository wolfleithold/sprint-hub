import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DayContent from './DayContent';

async function getDayData(id: string) {
  const day = await prisma.day.findUnique({
    where: { id },
    include: {
      tasks: {
        orderBy: { order: 'asc' },
      },
      resources: true,
      week: {
        include: {
          sprint: true,
        },
      },
    },
  });

  return day;
}

export default async function DayPage({ params }: { params: { id: string } }) {
  const day = await getDayData(params.id);

  if (!day) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link 
          href={`/week/${day.week.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Week {day.week.weekNumber}
        </Link>
        <h1 className="text-4xl font-bold mb-2">
          Week {day.week.weekNumber}, Day {day.dayNumber}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date(day.date).toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <DayContent day={day} />
    </div>
  );
}

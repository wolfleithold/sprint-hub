import { Prisma } from '@prisma/client';

export type SprintWithWeeks = Prisma.SprintGetPayload<{
  include: {
    weeks: {
      include: {
        days: {
          include: {
            tasks: true;
            resources: true;
          };
        };
      };
    };
  };
}>;

export type WeekWithDays = Prisma.WeekGetPayload<{
  include: {
    days: {
      include: {
        tasks: true;
        resources: true;
      };
    };
    sprint: true;
  };
}>;

export type DayWithRelations = Prisma.DayGetPayload<{
  include: {
    tasks: true;
    resources: true;
    week: {
      include: {
        sprint: true;
      };
    };
  };
}>;

export interface SprintStats {
  totalTasks: number;
  completedTasks: number;
  totalDays: number;
  completedDays: number;
  completionPercentage: number;
}

export interface SprintWithStats extends SprintWithWeeks {
  stats: SprintStats;
}

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { GET } from '@/app/api/sprint/route';
import { prisma } from '@/lib/prisma';

describe('Sprint API', () => {
  beforeAll(async () => {
    // Ensure database has data
    const sprint = await prisma.sprint.findFirst();
    if (!sprint) {
      throw new Error('Database not seeded. Run: npm run db:seed');
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return sprint data with all related models', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('weeks');
    expect(data).toHaveProperty('stats');
    expect(Array.isArray(data.weeks)).toBe(true);
  });

  it('should include statistics', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.stats).toHaveProperty('totalTasks');
    expect(data.stats).toHaveProperty('completedTasks');
    expect(data.stats).toHaveProperty('totalDays');
    expect(data.stats).toHaveProperty('completedDays');
    expect(data.stats).toHaveProperty('completionPercentage');
    expect(typeof data.stats.completionPercentage).toBe('number');
  });

  it('should have weeks with days and tasks', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.weeks.length).toBeGreaterThan(0);
    const firstWeek = data.weeks[0];
    expect(firstWeek).toHaveProperty('days');
    expect(Array.isArray(firstWeek.days)).toBe(true);
    
    if (firstWeek.days.length > 0) {
      const firstDay = firstWeek.days[0];
      expect(firstDay).toHaveProperty('tasks');
      expect(firstDay).toHaveProperty('resources');
    }
  });
});

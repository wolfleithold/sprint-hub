import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PATCH } from '@/app/api/day/[id]/route';
import { prisma } from '@/lib/prisma';

describe('Day API', () => {
  let testDayId: string;

  beforeAll(async () => {
    // Get a day to test with
    const day = await prisma.day.findFirst();
    if (!day) {
      throw new Error('No days found in database');
    }
    testDayId = day.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should update day notes', async () => {
    const request = new Request('http://localhost:3000/api/day/' + testDayId, {
      method: 'PATCH',
      body: JSON.stringify({ notes: 'Test notes for the day' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await PATCH(request, { params: { id: testDayId } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id', testDayId);
    expect(data).toHaveProperty('notes', 'Test notes for the day');

    // Clean up
    await prisma.day.update({
      where: { id: testDayId },
      data: { notes: '' },
    });
  });

  it('should update day completion status', async () => {
    const request = new Request('http://localhost:3000/api/day/' + testDayId, {
      method: 'PATCH',
      body: JSON.stringify({ completed: true }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await PATCH(request, { params: { id: testDayId } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('completed', true);

    // Clean up
    await prisma.day.update({
      where: { id: testDayId },
      data: { completed: false },
    });
  });

  it('should return day with tasks and resources', async () => {
    const request = new Request('http://localhost:3000/api/day/' + testDayId, {
      method: 'PATCH',
      body: JSON.stringify({ notes: 'Test' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await PATCH(request, { params: { id: testDayId } });
    const data = await response.json();

    expect(data).toHaveProperty('tasks');
    expect(data).toHaveProperty('resources');
    expect(Array.isArray(data.tasks)).toBe(true);
    expect(Array.isArray(data.resources)).toBe(true);

    // Clean up
    await prisma.day.update({
      where: { id: testDayId },
      data: { notes: '' },
    });
  });
});

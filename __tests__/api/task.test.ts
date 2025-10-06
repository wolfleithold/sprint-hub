import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PATCH } from '@/app/api/task/[id]/route';
import { prisma } from '@/lib/prisma';

describe('Task API', () => {
  let testTaskId: string;

  beforeAll(async () => {
    // Get a task to test with
    const task = await prisma.task.findFirst();
    if (!task) {
      throw new Error('No tasks found in database');
    }
    testTaskId = task.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should update task completion status', async () => {
    const request = new Request('http://localhost:3000/api/task/' + testTaskId, {
      method: 'PATCH',
      body: JSON.stringify({ completed: true }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await PATCH(request, { params: { id: testTaskId } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id', testTaskId);
    expect(data).toHaveProperty('completed', true);

    // Clean up - reset the task
    await prisma.task.update({
      where: { id: testTaskId },
      data: { completed: false },
    });
  });

  it('should update task title', async () => {
    const originalTask = await prisma.task.findUnique({
      where: { id: testTaskId },
    });

    const request = new Request('http://localhost:3000/api/task/' + testTaskId, {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated Task Title' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await PATCH(request, { params: { id: testTaskId } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('title', 'Updated Task Title');

    // Clean up - restore original title
    if (originalTask) {
      await prisma.task.update({
        where: { id: testTaskId },
        data: { title: originalTask.title },
      });
    }
  });
});

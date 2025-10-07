import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { completed, title, description } = body;

    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...(completed !== undefined && { completed }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

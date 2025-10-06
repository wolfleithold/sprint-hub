import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { notes, completed } = body;

    const day = await prisma.day.update({
      where: { id: params.id },
      data: {
        ...(notes !== undefined && { notes }),
        ...(completed !== undefined && { completed }),
      },
      include: {
        tasks: {
          orderBy: { order: 'asc' },
        },
        resources: true,
      },
    });

    return NextResponse.json(day);
  } catch (error) {
    console.error('Error updating day:', error);
    return NextResponse.json(
      { error: 'Failed to update day' },
      { status: 500 }
    );
  }
}

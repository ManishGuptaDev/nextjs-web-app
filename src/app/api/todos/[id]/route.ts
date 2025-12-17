import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/todos/[id] - Get a single todo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Failed to fetch todo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, completed } = body;

    const updateData: { title?: string; completed?: boolean } = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    const todo = await prisma.todo.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Failed to update todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Failed to delete todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}

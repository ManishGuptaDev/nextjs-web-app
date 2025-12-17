import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

// GET /api/currency - Get all conversion history
export async function GET() {
  try {
    const history = await prisma.history.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

// POST /api/currency - Create a new history
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usdValue, convertedCurrency, rate, convertedValue } = body;

    const history = await prisma.history.create({
      data: {
        usdValue,
        convertedCurrency,
        rate,
        convertedValue
      },
    });

    return NextResponse.json(history, { status: 201 });
  } catch (error) {
    console.error('Failed to create history:', error);
    return NextResponse.json(
      { error: 'Failed to create history' },
      { status: 500 }
    );
  }
}
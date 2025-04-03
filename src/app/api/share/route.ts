import { prisma } from '@/shared/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { cipherId, content, result } = await request.json();

    const now = new Date();
    const expireAt = now.getTime() + 7 * 24 * 60 * 60 * 1000; // + 1 week

    const share = await prisma.share.create({
      data: { content: JSON.stringify(content), cipherId, result, expireAt: new Date(expireAt) },
    });
    return NextResponse.json({ id: share.id }, { status: 201 });
  } catch (e) {
    return new NextResponse(`Internal server error: ${e}`, { status: 500 });
  }
}

// test only
export async function GET() {
  try {
    const share = await prisma.share.findMany();

    return NextResponse.json(share, { status: 200 });
  } catch (e) {
    return new NextResponse(`Internal server error: ${e}`, { status: 500 });
  }
}

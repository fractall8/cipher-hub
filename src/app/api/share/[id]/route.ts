import { prisma } from '@/shared/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing ID parameter.' }, { status: 400 });
    }

    const share = await prisma.share.findUnique({ where: { id } });

    if (!share) {
      return NextResponse.json({ error: 'Share record not found.' }, { status: 404 });
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(share.content);
    } catch {
      return NextResponse.json({ error: 'Failed to parse share content.' }, { status: 500 });
    }

    return NextResponse.json(
      {
        cipherId: share.cipherId,
        content: parsedContent,
        result: share.result,
        expireAt: share.expireAt,
      },
      { status: 200 },
    );
  } catch {
    return new NextResponse('Internal server error.', { status: 500 });
  }
}

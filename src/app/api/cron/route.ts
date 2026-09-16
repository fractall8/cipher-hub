import { prisma } from '@/shared/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header = request.headers.get('authorization');
  if (!header) return false;

  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(header);

  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('Running cron job...');

    const now = new Date().toISOString();

    const response = await prisma.share.deleteMany({ where: { expireAt: { lt: now } } });

    return NextResponse.json({ ok: true, deleted: response.count }, { status: 200 });
  } catch (e) {
    return new NextResponse(`Internal server error: ${e}`, { status: 500 });
  }
}

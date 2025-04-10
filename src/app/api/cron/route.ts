import { prisma } from '@/shared/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Running cron job...');

    const now = new Date().toISOString();

    const response = await prisma.share.deleteMany({ where: { expireAt: { lt: now } } });

    return NextResponse.json({ ok: true, deleted: response.count }, { status: 200 });
  } catch (e) {
    return new NextResponse(`Internal server error: ${e}`, { status: 500 });
  }
}

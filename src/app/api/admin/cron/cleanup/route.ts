import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const cronSecret = request.headers.get('x-cron-secret');
    if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();

    const deleted = await prisma.user.deleteMany({
      where: {
        status: 'PENDING',
        createdAt: { lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
        affiliate: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${deleted.count} unverified accounts`,
      cleaned: deleted.count,
    });
  } catch (error) {
    console.error('Cron cleanup error:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}

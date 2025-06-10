import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(articles);
}
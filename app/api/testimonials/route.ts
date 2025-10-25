import { NextResponse } from 'next/server';
import { testimonials } from '@/lib/db';

export async function GET() {
  return NextResponse.json(testimonials);
}

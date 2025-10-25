import { NextRequest, NextResponse } from 'next/server';
import { findCakeById } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cake = findCakeById(id);
  
  if (!cake) {
    return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
  }
  
  return NextResponse.json(cake);
}

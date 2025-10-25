import { NextRequest, NextResponse } from 'next/server';
import { cakes, createCake, updateCake, deleteCake } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { Cake } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(cakes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cakes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const cakeData = await request.json();
    const newCake: Cake = {
      id: Date.now().toString(),
      ...cakeData
    };

    createCake(newCake);
    return NextResponse.json(newCake);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create cake' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { cakeId, ...updates } = await request.json();
    const updatedCake = updateCake(cakeId, updates);

    if (!updatedCake) {
      return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCake);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cake' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { cakeId } = await request.json();
    const deleted = deleteCake(cakeId);

    if (!deleted) {
      return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete cake' }, { status: 500 });
  }
}

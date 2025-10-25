import { NextRequest, NextResponse } from 'next/server';
import { createOrder, findOrdersByUserId } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { Order } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { items, total, shippingAddress, paymentIntentId } = await request.json();

    const order: Order = {
      id: Date.now().toString(),
      userId: decoded.userId,
      items,
      total,
      status: 'pending',
      shippingAddress,
      paymentIntentId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    createOrder(order);

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const orders = findOrdersByUserId(decoded.userId);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

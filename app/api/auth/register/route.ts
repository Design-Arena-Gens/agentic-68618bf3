import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';
import { User } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user: User = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      role: 'customer',
      addresses: [],
      createdAt: new Date()
    };

    createUser(user);
    const token = generateToken(user.id, user.email, user.role);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}

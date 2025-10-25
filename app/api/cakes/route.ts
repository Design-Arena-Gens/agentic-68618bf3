import { NextRequest, NextResponse } from 'next/server';
import { cakes } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const flavor = searchParams.get('flavor');
  const occasion = searchParams.get('occasion');
  const category = searchParams.get('category');
  const sortBy = searchParams.get('sortBy');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  let filteredCakes = [...cakes];

  if (flavor) {
    filteredCakes = filteredCakes.filter(c => c.flavor === flavor);
  }
  if (occasion) {
    filteredCakes = filteredCakes.filter(c => c.occasion === occasion);
  }
  if (category) {
    filteredCakes = filteredCakes.filter(c => c.category === category);
  }
  if (minPrice) {
    filteredCakes = filteredCakes.filter(c => c.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredCakes = filteredCakes.filter(c => c.price <= parseFloat(maxPrice));
  }

  if (sortBy === 'price-asc') {
    filteredCakes.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredCakes.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredCakes.sort((a, b) => a.name.localeCompare(b.name));
  }

  return NextResponse.json(filteredCakes);
}

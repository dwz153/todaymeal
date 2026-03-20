import { NextRequest, NextResponse } from 'next/server';
import { getFoodsByGenre } from '@/lib/foods';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const genresParam = searchParams.get('genres') || '';
  const mealType = searchParams.get('mealType') || undefined;

  const genres = genresParam ? genresParam.split(',').filter(Boolean) : [];

  try {
    const foods = await getFoodsByGenre(genres, mealType);
    return NextResponse.json({ foods });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch foods' }, { status: 500 });
  }
}

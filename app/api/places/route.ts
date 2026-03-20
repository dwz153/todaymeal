import { NextRequest, NextResponse } from 'next/server';
import { searchNearbyRestaurants } from '@/lib/kakao';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword') || '';
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');

  if (!keyword || !lat || !lng) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  if (!process.env.KAKAO_REST_API_KEY) {
    return NextResponse.json({ error: 'Kakao API not configured' }, { status: 503 });
  }

  try {
    const restaurants = await searchNearbyRestaurants(keyword, lat, lng);
    return NextResponse.json({ restaurants });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}

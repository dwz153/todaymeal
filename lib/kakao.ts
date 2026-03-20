import { Restaurant } from '@/types';

export async function searchNearbyRestaurants(
  keyword: string,
  lat: number,
  lng: number,
  radius = 1000
): Promise<Restaurant[]> {
  const params = new URLSearchParams({
    query: keyword,
    x: String(lng),
    y: String(lat),
    radius: String(radius),
    category_group_code: 'FD6',
    sort: 'distance',
  });

  const res = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?${params}`, {
    headers: { Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}` },
  });

  if (!res.ok) throw new Error('Kakao API error');
  const data = await res.json();
  return data.documents as Restaurant[];
}

export function getKakaoMapSearchUrl(keyword: string): string {
  return `https://map.kakao.com/?q=${encodeURIComponent(keyword)}`;
}

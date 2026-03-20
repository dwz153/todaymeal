'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Food, Restaurant, MealType } from '@/types';
import { FALLBACK_FOODS, GENRE_CONFIG } from '@/lib/foodData';
import { addHistory } from '@/lib/history';
import { getKakaoMapSearchUrl } from '@/lib/kakao';
import RestaurantList from '@/components/RestaurantList';

function ResultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get('foodId') || '';
  const mealType = (searchParams.get('mealType') || 'lunch') as MealType;

  const [food, setFood] = useState<Food | null>(null);
  const [imgError, setImgError] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [restLoading, setRestLoading] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const found = FALLBACK_FOODS.find((f) => f.id === foodId);
    if (!found) { router.replace('/'); return; }
    setFood(found);

    // Save to history (only once)
    if (!saved) {
      addHistory({
        mealType,
        foodName: found.name,
        foodId: found.id,
        imageUrl: found.imageUrl,
        emoji: found.emoji,
      });
      setSaved(true);
    }
  }, [foodId, mealType, router, saved]);

  const fetchNearbyRestaurants = async () => {
    if (!food) return;
    setShowRestaurants(true);
    setRestLoading(true);

    if (!navigator.geolocation) {
      setLocationDenied(true);
      setRestLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `/api/places?keyword=${encodeURIComponent(food.name)}&lat=${latitude}&lng=${longitude}`
          );
          if (!res.ok) throw new Error('API error');
          const data = await res.json();
          setRestaurants(data.restaurants || []);
        } catch {
          setLocationDenied(true);
        } finally {
          setRestLoading(false);
        }
      },
      () => {
        setLocationDenied(true);
        setRestLoading(false);
      },
      { timeout: 8000 }
    );
  };

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center">
          <div className="text-5xl animate-bounce">🍽️</div>
          <p className="mt-3 text-gray-500">결과 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const genre = food.genre[0] || '한식';
  const config = GENRE_CONFIG[genre] || GENRE_CONFIG['한식'];
  const kakaoUrl = getKakaoMapSearchUrl(food.name);

  return (
    <main className="min-h-screen bg-[#FFF8F0] flex flex-col pb-10">
      {/* Winner Hero */}
      <div className="relative h-72 w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${config.from}, ${config.to})` }}
        >
          {!imgError && food.imageUrl ? (
            <Image
              src={food.imageUrl}
              alt={food.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              unoptimized
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl drop-shadow-2xl">{food.emoji}</span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-transparent to-black/30" />

        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-12 left-4 text-white/80 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm"
        >
          ← 홈
        </button>

        {/* Crown */}
        <div className="absolute top-10 right-4">
          <span className="text-4xl drop-shadow-lg">👑</span>
        </div>
      </div>

      {/* Result Content */}
      <div className="px-6 -mt-4">
        {/* Champion Banner */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5">
          <p className="text-orange-400 text-sm font-semibold mb-1">🏆 오늘의 선택!</p>
          <h1 className="text-3xl font-black text-gray-800 mb-2">{food.name}</h1>
          <div className="flex flex-wrap gap-2">
            {food.tags.map((tag) => (
              <span key={tag} className="bg-orange-50 text-orange-500 text-xs font-medium px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-400">
              {food.genre.join(' · ')} · {mealType === 'lunch' ? '점심' : '저녁'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Link
            href={`/genre?mealType=${mealType}`}
            className="flex items-center justify-center gap-2 bg-white border-2 border-orange-200 text-orange-500 py-3.5 rounded-2xl font-semibold text-sm hover:bg-orange-50 active:scale-95 transition-all"
          >
            🔄 다시하기
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3.5 rounded-2xl font-semibold text-sm shadow-md shadow-orange-100 active:scale-95 transition-all"
          >
            🏠 홈으로
          </Link>
        </div>

        {/* Nearby Restaurants Section */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 pt-5 pb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-1">주변 식당 찾기</h2>
            <p className="text-sm text-gray-400">
              {food.name}을(를) 파는 근처 식당을 찾아드려요
            </p>
          </div>

          {!showRestaurants ? (
            <div className="px-6 pb-6">
              <button
                onClick={fetchNearbyRestaurants}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3.5 rounded-2xl font-semibold text-sm shadow-md active:scale-95 transition-all"
              >
                📍 내 주변 식당 보기
              </button>
            </div>
          ) : locationDenied ? (
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-2xl p-4 text-center mb-3">
                <p className="text-2xl mb-2">📍</p>
                <p className="text-sm text-gray-500 mb-3">위치 권한이 필요하거나 API가 미설정되었어요.</p>
                <a
                  href={kakaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-gray-800 px-5 py-2.5 rounded-xl font-semibold text-sm"
                >
                  🗺️ 카카오맵에서 검색하기
                </a>
              </div>
            </div>
          ) : (
            <div className="px-6 pb-6">
              <RestaurantList restaurants={restaurants} loading={restLoading} />
              {!restLoading && restaurants.length > 0 && (
                <a
                  href={kakaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center text-sm text-orange-400 font-medium"
                >
                  더 많은 식당 보기 →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultPageContent />
    </Suspense>
  );
}

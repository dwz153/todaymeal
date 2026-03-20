'use client';

import { Restaurant } from '@/types';

interface RestaurantListProps {
  restaurants: Restaurant[];
  loading?: boolean;
}

export default function RestaurantList({ restaurants, loading }: RestaurantListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-sm">주변에 검색된 식당이 없어요</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {restaurants.map((r) => (
        <a
          key={r.id}
          href={r.place_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow active:bg-gray-50"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{r.place_name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{r.category_name}</p>
              <p className="text-sm text-gray-500 mt-1 truncate">
                📍 {r.road_address_name || r.address_name}
              </p>
              {r.phone && (
                <p className="text-sm text-gray-400 mt-0.5">📞 {r.phone}</p>
              )}
            </div>
            <div className="ml-3 text-right flex-shrink-0">
              <span className="inline-block bg-orange-50 text-orange-500 text-xs font-medium px-2 py-1 rounded-lg">
                {parseInt(r.distance) >= 1000
                  ? `${(parseInt(r.distance) / 1000).toFixed(1)}km`
                  : `${r.distance}m`}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

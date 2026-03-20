'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Genre, MealType } from '@/types';
import { GENRE_CONFIG } from '@/lib/foodData';

const GENRES: Genre[] = ['한식', '중식', '일식', '양식', '분식', '패스트푸드', '아시안'];

function GenrePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mealType = (searchParams.get('mealType') || 'lunch') as MealType;
  const [selected, setSelected] = useState<Set<Genre>>(new Set(GENRES));

  const toggle = (genre: Genre) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(genre)) {
        if (next.size > 1) next.delete(genre);
      } else {
        next.add(genre);
      }
      return next;
    });
  };

  const handleStart = () => {
    const genreList = Array.from(selected).join(',');
    router.push(`/battle?genres=${encodeURIComponent(genreList)}&mealType=${mealType}`);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-14 pb-2">
        <button
          onClick={() => router.back()}
          className="text-gray-400 text-sm flex items-center gap-1 mb-4 hover:text-gray-600"
        >
          ← 뒤로
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          어떤 종류의 음식을<br />먹고 싶으세요?
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          여러 개 선택 가능 · 최소 1개 필수
        </p>
      </div>

      {/* Genre Grid */}
      <div className="flex-1 px-6 py-6">
        <div className="grid grid-cols-2 gap-3">
          {GENRES.map((genre) => {
            const config = GENRE_CONFIG[genre];
            const isSelected = selected.has(genre);
            return (
              <button
                key={genre}
                onClick={() => toggle(genre)}
                className="relative rounded-2xl p-5 text-left transition-all duration-200 active:scale-95"
                style={
                  isSelected
                    ? {
                        background: `linear-gradient(135deg, ${config.from}, ${config.to})`,
                        boxShadow: '0 4px 16px rgba(251,146,60,0.25)',
                      }
                    : {
                        background: '#ffffff',
                        border: '2px solid #f3f4f6',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      }
                }
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-white/30 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
                <span className="text-4xl block mb-2">{config.emoji}</span>
                <span
                  className="font-bold text-base"
                  style={{ color: isSelected ? '#ffffff' : '#374151' }}
                >
                  {genre}
                </span>
              </button>
            );
          })}
          {/* "전체선택" toggle */}
          <button
            onClick={() => {
              if (selected.size === GENRES.length) {
                setSelected(new Set([GENRES[0]]));
              } else {
                setSelected(new Set(GENRES));
              }
            }}
            className="rounded-2xl p-5 text-left border-2 border-dashed border-gray-200 bg-white/50 transition-all active:scale-95"
          >
            <span className="text-4xl block mb-2">🎲</span>
            <span className="font-bold text-base text-gray-500">
              {selected.size === GENRES.length ? '전체 해제' : '전체 선택'}
            </span>
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          {selected.size}개 장르 선택됨
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-10">
        <button
          onClick={handleStart}
          disabled={selected.size === 0}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 rounded-2xl text-lg font-bold shadow-lg shadow-orange-200 hover:from-orange-500 hover:to-orange-600 transition-all active:scale-95 disabled:opacity-50"
        >
          🏆 월드컵 시작!
        </button>
      </div>
    </main>
  );
}

export default function GenrePage() {
  return (
    <Suspense>
      <GenrePageContent />
    </Suspense>
  );
}

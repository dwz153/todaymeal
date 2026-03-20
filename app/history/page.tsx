'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HistoryItem } from '@/types';
import { getHistory, clearHistory } from '@/lib/history';
import { GENRE_CONFIG, FALLBACK_FOODS } from '@/lib/foodData';

function HistoryCard({ item }: { item: HistoryItem }) {
  const [imgError, setImgError] = useState(false);
  const food = FALLBACK_FOODS.find((f) => f.id === item.foodId);
  const genre = food?.genre[0] || '한식';
  const config = GENRE_CONFIG[genre] || GENRE_CONFIG['한식'];

  const date = new Date(item.date);
  const dateStr = date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' });
  const timeStr = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
      {/* Food Image/Emoji */}
      <div
        className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${config.from}, ${config.to})` }}
      >
        {!imgError && item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.foodName}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl">{item.emoji}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 text-base truncate">{item.foodName}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {item.mealType === 'lunch' ? '☀️ 점심' : '🌙 저녁'}
        </p>
      </div>

      {/* Date */}
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-medium text-gray-600">{dateStr}</p>
        <p className="text-xs text-gray-400">{timeStr}</p>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    setShowConfirm(false);
  };

  // Group by date
  const grouped: Record<string, HistoryItem[]> = {};
  for (const item of history) {
    const key = new Date(item.date).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 pt-14 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="text-gray-400 text-sm flex items-center gap-1 mb-2"
            >
              ← 뒤로
            </button>
            <h1 className="text-2xl font-bold text-gray-800">내 식사 히스토리</h1>
            <p className="text-sm text-gray-400 mt-0.5">최근 {history.length}개 기록</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1.5 hover:text-red-400 hover:border-red-200 transition-colors"
            >
              전체 삭제
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <span className="text-6xl mb-4">📋</span>
            <p className="text-gray-500 font-medium">아직 히스토리가 없어요</p>
            <p className="text-sm text-gray-400 mt-1">메뉴를 결정하면 여기에 기록돼요</p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 bg-orange-400 text-white px-6 py-3 rounded-2xl font-semibold text-sm"
            >
              🍽️ 메뉴 결정하러 가기
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([date, items]) => (
              <div key={date}>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2 ml-1">{date}</p>
                <div className="space-y-2">
                  {items.map((item) => (
                    <HistoryCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
            <p className="text-center text-xs text-gray-300 py-2">최근 30개까지 저장돼요</p>
          </div>
        )}
      </div>

      {/* Clear Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">히스토리 삭제</h3>
            <p className="text-sm text-gray-500 mb-6">
              모든 기록을 삭제할까요? 이 작업은 되돌릴 수 없어요.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-2xl font-semibold text-gray-600 text-sm"
              >
                취소
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-semibold text-sm"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

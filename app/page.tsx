'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MealType } from '@/types';
import { getHistory } from '@/lib/history';

type TimeSlot = 'morning' | 'lunch' | 'bridge' | 'dinner' | 'night';

function detectTimeSlot(hour: number): TimeSlot {
  if (hour < 11) return 'morning';
  if (hour < 15) return 'lunch';
  if (hour < 17) return 'bridge';
  if (hour < 22) return 'dinner';
  return 'night';
}

function getMealTypeFromSlot(slot: TimeSlot): MealType {
  return slot === 'morning' || slot === 'lunch' || slot === 'bridge' ? 'lunch' : 'dinner';
}

const SLOT_CONFIG: Record<TimeSlot, { label: string; emoji: string; desc: string; bg: string }> = {
  morning: { label: '오전', emoji: '🌅', desc: '이른 시간이에요. 점심 메뉴를 미리 골라볼까요?', bg: 'from-yellow-100 to-orange-50' },
  lunch: { label: '점심', emoji: '☀️', desc: '점심 시간이에요! 오늘 뭐 먹을까요?', bg: 'from-orange-100 to-yellow-50' },
  bridge: { label: '이른 저녁', emoji: '🌤️', desc: '배고프죠? 저녁 메뉴도 미리 골라봐요!', bg: 'from-amber-100 to-orange-50' },
  dinner: { label: '저녁', emoji: '🌙', desc: '저녁 시간이에요! 오늘의 만찬을 결정해요.', bg: 'from-indigo-100 to-purple-50' },
  night: { label: '야식', emoji: '🌃', desc: '야식 시간! 오늘 야식은 뭐로 할까요?', bg: 'from-purple-100 to-indigo-50' },
};

export default function HomePage() {
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('lunch');
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [historyCount, setHistoryCount] = useState(0);
  const [now, setNow] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    const slot = detectTimeSlot(hour);
    setTimeSlot(slot);
    setMealType(getMealTypeFromSlot(slot));
    setHistoryCount(getHistory().length);
    setNow(
      new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    );
  }, []);

  const config = SLOT_CONFIG[timeSlot];
  return (
    <main className={`min-h-screen bg-gradient-to-b ${config.bg} flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <div>
          <p className="text-sm text-gray-500">오늘의 식사</p>
          <h1 className="text-2xl font-bold text-gray-800">TodayMeal</h1>
        </div>
        <Link
          href="/history"
          className="relative flex items-center gap-1.5 bg-white rounded-full px-3 py-2 shadow-sm text-sm font-medium text-gray-600 hover:shadow-md transition-shadow"
        >
          <span>📋</span>
          <span>히스토리</span>
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </Link>
      </div>

      {/* Main Card */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Time Badge */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs font-medium">현재 시각</p>
                <p className="text-white text-2xl font-bold">{now}</p>
              </div>
              <span className="text-5xl">{config.emoji}</span>
            </div>
          </div>

          <div className="px-6 py-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{config.desc}</h2>

            {/* Meal Type Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mt-4 mb-6">
              <button
                onClick={() => setMealType('lunch')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mealType === 'lunch'
                    ? 'bg-white text-orange-500 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                ☀️ 점심
              </button>
              <button
                onClick={() => setMealType('dinner')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mealType === 'dinner'
                    ? 'bg-white text-indigo-500 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                🌙 저녁
              </button>
            </div>

            {/* Start Button */}
            <Link
              href={`/genre?mealType=${mealType}`}
              className="block w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white text-center py-4 rounded-2xl text-lg font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:from-orange-500 hover:to-orange-600 transition-all active:scale-95"
            >
              🍽️ 메뉴 결정하기
            </Link>

            <p className="text-center text-gray-400 text-xs mt-3">
              {mealType === 'lunch' ? '점심' : '저녁'} 메뉴를 이상형 월드컵으로 골라요!
            </p>
          </div>
        </div>

      </div>

      {/* Bottom padding for mobile */}
      <div className="pb-8" />
    </main>
  );
}

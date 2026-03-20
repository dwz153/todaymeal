'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Food } from '@/types';
import { FALLBACK_FOODS, GENRE_CONFIG } from '@/lib/foodData';

interface MatchState {
  pairs: [Food, Food][];
  currentPairIndex: number;
  roundWinners: Food[];
  roundNumber: number;
  totalRounds: number;
  totalMatches: number;
  matchesDone: number;
}

function FoodBattleCard({
  food,
  onClick,
}: {
  food: Food;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const genre = food.genre[0] || '한식';
  const config = GENRE_CONFIG[genre] || GENRE_CONFIG['한식'];
  const gradientStyle = { background: `linear-gradient(135deg, ${config.from}, ${config.to})` };

  return (
    <button
      onClick={onClick}
      className="relative w-full flex-1 overflow-hidden group active:brightness-110 transition-all duration-150"
    >
      {/* Background image/gradient */}
      <div className="absolute inset-0" style={gradientStyle}>
        {!imgError && food.imageUrl && (
          <Image
            src={food.imageUrl}
            alt={food.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
            priority
          />
        )}
        {(imgError || !food.imageUrl) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl drop-shadow-2xl">{food.emoji}</span>
          </div>
        )}
      </div>

      {/* 중앙 어두운 오버레이 — 텍스트 가독성 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 음식 이름 — 정중앙 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <p
          className="text-white font-black text-center leading-tight drop-shadow-2xl"
          style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
        >
          {food.name}
        </p>
      </div>

      {/* 탭 시 체크 표시 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity bg-white/10">
        <div className="bg-white/30 backdrop-blur-sm rounded-full p-6">
          <span className="text-white font-black" style={{ fontSize: '2.5rem' }}>✓</span>
        </div>
      </div>
    </button>
  );
}

function BattlePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genresParam = searchParams.get('genres') || '';
  const mealType = searchParams.get('mealType') || 'lunch';

  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const initBattle = useCallback(() => {
    const genres = genresParam ? genresParam.split(',').filter(Boolean) : [];
    const filtered = FALLBACK_FOODS.filter((f) => {
      const genreMatch = genres.length === 0 || f.genre.some((g) => genres.includes(g));
      const mealMatch = f.mealType.includes(mealType);
      return genreMatch && mealMatch;
    });

    if (filtered.length < 4) {
      router.replace('/genre');
      return;
    }

    // Pick best bracket size
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    let poolSize = 4;
    for (const s of [16, 8, 4]) {
      if (shuffled.length >= s) { poolSize = s; break; }
    }
    const pool = shuffled.slice(0, poolSize);

    // Build first round pairs
    const pairs: [Food, Food][] = [];
    for (let i = 0; i < pool.length; i += 2) {
      pairs.push([pool[i], pool[i + 1]]);
    }

    const totalRounds = Math.log2(poolSize);
    const totalMatches = poolSize - 1;

    setMatchState({
      pairs,
      currentPairIndex: 0,
      roundWinners: [],
      roundNumber: 1,
      totalRounds,
      totalMatches,
      matchesDone: 0,
    });
    setLoading(false);
  }, [genresParam, mealType, router]);

  useEffect(() => {
    initBattle();
  }, [initBattle]);

  const handlePick = (winner: Food) => {
    if (!matchState) return;

    const newWinners = [...matchState.roundWinners, winner];
    const newMatchesDone = matchState.matchesDone + 1;
    const isRoundDone = matchState.currentPairIndex + 1 >= matchState.pairs.length;

    if (isRoundDone) {
      // 이번 라운드가 끝남
      if (newWinners.length === 1) {
        // 승자가 1명 → 최종 우승자
        router.push(
          `/result?foodId=${winner.id}&mealType=${mealType}&genres=${encodeURIComponent(genresParam)}`
        );
        return;
      }
      // 다음 라운드 대진표 구성
      const newPairs: [Food, Food][] = [];
      for (let i = 0; i < newWinners.length; i += 2) {
        newPairs.push([newWinners[i], newWinners[i + 1]]);
      }
      setMatchState({
        ...matchState,
        pairs: newPairs,
        currentPairIndex: 0,
        roundWinners: [],
        roundNumber: matchState.roundNumber + 1,
        matchesDone: newMatchesDone,
      });
    } else {
      // 같은 라운드 다음 경기
      setMatchState({
        ...matchState,
        currentPairIndex: matchState.currentPairIndex + 1,
        roundWinners: newWinners,
        matchesDone: newMatchesDone,
      });
    }

    setAnimKey((k) => k + 1);
  };

  if (loading || !matchState) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-5xl mb-4 animate-bounce">🍽️</div>
          <p className="text-lg font-semibold">대진표 구성 중...</p>
        </div>
      </div>
    );
  }

  const currentPair = matchState.pairs[matchState.currentPairIndex];
  if (!currentPair) return null;

  const [foodA, foodB] = currentPair;
  const progress = matchState.matchesDone / matchState.totalMatches;
  const pairCount = matchState.pairs.length;
  const roundLabel =
    pairCount === 1 ? '결승' :
    pairCount === 2 ? '준결승' :
    `${pairCount * 2}강`;

  const currentMatchInRound = matchState.currentPairIndex + 1;
  const totalMatchesInRound = matchState.pairs.length;

  return (
    <main className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-safe-top pt-12 pb-3">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.back()}
            className="text-white/70 text-sm bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5"
          >
            ← 뒤로
          </button>
          <div className="text-center">
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full">
              {roundLabel} {currentMatchInRound}/{totalMatchesInRound}
            </span>
          </div>
          <div className="w-16" />
        </div>
        {/* Progress bar */}
        <div className="bg-white/20 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-orange-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Battle Cards — 상하 분할 */}
      <div key={animKey} className="flex flex-col flex-1 h-full">
        {/* Top food */}
        <FoodBattleCard food={foodA} onClick={() => handlePick(foodA)} />

        {/* VS Divider */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-2xl">
            <span className="text-gray-800 font-black text-sm">VS</span>
          </div>
        </div>

        {/* Bottom food */}
        <FoodBattleCard food={foodB} onClick={() => handlePick(foodB)} />
      </div>
    </main>
  );
}

export default function BattlePage() {
  return (
    <Suspense>
      <BattlePageContent />
    </Suspense>
  );
}

import { Food } from '@/types';
import { FALLBACK_FOODS } from './foodData';

export async function getFoodsByGenre(genres: string[], mealType?: string): Promise<Food[]> {
  const filtered = FALLBACK_FOODS.filter((food) => {
    const genreMatch = genres.length === 0 || food.genre.some((g) => genres.includes(g));
    const mealMatch = !mealType || food.mealType.includes(mealType);
    return genreMatch && mealMatch;
  });
  return filtered;
}

export function buildBracket(foods: Food[]): Food[][] {
  const shuffled = [...foods].sort(() => Math.random() - 0.5);
  const sizes = [16, 8, 4];
  let poolSize = 4;
  for (const s of sizes) {
    if (shuffled.length >= s) {
      poolSize = s;
      break;
    }
  }
  const pool = shuffled.slice(0, poolSize);
  const firstRound: Food[][] = [];
  for (let i = 0; i < pool.length; i += 2) {
    firstRound.push([pool[i], pool[i + 1]]);
  }
  return firstRound;
}

export function getRoundName(total: number, current: number): string {
  const rounds = Math.log2(total);
  const roundsLeft = rounds - current;
  if (roundsLeft === 0) return '결승';
  if (roundsLeft === 1) return '준결승';
  if (roundsLeft === 2) return '8강';
  return `${total}강`;
}

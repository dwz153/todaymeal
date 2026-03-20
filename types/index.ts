export interface Food {
  id: string;
  name: string;
  genre: string[];
  imageUrl: string;
  tags: string[];
  mealType: string[];
  emoji: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  mealType: 'lunch' | 'dinner';
  foodName: string;
  foodId: string;
  imageUrl: string;
  emoji: string;
}

export type Genre = '한식' | '중식' | '일식' | '양식' | '분식' | '패스트푸드' | '아시안';
export type MealType = 'lunch' | 'dinner';

export interface BattleState {
  rounds: Food[][];
  currentRoundIndex: number;
  currentMatchIndex: number;
  winners: Food[];
}

export interface Restaurant {
  id: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  place_url: string;
  distance: string;
  x: string;
  y: string;
}

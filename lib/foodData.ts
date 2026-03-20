import { Food } from '@/types';

// All IDs verified from unsplash.com search results.
// Format A: old timestamp IDs  → IMG('1590…-abc123')
// Format B: new short IDs      → IMG('gp9fq2XxJ2c')   same URL pattern
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=800&fit=crop&q=85`;

export const FALLBACK_FOODS: Food[] = [
  // ── 한식 (15) ─────────────────────────────────────────────────
  { id: 'k1',  name: '김치찌개', genre: ['한식'], emoji: '🍲',
    imageUrl: IMG('1590301157890-4810ed352733'),
    tags: ['국물','매운맛','발효'], mealType: ['lunch','dinner'] },
  { id: 'k2',  name: '된장찌개', genre: ['한식'], emoji: '🫕',
    imageUrl: IMG('1547592166-23ac45744acd'),
    tags: ['국물','구수함','발효'], mealType: ['lunch','dinner'] },
  { id: 'k3',  name: '비빔밥',   genre: ['한식'], emoji: '🥗',
    imageUrl: IMG('1557499305-0af888c3d8ec'),
    tags: ['건강','채소','고추장'], mealType: ['lunch','dinner'] },
  { id: 'k4',  name: '불고기',   genre: ['한식'], emoji: '🥩',
    imageUrl: IMG('1544025162-d76538584ca0'),
    tags: ['구이','달콤','소고기'], mealType: ['lunch','dinner'] },
  { id: 'k5',  name: '삼겹살',   genre: ['한식'], emoji: '🥓',
    // Verified: "meat is grilling on a hot korean barbecue"
    imageUrl: IMG('sy2GVc_MOrg'),
    tags: ['구이','돼지고기','상추'], mealType: ['dinner'] },
  { id: 'k6',  name: '갈비탕',   genre: ['한식'], emoji: '🍖',
    imageUrl: IMG('1547592180-85f173990554'),
    tags: ['국물','소고기','진한맛'], mealType: ['lunch','dinner'] },
  { id: 'k7',  name: '순두부찌개', genre: ['한식'], emoji: '🫕',
    imageUrl: IMG('1540189549336-e6e99eb4b8db'),
    tags: ['국물','두부','매운맛'], mealType: ['lunch','dinner'] },
  { id: 'k8',  name: '제육볶음', genre: ['한식'], emoji: '🌶️',
    imageUrl: IMG('1600891964599-f61ba0e24092'),
    tags: ['볶음','매운맛','돼지고기'], mealType: ['lunch','dinner'] },
  { id: 'k9',  name: '닭갈비',   genre: ['한식'], emoji: '🐔',
    imageUrl: IMG('1598103442097-8b74394b95c1'),
    tags: ['볶음','매운맛','닭고기'], mealType: ['lunch','dinner'] },
  { id: 'k10', name: '해물파전', genre: ['한식'], emoji: '🥞',
    imageUrl: IMG('1563245372-f21724e3856d'),
    tags: ['전','해산물','바삭'], mealType: ['lunch','dinner'] },
  { id: 'k11', name: '곰탕',     genre: ['한식'], emoji: '🍜',
    imageUrl: IMG('1511690656952-34342bb7c2f2'),
    tags: ['국물','소고기','진한맛'], mealType: ['lunch','dinner'] },
  { id: 'k12', name: '설렁탕',   genre: ['한식'], emoji: '🥣',
    imageUrl: IMG('1496412705862-e0088b8cf10d'),
    tags: ['국물','뼈','담백'], mealType: ['lunch','dinner'] },
  { id: 'k13', name: '냉면',     genre: ['한식'], emoji: '🍝',
    imageUrl: IMG('1567620905732-2d1ec7ab7445'),
    tags: ['면','시원함','여름'], mealType: ['lunch'] },
  { id: 'k14', name: '육개장',   genre: ['한식'], emoji: '🌶️',
    imageUrl: IMG('1455619452474-d2be8b1e70cd'),
    tags: ['국물','매운맛','소고기'], mealType: ['lunch','dinner'] },
  { id: 'k15', name: '쌈밥',     genre: ['한식'], emoji: '🥬',
    imageUrl: IMG('1529692236671-f1f6cf9683ba'),
    tags: ['건강','채소','고기'], mealType: ['lunch','dinner'] },

  // ── 중식 (8) ──────────────────────────────────────────────────
  { id: 'c1', name: '짜장면', genre: ['중식'], emoji: '🍜',
    // Verified: "jjajangmyeon, a Korean noodle dish"
    imageUrl: IMG('nlYb5bCxk8k'),
    tags: ['면','짜장','달콤짭짤'], mealType: ['lunch','dinner'] },
  { id: 'c2', name: '짬뽕',   genre: ['중식'], emoji: '🍲',
    imageUrl: IMG('1569718212165-3a8278d5f624'),
    tags: ['면','해산물','매운맛'], mealType: ['lunch','dinner'] },
  { id: 'c3', name: '탕수육', genre: ['중식'], emoji: '🍖',
    imageUrl: IMG('1529042410759-befb1204b468'),
    tags: ['튀김','달콤','새콤'], mealType: ['lunch','dinner'] },
  { id: 'c4', name: '볶음밥', genre: ['중식'], emoji: '🍚',
    imageUrl: IMG('1512058564366-18510be2db19'),
    tags: ['볶음','밥','간단'], mealType: ['lunch','dinner'] },
  { id: 'c5', name: '마파두부', genre: ['중식'], emoji: '🫕',
    imageUrl: IMG('1603133872878-684f208fb84b'),
    tags: ['두부','매운맛','중국'], mealType: ['lunch','dinner'] },
  { id: 'c6', name: '깐풍기', genre: ['중식'], emoji: '🐔',
    imageUrl: IMG('1562967914-608f82629710'),
    tags: ['튀김','닭고기','달콤매콤'], mealType: ['lunch','dinner'] },
  { id: 'c7', name: '딤섬',   genre: ['중식'], emoji: '🥟',
    // Verified: "close up of bowl of dumplings with chopsticks"
    imageUrl: IMG('hLSSPqULFZs'),
    tags: ['만두','찜','중국'], mealType: ['lunch','dinner'] },
  { id: 'c8', name: '군만두', genre: ['중식'], emoji: '🥟',
    // Verified: "bunch of dumplings that are sitting on a pan"
    imageUrl: IMG('sZaJNL-f9zM'),
    tags: ['만두','구이','바삭'], mealType: ['lunch','dinner'] },

  // ── 일식 (8) ──────────────────────────────────────────────────
  { id: 'j1', name: '스시',     genre: ['일식'], emoji: '🍣',
    // Verified: "sushi nigiri with a slice of raw fish"
    imageUrl: IMG('cUXOAApg_so'),
    tags: ['생선','신선','일본'], mealType: ['lunch','dinner'] },
  { id: 'j2', name: '라멘',     genre: ['일식'], emoji: '🍜',
    // Verified: "delicious ramen bowl topped with various ingredients"
    imageUrl: IMG('gp9fq2XxJ2c'),
    tags: ['면','국물','일본'], mealType: ['lunch','dinner'] },
  { id: 'j3', name: '돈카츠',   genre: ['일식'], emoji: '🍱',
    // Verified: "katsudon in a blue and white bowl"
    imageUrl: IMG('K4B6C8zoGxc'),
    tags: ['튀김','돼지고기','바삭'], mealType: ['lunch','dinner'] },
  { id: 'j4', name: '우동',     genre: ['일식'], emoji: '🍜',
    imageUrl: IMG('1578020190125-f4f7c18bc9cb'),
    tags: ['면','국물','담백'], mealType: ['lunch','dinner'] },
  { id: 'j5', name: '오야코동', genre: ['일식'], emoji: '🍱',
    imageUrl: IMG('1547592166-23ac45744acd'),
    tags: ['덮밥','닭고기','달걀'], mealType: ['lunch','dinner'] },
  { id: 'j6', name: '가라아게', genre: ['일식'], emoji: '🍗',
    // Verified: "delicious golden fried chicken piled on plate"
    imageUrl: IMG('xdcr4Z-KTcU'),
    tags: ['튀김','닭고기','바삭'], mealType: ['lunch','dinner'] },
  { id: 'j7', name: '텐동',     genre: ['일식'], emoji: '🍤',
    imageUrl: IMG('1615361200141-f45040f367be'),
    tags: ['튀김','덮밥','새우'], mealType: ['lunch','dinner'] },
  { id: 'j8', name: '소바',     genre: ['일식'], emoji: '🍝',
    // Verified: "soba noodle japanese food cuisine"
    imageUrl: IMG('2YHlXy5lwCc'),
    tags: ['면','메밀','건강'], mealType: ['lunch'] },

  // ── 양식 (8) ──────────────────────────────────────────────────
  { id: 'w1', name: '파스타',   genre: ['양식'], emoji: '🍝',
    // Verified: "plate of pasta with meat and vegetables"
    imageUrl: IMG('K4oM_d4bBPY'),
    tags: ['면','이탈리아','토마토'], mealType: ['lunch','dinner'] },
  { id: 'w2', name: '피자',     genre: ['양식'], emoji: '🍕',
    // Verified: "pizza with meat and cheese on a pan"
    imageUrl: IMG('CsEeUUPBDZY'),
    tags: ['이탈리아','치즈','토마토'], mealType: ['lunch','dinner'] },
  { id: 'w3', name: '스테이크', genre: ['양식'], emoji: '🥩',
    // Verified: "sliced grilled steak with vegetables and fruit"
    imageUrl: IMG('ksJz2H1NY0M'),
    tags: ['소고기','고급','구이'], mealType: ['dinner'] },
  { id: 'w4', name: '리조또',   genre: ['양식'], emoji: '🍚',
    imageUrl: IMG('1476124369491-e7addf5db371'),
    tags: ['쌀','이탈리아','크림'], mealType: ['lunch','dinner'] },
  { id: 'w5', name: '샐러드',   genre: ['양식'], emoji: '🥗',
    imageUrl: IMG('1512621776951-a57141f2eefd'),
    tags: ['건강','채소','신선'], mealType: ['lunch'] },
  { id: 'w6', name: '버거',     genre: ['양식'], emoji: '🍔',
    // Verified: "burger with cheese and bacon"
    imageUrl: IMG('XeCYNKEWC8Y'),
    tags: ['빵','고기','간편'], mealType: ['lunch','dinner'] },
  { id: 'w7', name: '그라탱',   genre: ['양식'], emoji: '🧀',
    imageUrl: IMG('1504674900247-0877df9cc836'),
    tags: ['치즈','오븐','크림'], mealType: ['dinner'] },
  { id: 'w8', name: '크림수프', genre: ['양식'], emoji: '🥣',
    imageUrl: IMG('1547592180-85f173990554'),
    tags: ['수프','크림','따뜻함'], mealType: ['lunch'] },

  // ── 분식 (6) ──────────────────────────────────────────────────
  { id: 'b1', name: '떡볶이', genre: ['분식'], emoji: '🌶️',
    // Verified: "Korean tteokbokki simmers in a spicy sauce"
    imageUrl: IMG('Uf2O1CnIpkY'),
    tags: ['매운맛','떡','간식'], mealType: ['lunch','dinner'] },
  { id: 'b2', name: '순대',   genre: ['분식'], emoji: '🌭',
    imageUrl: IMG('1529042410759-befb1204b468'),
    tags: ['분식','쫄깃','간식'], mealType: ['lunch','dinner'] },
  { id: 'b3', name: '라볶이', genre: ['분식'], emoji: '🍜',
    imageUrl: IMG('1455619452474-d2be8b1e70cd'),
    tags: ['라면','떡볶이','매운맛'], mealType: ['lunch'] },
  { id: 'b4', name: '김밥',   genre: ['분식'], emoji: '🍱',
    imageUrl: IMG('1557499305-0af888c3d8ec'),
    tags: ['김','밥','간편'], mealType: ['lunch'] },
  { id: 'b5', name: '어묵',   genre: ['분식'], emoji: '🍢',
    imageUrl: IMG('1547592180-85f173990554'),
    tags: ['꼬치','국물','간식'], mealType: ['lunch','dinner'] },
  { id: 'b6', name: '튀김',   genre: ['분식'], emoji: '🍤',
    imageUrl: IMG('1571091718767-18b5b1457add'),
    tags: ['튀김','바삭','간식'], mealType: ['lunch','dinner'] },

  // ── 패스트푸드 (6) ────────────────────────────────────────────
  { id: 'f1', name: '후라이드치킨', genre: ['패스트푸드'], emoji: '🍗',
    // Verified: "fried chicken on white ceramic plate"
    imageUrl: IMG('7V1PRah-NOc'),
    tags: ['치킨','바삭','야식'], mealType: ['lunch','dinner'] },
  { id: 'f2', name: '햄버거',     genre: ['패스트푸드'], emoji: '🍔',
    imageUrl: IMG('1568901346375-23c9450c58cd'),
    tags: ['패스트푸드','빵','고기'], mealType: ['lunch','dinner'] },
  { id: 'f3', name: '핫도그',     genre: ['패스트푸드'], emoji: '🌭',
    imageUrl: IMG('1612392166886-ee8475b03af2'),
    tags: ['빵','소시지','간편'], mealType: ['lunch'] },
  { id: 'f4', name: '피자',       genre: ['패스트푸드'], emoji: '🍕',
    imageUrl: IMG('1565299624946-b28f40a0ae38'),
    tags: ['치즈','배달','공유'], mealType: ['lunch','dinner'] },
  { id: 'f5', name: '타코',       genre: ['패스트푸드'], emoji: '🌮',
    imageUrl: IMG('1551504734-5ee1c4a1479b'),
    tags: ['멕시코','또띠아','채소'], mealType: ['lunch','dinner'] },
  { id: 'f6', name: '샌드위치',   genre: ['패스트푸드'], emoji: '🥪',
    // Verified: "close up of a sandwich on a cutting board"
    imageUrl: IMG('3jWGPRAypJU'),
    tags: ['빵','채소','간편'], mealType: ['lunch'] },

  // ── 아시안 (5) ────────────────────────────────────────────────
  { id: 'a1', name: '팟타이',   genre: ['아시안'], emoji: '🍜',
    // Verified: "stir fried Thai noodles with shrimps — pad thai top view"
    imageUrl: IMG('1pfzPhT-YrU'),
    tags: ['태국','면','볶음'], mealType: ['lunch','dinner'] },
  { id: 'a2', name: '쌀국수',   genre: ['아시안'], emoji: '🍝',
    imageUrl: IMG('1585032226651-759b368d7246'),
    tags: ['베트남','면','국물'], mealType: ['lunch','dinner'] },
  { id: 'a3', name: '카레',     genre: ['아시안'], emoji: '🍛',
    // Verified: "chicken curry in a white bowl with sauce"
    imageUrl: IMG('VtNLbOAeO68'),
    tags: ['인도','향신료','밥'], mealType: ['lunch','dinner'] },
  { id: 'a4', name: '반미',     genre: ['아시안'], emoji: '🥖',
    imageUrl: IMG('1559847844-5315695dadae'),
    tags: ['베트남','빵','새콤달콤'], mealType: ['lunch'] },
  { id: 'a5', name: '나시고렝', genre: ['아시안'], emoji: '🍚',
    imageUrl: IMG('1512058564366-18510be2db19'),
    tags: ['인도네시아','볶음밥','향신료'], mealType: ['lunch','dinner'] },
];

export const GENRE_CONFIG: Record<string, { emoji: string; color: string; gradient: string; from: string; to: string }> = {
  '한식': { emoji: '🍚', color: '#E63946', gradient: 'from-red-500 to-orange-400', from: '#EF4444', to: '#FB923C' },
  '중식': { emoji: '🥢', color: '#F4A261', gradient: 'from-yellow-500 to-red-400', from: '#EAB308', to: '#F87171' },
  '일식': { emoji: '🍣', color: '#E9C46A', gradient: 'from-pink-400 to-red-300', from: '#F472B6', to: '#FCA5A5' },
  '양식': { emoji: '🍝', color: '#457B9D', gradient: 'from-blue-500 to-indigo-400', from: '#3B82F6', to: '#818CF8' },
  '분식': { emoji: '🌶️', color: '#E76F51', gradient: 'from-orange-500 to-pink-400', from: '#F97316', to: '#F472B6' },
  '패스트푸드': { emoji: '🍔', color: '#2A9D8F', gradient: 'from-yellow-400 to-orange-400', from: '#FACC15', to: '#FB923C' },
  '아시안': { emoji: '🍜', color: '#264653', gradient: 'from-teal-500 to-green-400', from: '#14B8A6', to: '#4ADE80' },
};

export const FOOD_EMOJI_MAP: Record<string, string> = {
  '한식': '🍲', '중식': '🥢', '일식': '🍣', '양식': '🍝', '분식': '🌶️', '패스트푸드': '🍔', '아시안': '🍜',
};

# 🍽️ TodayMeal — 오늘 뭐 먹지?

음식 이미지 기반 **1:1 토너먼트 방식**으로 메뉴 결정 피로를 해소하는 PWA 앱.

## 기술 스택

- **Next.js 14** (App Router + API Routes)
- **Tailwind CSS** — 모바일 최적화 UI
- **Firebase Firestore** — 음식 데이터 (선택 사항, 없으면 내장 데이터 사용)
- **next-pwa** — 홈 화면 설치 (PWA)
- **Kakao Local API** — 주변 식당 조회 (선택 사항)
- **localStorage** — 히스토리 저장

## 화면 구성

| 페이지 | 경로 | 설명 |
|---|---|---|
| 홈 | `/` | 시간 자동 감지, 점심/저녁 선택, 시작 |
| 장르 선택 | `/genre` | 한식/중식/일식/양식/분식/패스트푸드/아시안 토글 |
| 월드컵 대결 | `/battle` | 풀스크린 1:1 음식 대결, 진행률 표시 |
| 결과 | `/result` | 최종 음식 확정, 주변 식당 조회 |
| 히스토리 | `/history` | 날짜별 과거 선택 기록 |

## 로컬 개발

```bash
# 설치
npm install

# 개발 서버 실행
npm run dev
```

→ [http://localhost:3000](http://localhost:3000) 에서 확인

## 환경 변수 설정 (선택 사항)

`.env.local.example`을 복사해서 `.env.local`을 만들고 값을 채워주세요:

```bash
cp .env.local.example .env.local
```

**Firebase** (Firestore에서 음식 데이터 로드 시 필요):
- Firebase Console → 프로젝트 설정 → 앱 추가 → 웹 앱

**Kakao API** (주변 식당 조회 시 필요):
- [Kakao Developers](https://developers.kakao.com) → 앱 만들기 → REST API 키

> 환경 변수 없이도 앱은 내장 56개 메뉴 데이터로 완전히 동작합니다.

## Firestore 데이터 시딩

```bash
# dotenv 설치 (시딩 스크립트용)
npm install -D dotenv ts-node

# 시딩 실행 (Firebase 설정 필요)
npm run seed
```

## Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

또는 GitHub 연동 → Vercel 대시보드에서 Import → 환경 변수 설정.

## 음식 데이터 구조

```typescript
interface Food {
  id: string;
  name: string;          // 예: "김치찌개"
  genre: string[];       // 예: ["한식"]
  imageUrl: string;      // Unsplash/Firebase Storage URL
  tags: string[];        // 예: ["국물", "매운맛"]
  mealType: string[];    // ["lunch"] | ["dinner"] | ["lunch","dinner"]
  emoji: string;         // 이미지 로드 실패 시 표시
}
```

## 개발 마일스톤

- ✅ **M1** — Next.js 14 + Firebase + PWA 초기 설정, 56개 음식 데이터
- ✅ **M2** — 장르 선택 → 월드컵 대결 → 결과 화면
- ✅ **M3** — 시간 자동 감지, 히스토리, 카카오맵 연동
- ✅ **M4** — UI 마무리, PWA 설치, Vercel 배포 준비

/**
 * Firebase Firestore Seeding Script
 * Run: npx ts-node scripts/seed.ts
 *
 * Requires environment variables in .env.local:
 *   NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID, etc.
 *
 * Or use Firebase Admin SDK with a service account key for server-side seeding.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import { FALLBACK_FOODS } from '../lib/foodData';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function seed() {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('❌ Firebase config missing. Create .env.local from .env.local.example');
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const foodsCol = collection(db, 'foods');

  console.log(`🌱 Seeding ${FALLBACK_FOODS.length} food items...`);

  for (const food of FALLBACK_FOODS) {
    await setDoc(doc(foodsCol, food.id), food);
    console.log(`  ✅ ${food.name}`);
  }

  console.log('✨ Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});

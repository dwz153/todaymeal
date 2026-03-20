'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Food } from '@/types';
import { GENRE_CONFIG } from '@/lib/foodData';

interface FoodCardProps {
  food: Food;
  onClick?: () => void;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FoodCard({
  food,
  onClick,
  selected = false,
  size = 'md',
  className = '',
}: FoodCardProps) {
  const [imgError, setImgError] = useState(false);
  const genre = food.genre[0] || '한식';
  const config = GENRE_CONFIG[genre] || GENRE_CONFIG['한식'];

  const sizeClasses = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
  };

  const gradientStyle = { background: `linear-gradient(135deg, ${config.from}, ${config.to})` };

  return (
    <button
      onClick={onClick}
      className={`relative w-full rounded-2xl overflow-hidden shadow-md transition-all duration-200 active:scale-95 ${
        selected ? 'ring-4 ring-orange-400 scale-[1.02]' : ''
      } ${className}`}
    >
      <div className={`relative w-full ${sizeClasses[size]}`} style={gradientStyle}>
        {!imgError && food.imageUrl ? (
          <Image
            src={food.imageUrl}
            alt={food.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={gradientStyle}>
            <span className="text-6xl drop-shadow-lg">{food.emoji}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-bold text-lg leading-tight drop-shadow">{food.name}</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {food.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-white/80 bg-white/20 rounded-full px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

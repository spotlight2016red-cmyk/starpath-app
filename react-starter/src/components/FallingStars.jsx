import React, { useEffect, useState } from 'react';

export default function FallingStars({ trigger }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    // 星を12個生成
    const newStars = Array.from({ length: 12 }, (_, i) => ({
      id: `star-${Date.now()}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 1.5 + Math.random() * 0.5
    }));

    setStars(newStars);

    // アニメーション終了後にクリア
    const timer = setTimeout(() => {
      setStars([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (stars.length === 0) return null;

  return (
    <div className="falling-stars">
      {stars.map(star => (
        <div
          key={star.id}
          className="falling-star"
          style={{
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
}



import React from 'react';

// 星座画像のパス（5つのタイプ対応）
const ConstellationImages = {
  explorer: '/images/sagittarius-constellation.png',  // 探検者（射手座）
  guide: '/images/leo-constellation.png',             // 導き手（獅子座）
  healer: '/images/pisces-constellation.png',         // 癒し手（魚座）
  reformer: '/images/aquarius-constellation.png',     // 変革者（水瓶座）
  harmonizer: '/images/libra-constellation.png'       // 調和者（天秤座）
};

// 進化後の星座画像（仮：現在は同じ画像を使用、後で差し替え）
const EvolvedImages = {
  explorer: '/images/sagittarius-constellation.png',  // 仮画像
  guide: '/images/leo-constellation.png',
  healer: '/images/pisces-constellation.png',
  reformer: '/images/aquarius-constellation.png',
  harmonizer: '/images/libra-constellation.png'
};

export default function ConstellationImage({ typeId, progress }) {
  const normalImage = ConstellationImages[typeId];
  const evolvedImage = EvolvedImages[typeId];
  
  if (!normalImage) return null;
  
  // 4人目：蛹状態（光の玉がぐるぐる回る）
  if (progress === 4) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '2px',
          left: 0,
          width: '100%',
          height: 'calc(100% - 70px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        {/* 中心の光の玉 */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(143, 211, 255, 0.4) 50%, transparent 100%)',
          boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
        
        {/* 回転する光の粒子 */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 1) 0%, rgba(255, 215, 0, 0) 70%)',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
              animation: `orbit 3s linear infinite`,
              animationDelay: `${i * 0.5}s`,
              transformOrigin: '50% 50%'
            }}
          />
        ))}
        
        {/* 進化の説明を上下に分けて配置 */}
        {/* 上側のテキスト */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: '85%',
          padding: '0.4rem 0.5rem',
          background: 'rgba(0, 0, 0, 0.75)',
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid rgba(255, 215, 0, 0.5)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          <p style={{ 
            fontSize: '0.8rem', 
            margin: 0,
            color: 'var(--accent)',
            lineHeight: '1.3',
            fontWeight: '600'
          }}>
            光が内側に集まり、<br />
            繭に包まれています。
          </p>
        </div>

        {/* 下側のテキスト */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: '85%',
          padding: '0.4rem 0.5rem',
          background: 'rgba(0, 0, 0, 0.75)',
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid rgba(255, 215, 0, 0.5)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          <p style={{ 
            fontSize: '0.8rem', 
            margin: 0,
            color: 'var(--accent)',
            lineHeight: '1.3',
            fontWeight: '600'
          }}>
            もう1人の声を集めると、<br />
            まったく新しい姿へと進化します...！
          </p>
        </div>
        
        <style>{`
          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(80px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(80px) rotate(-360deg);
            }
          }
        `}</style>
      </div>
    );
  }
  
  // 5人以上：進化後の画像
  const imagePath = progress >= 5 ? evolvedImage : normalImage;
  
  // 進捗に応じた透明度とスケール
  const getProgressStyle = (progress) => {
    switch (progress) {
      case 0:
        return { opacity: 0.2, transform: 'scale(0.85)', filter: 'blur(1.5px)' };
      case 1:
        return { opacity: 0.5, transform: 'scale(0.92)', filter: 'blur(0.8px)' };
      case 2:
        return { opacity: 0.75, transform: 'scale(0.97)', filter: 'blur(0.3px)' };
      case 3:
        return { opacity: 1.0, transform: 'scale(1.0)', filter: 'none' };
      case 5:
        return { opacity: 1.0, transform: 'scale(1.05)', filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' };
      default:
        return progress >= 5 
          ? { opacity: 1.0, transform: 'scale(1.05)', filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' }
          : { opacity: 0.2, transform: 'scale(0.85)', filter: 'blur(1.5px)' };
    }
  };
  
  const progressStyle = getProgressStyle(progress);
  
  return (
    <div
      style={{
        position: 'absolute',
        top: '2px',
        left: 0,
        width: '100%',
        height: 'calc(100% - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
    >
      <img
        src={imagePath}
        alt={`${typeId} constellation`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: progressStyle.opacity,
          transform: progressStyle.transform,
          filter: progressStyle.filter,
          transition: 'all 1.2s ease-out'
        }}
      />
    </div>
  );
}

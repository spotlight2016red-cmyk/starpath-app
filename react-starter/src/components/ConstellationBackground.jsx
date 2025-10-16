import React from 'react';

// 星座のシンボルマーク（占星術記号風）
const SymbolImages = {
  explorer: (opacity) => (
    // 射手座：♐
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        opacity: opacity * 0.2,
        transition: 'opacity 1s ease-out',
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
      }}
    >
      <g stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 矢印（斜め上） */}
        <line x1="25" y1="75" x2="75" y2="25" />
        {/* 矢じり */}
        <polyline points="65,25 75,25 75,35" />
        {/* 十字の横線 */}
        <line x1="30" y1="60" x2="50" y2="40" />
      </g>
    </svg>
  ),
  
  guide: (opacity) => (
    // 獅子座：♌
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        opacity: opacity * 0.2,
        transition: 'opacity 1s ease-out',
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
      }}
    >
      <g stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 獅子のたてがみとしっぽ */}
        <circle cx="35" cy="40" r="18" />
        <path d="M 53 40 Q 65 35 70 50 Q 72 70 60 75 Q 50 78 45 70" />
        <path d="M 60 75 Q 75 85 70 95" />
        <circle cx="68" cy="95" r="8" />
      </g>
    </svg>
  ),
  
  healer: (opacity) => (
    // 魚座：♓
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        opacity: opacity * 0.2,
        transition: 'opacity 1s ease-out',
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
      }}
    >
      <g stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 上の魚 */}
        <path d="M 20 30 Q 30 25 40 30 Q 35 35 30 35 Q 25 35 20 30" />
        {/* 下の魚 */}
        <path d="M 80 70 Q 70 75 60 70 Q 65 65 70 65 Q 75 65 80 70" />
        {/* つなぐ線 */}
        <line x1="30" y1="35" x2="70" y2="65" />
      </g>
    </svg>
  ),
  
  reformer: (opacity) => (
    // 水瓶座：♒
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        opacity: opacity * 0.2,
        transition: 'opacity 1s ease-out',
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
      }}
    >
      <g stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 波線（上） */}
        <path d="M 20 35 Q 30 30 40 35 Q 50 40 60 35 Q 70 30 80 35" />
        {/* 波線（下） */}
        <path d="M 20 55 Q 30 50 40 55 Q 50 60 60 55 Q 70 50 80 55" />
      </g>
    </svg>
  )
};

// 星座の形（シンプルな星図スタイル）
const ConstellationShapes = {
  explorer: (opacity) => (
    // 射手座：シンプルな星図（ティーポット型）
    <svg
      width="70%"
      height="70%"
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: opacity * 0.25,
        transition: 'opacity 1s ease-out'
      }}
    >
      <g>
        {/* 星（ドット） */}
        <circle cx="50" cy="120" r="4" fill="white" opacity="0.8" />
        <circle cx="80" cy="100" r="5" fill="white" />
        <circle cx="110" cy="90" r="4" fill="white" opacity="0.8" />
        <circle cx="130" cy="110" r="4" fill="white" opacity="0.8" />
        <circle cx="140" cy="80" r="5" fill="white" />
        <circle cx="90" cy="140" r="4" fill="white" opacity="0.8" />
        {/* 線でつなぐ */}
        <g stroke="white" strokeWidth="1.5" fill="none" opacity="0.6">
          <polyline points="50,120 80,100 110,90 140,80" />
          <polyline points="110,90 130,110" />
          <line x1="80" y1="100" x2="90" y2="140" />
        </g>
      </g>
    </svg>
  ),
  
  guide: (opacity) => (
    // 獅子座：正面の獅子の頭部 + 12星座
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: opacity * 0.4,
        transition: 'opacity 1s ease-out'
      }}
    >
      <g>
        {/* 中心：獅子の頭部（正面） */}
        <g transform="translate(200, 200)">
          <g stroke="rgba(143, 211, 255, 0.6)" strokeWidth="2" fill="none">
            {/* たてがみ */}
            <path d="M-20,-15 Q-30,-30 -15,-40 Q0,-45 15,-40 Q30,-30 20,-15" />
            <path d="M-20,-10 Q-35,-25 -25,-35" />
            <path d="M20,-10 Q35,-25 25,-35" />
            {/* 顔の輪郭 */}
            <ellipse cx="0" cy="0" rx="18" ry="22" />
            {/* 目 */}
            <circle cx="-6" cy="-8" r="3" fill="rgba(255, 255, 255, 0.8)" />
            <circle cx="6" cy="-8" r="3" fill="rgba(255, 255, 255, 0.8)" />
            {/* 鼻 */}
            <path d="M-3,8 Q0,12 3,8" />
          </g>
          {/* LEO文字 */}
          <text x="0" y="50" textAnchor="middle" fill="rgba(143, 211, 255, 0.8)" fontSize="20" fontFamily="serif" fontWeight="bold">
            LEO
          </text>
        </g>
        
        {/* 12星座の円形配置 */}
        <g stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" fill="none" opacity="0.6">
          {/* 牡羊座 */}
          <g transform="translate(200, 80)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M-4,-3 L4,3 M4,-3 L-4,3" />
          </g>
          {/* 牡牛座 */}
          <g transform="translate(320, 120)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <circle cx="-3" cy="-3" r="1.5" fill="white" />
            <circle cx="3" cy="-3" r="1.5" fill="white" />
          </g>
          {/* 双子座 */}
          <g transform="translate(350, 200)">
            <circle cx="-2" cy="0" r="2" fill="white" />
            <circle cx="2" cy="0" r="2" fill="white" />
            <line x1="-2" y1="0" x2="2" y2="0" />
          </g>
          {/* 蟹座 */}
          <g transform="translate(320, 280)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M-3,-2 Q0,-4 3,-2 M-3,2 Q0,4 3,2" />
          </g>
          {/* 獅子座 */}
          <g transform="translate(200, 320)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M-3,-3 L3,3 M3,-3 L-3,3" />
          </g>
          {/* 乙女座 */}
          <g transform="translate(120, 320)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M-3,-3 L3,3 M3,-3 L-3,3" />
          </g>
          {/* 天秤座 */}
          <g transform="translate(80, 280)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M-4,0 L4,0 M0,-4 L0,4" />
          </g>
          {/* 蠍座 */}
          <g transform="translate(50, 200)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M0,-3 L3,0 L0,3 L-3,0 Z" />
          </g>
          {/* 射手座 */}
          <g transform="translate(80, 120)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M0,0 L5,-5 L3,-3" />
          </g>
          {/* 山羊座 */}
          <g transform="translate(120, 80)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M-3,-3 L3,3 M3,-3 L-3,3" />
          </g>
          {/* 水瓶座 */}
          <g transform="translate(200, 80)">
            <circle cx="0" cy="0" r="2" fill="white" />
            <path d="M0,-3 L0,3 M-2,0 L2,0" />
          </g>
          {/* 魚座 */}
          <g transform="translate(200, 80)">
            <circle cx="-2" cy="0" r="1.5" fill="white" />
            <circle cx="2" cy="0" r="1.5" fill="white" />
            <path d="M-2,0 Q0,-2 2,0" />
          </g>
        </g>
      </g>
    </svg>
  ),
  
  healer: (opacity) => (
    // 魚座：シンプルな星図（2匹の魚）
    <svg
      width="70%"
      height="70%"
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: opacity * 0.25,
        transition: 'opacity 1s ease-out'
      }}
    >
      <g>
        {/* 星（ドット） */}
        <circle cx="50" cy="80" r="5" fill="white" />
        <circle cx="70" cy="90" r="4" fill="white" opacity="0.8" />
        <circle cx="100" cy="100" r="4" fill="white" opacity="0.8" />
        <circle cx="130" cy="110" r="4" fill="white" opacity="0.8" />
        <circle cx="150" cy="120" r="5" fill="white" />
        <circle cx="40" cy="100" r="4" fill="white" opacity="0.8" />
        <circle cx="160" cy="100" r="4" fill="white" opacity="0.8" />
        {/* 線でつなぐ */}
        <g stroke="white" strokeWidth="1.5" fill="none" opacity="0.6">
          <polyline points="40,100 50,80 70,90 100,100 130,110 150,120 160,100" />
        </g>
      </g>
    </svg>
  ),
  
  reformer: (opacity) => (
    // 水瓶座：シンプルな星図（水を注ぐ形）
    <svg
      width="70%"
      height="70%"
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: opacity * 0.25,
        transition: 'opacity 1s ease-out'
      }}
    >
      <g>
        {/* 星（ドット） */}
        <circle cx="80" cy="60" r="4" fill="white" opacity="0.8" />
        <circle cx="100" cy="70" r="5" fill="white" />
        <circle cx="120" cy="60" r="4" fill="white" opacity="0.8" />
        <circle cx="90" cy="100" r="4" fill="white" opacity="0.8" />
        <circle cx="110" cy="100" r="4" fill="white" opacity="0.8" />
        <circle cx="100" cy="130" r="5" fill="white" />
        {/* 線でつなぐ */}
        <g stroke="white" strokeWidth="1.5" fill="none" opacity="0.6">
          <polyline points="80,60 100,70 120,60" />
          <line x1="100" y1="70" x2="90" y2="100" />
          <line x1="100" y1="70" x2="110" y2="100" />
          <polyline points="90,100 100,130 110,100" />
        </g>
      </g>
    </svg>
  )
};

export default function ConstellationBackground({ typeId, progress }) {
  const renderSymbol = SymbolImages[typeId];
  const renderShape = ConstellationShapes[typeId];
  
  if (!renderSymbol || !renderShape) return null;
  
  // 進捗に応じた明るさ（0→0.5→0.8→1.0）
  const opacityLevels = [0.3, 0.5, 0.8, 1.0];
  const currentOpacity = opacityLevels[progress] || 0.3;
  
  return (
    <>
      {/* 星座のシンボルマーク（右上） */}
      {renderSymbol(currentOpacity)}
      
      {/* 星座のシルエット背景（獅子の形など） */}
      {renderShape(currentOpacity)}
    </>
  );
}


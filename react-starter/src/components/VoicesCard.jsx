import React, { useState } from 'react';

export default function VoicesCard({ feedbacks, currentType }) {
  const [isPublic, setIsPublic] = useState(false);

  const displayVoices = feedbacks && feedbacks.length > 0 
    ? feedbacks.map(fb => `💬 ${fb.q2}`)
    : [
        '💬 優しさと人への気配りが光っています。',
        '💬 行動力があって、次のステージで必ず役立つと思う。',
        '💬 新しいアイデアを生み出す力が輝いている。'
      ];

  return (
    <div>
      <h2>🌟 あなたの光を映す声</h2>
      <p className="sub">
        3人の言葉が線でつながり、あなたの小さな星座になりました。
      </p>

      {/* 星座のビジュアル表現 */}
      <div 
        className="sky" 
        style={{ 
          height: '200px', 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ 
          color: 'var(--accent)', 
          fontSize: '48px',
          textAlign: 'center' 
        }}>
          {currentType?.zodiac || '星座'}
          <div style={{ fontSize: '14px', marginTop: '8px', color: 'var(--muted)' }}>
            {currentType?.title}
          </div>
        </div>
      </div>

      <ul className="voices-list">
        {displayVoices.map((voice, index) => (
          <li key={index}>{voice}</li>
        ))}
      </ul>

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <label style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          cursor: 'pointer',
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(143, 211, 255, 0.1)',
          border: '1px solid var(--line)'
        }}>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          この星座と声を匿名で公開する
        </label>
        
        {isPublic && (
          <div className="msg" style={{ marginTop: '12px', textAlign: 'left' }}>
            ✨ 公開設定が有効になりました。他の旅人があなたの星座を見ることができます。
          </div>
        )}
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import FallingStars from './FallingStars';
import ConstellationImage from './ConstellationImage';
import { playChimeSound, initAudio } from '../utils/audio';

export default function ConstellationProgress({ 
  progress, 
  currentType,
  feedbacks = [],
  isPublic,
  onPublicChange
}) {
  const [showFallingStars, setShowFallingStars] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // 3人揃った時の演出
  useEffect(() => {
    if (progress === 3) {
      initAudio();
      setShowFallingStars(true);
      setTimeout(() => setShowFallingStars(false), 3000);
      setTimeout(() => playChimeSound(), 100);
    }
  }, [progress]);

  return (
    <div>
      <h2>🌟 あなたを表すシンボル</h2>
      <p className="sub">
        3人の感想が集まると、星座が完全に輝きあなたのシンボルが浮かび上がります。
      </p>

      <div className="sky">
        {/* 0人の場合の説明文 */}
        {progress === 0 && (
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              fontSize: '32px',
              fontWeight: '700',
              textAlign: 'center',
              opacity: 0.6,
              pointerEvents: 'none',
              width: '95%',
              lineHeight: '1.7',
              letterSpacing: '0.05em'
            }}
          >
            ここに<br />
            あなたの<br />
            シンボルが<br />
            浮かび<br />
            上がります
          </div>
        )}
        
        {/* 星座画像を表示 */}
        {currentType && <ConstellationImage typeId={currentType.id} progress={progress} />}
        <FallingStars trigger={showFallingStars} />
        
        {/* 星座名を表示（下側のスペースの中央） */}
        {currentType && (
          <div 
            style={{
              position: 'absolute',
              top: 'calc(100% - 70px)',
              bottom: '0',
              left: '0',
              right: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'translateY(-13px)',
              color: 'var(--accent)',
              fontSize: '14px',
              fontWeight: '700',
              textAlign: 'center',
              opacity: progress > 0 ? 0.9 : 0.4,
              transition: 'opacity 0.8s ease-out',
              textShadow: '0 0 8px rgba(143, 211, 255, 0.5)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <div style={{ lineHeight: '1.2' }}>
              メイン：{currentType.zodiac}
              {progress >= 3 && (
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: '400', 
                  marginLeft: '6px',
                  color: 'var(--muted)'
                }}>
                  {currentType.title}
                </span>
              )}
            </div>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: '400', 
              marginTop: '4px',
              lineHeight: '1.2'
            }}>
              補完　：{progress >= 3 && currentType.complementary ? 
                currentType.complementary.join('・') : 
                '？？？'
              }
            </div>
          </div>
        )}
      </div>

      {/* 進捗メッセージ */}
      <div className="msg" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        {progress === 0 && '星座がうっすらと見えています。感想を集めて輝かせましょう。'}
        {progress === 1 && '🌟 1人目の光を受け取りました。星座がほのかに輝き始めました。'}
        {progress === 2 && '🌟🌟 2人目の光が加わり、星座がさらに明るく輝いています。'}
        {progress === 3 && '🌟🌟🌟 3人目の光で、星座が完全に輝きました！'}
      </div>

      {/* 3人の言葉を表示 */}
      {feedbacks.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
            💬 3人の言葉
          </h3>
          <div style={{ 
            background: 'rgba(143, 211, 255, 0.03)', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            border: '1px solid var(--line)'
          }}>
            {feedbacks.map((fb, index) => (
              <div key={index} style={{ 
                marginBottom: index < feedbacks.length - 1 ? '1rem' : '0', 
                padding: '0.8rem', 
                background: 'rgba(143, 211, 255, 0.05)', 
                borderRadius: '8px' 
              }}>
                <strong style={{ color: 'var(--accent)' }}>{index + 1}人目：</strong> {fb.q2}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 詳細情報ボタン（3人揃った時） */}
      {progress >= 3 && currentType && (
        <div style={{ marginTop: '1.5rem' }}>
          <button 
            className="btn" 
            onClick={() => setShowDetails(!showDetails)}
            style={{ width: '100%', marginBottom: showDetails ? '1rem' : '0' }}
          >
            {showDetails ? '▲ 詳細を閉じる' : '▼ 星座の役割と補完星座を見る'}
          </button>

          {showDetails && (
            <div style={{
              padding: '1.5rem',
              background: 'rgba(143, 211, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid var(--line)'
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent)' }}>
                ✨ {currentType.zodiac}（{currentType.title}）の役割
              </h3>
              <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {currentType.longMessage}
              </p>

              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent)' }}>
                🌙 補完星座：{currentType.complementary.join('・')}
              </h3>
              <p style={{ lineHeight: '1.7', marginBottom: '0' }}>
                {currentType.step2Message}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 公開設定 */}
      {progress >= 3 && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
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
              onChange={(e) => onPublicChange && onPublicChange(e.target.checked)}
            />
            この星座と声を匿名で公開する
          </label>
          
          {isPublic && (
            <div className="msg" style={{ marginTop: '12px', textAlign: 'left' }}>
              ✨ 公開設定が有効になりました。他の旅人があなたの星座を見ることができます。
            </div>
          )}
        </div>
      )}
    </div>
  );
}


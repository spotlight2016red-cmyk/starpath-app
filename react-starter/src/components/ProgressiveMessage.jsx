import React, { useState } from 'react';

/**
 * 進捗に応じて3ステップのメッセージを表示するコンポーネント
 * 
 * progress 0: ステップ1（基本の輝き）のみ
 * progress 1-2: ステップ1 + ステップ2（補完星座）
 * progress 3: ステップ1 + ステップ2 + ステップ3（極み）
 */
export default function ProgressiveMessage({ type, progress }) {
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (value) => {
    setFeedback(value);
    
    // フィードバックデータをログ出力（将来的にはAPIに送信）
    const feedbackData = {
      timestamp: new Date().toISOString(),
      typeId: type.id,
      typeName: type.name,
      feedback: value,
      progress: progress
    };
    
    console.log('📊 診断フィードバック:', feedbackData);
    
    // localStorage に保存（簡易的なデータ蓄積）
    const existingFeedbacks = JSON.parse(localStorage.getItem('starpath_feedbacks') || '[]');
    existingFeedbacks.push(feedbackData);
    localStorage.setItem('starpath_feedbacks', JSON.stringify(existingFeedbacks));
  };

  return (
    <div className="progressive-message">
      {/* ステップ1：基本の輝き（常に表示） */}
      <div className="step step-1">
        <h3>🌟 あなたの輝き</h3>
        <p className="sub">メイン星座：{type.zodiac}</p>
        <p>{type.longMessage}</p>
      </div>

      {/* ステップ2：補完星座を活かす（進捗1以上で表示） */}
      {progress >= 1 && (
        <div className="step step-2" style={{ 
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(143, 211, 255, 0.2)'
        }}>
          <h3>✨ 補完星座の力</h3>
          <p className="sub">補完星座：{type.complementary.join('・')}</p>
          <p>{type.step2Message}</p>
        </div>
      )}

      {/* ステップ3：極み（進捗3で表示） */}
      {progress === 3 && (
        <div className="step step-3" style={{ 
          marginTop: '2rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.1), rgba(255, 215, 143, 0.1))',
          borderRadius: '12px',
          border: '2px solid rgba(143, 211, 255, 0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🌌 {type.step3Title}</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{type.step3Message}</p>
        </div>
      )}

      {/* フィードバック機能 */}
      <div style={{ 
        marginTop: '3rem',
        padding: '2rem',
        background: 'rgba(143, 211, 255, 0.03)',
        borderRadius: '12px',
        border: '1px solid var(--line)',
        textAlign: 'center'
      }}>
        <p className="sub" style={{ marginBottom: '1rem' }}>
          この診断結果はしっくりきましたか？
        </p>
        
        {feedback === null ? (
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              className="btn"
              onClick={() => handleFeedback('good')}
              style={{ minWidth: '120px' }}
            >
              👍 ぴったり
            </button>
            <button 
              className="btn"
              onClick={() => handleFeedback('ok')}
              style={{ minWidth: '120px' }}
            >
              😐 まあまあ
            </button>
            <button 
              className="btn"
              onClick={() => handleFeedback('bad')}
              style={{ minWidth: '120px' }}
            >
              👎 違う気がする
            </button>
          </div>
        ) : (
          <div style={{ color: 'var(--accent)' }}>
            ✨ フィードバックありがとうございます！
            {feedback === 'bad' && (
              <p className="sub" style={{ marginTop: '0.5rem' }}>
                あなたの声を参考に、診断をより良くしていきます。
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


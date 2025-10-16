import React, { useState } from 'react';

export default function FeedbackForm({ onSubmit, personNumber }) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3Selected, setQ3Selected] = useState('');
  const [q3Other, setQ3Other] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!q1 || !q2 || !q3Selected) {
      alert('すべての質問に回答してください');
      return;
    }

    const feedback = {
      q1,
      q2,
      q3: q3Selected === 'other' ? q3Other : q3Selected,
      personNumber
    };

    onSubmit(feedback);
    
    // フォームをリセット
    setQ1('');
    setQ2('');
    setQ3Selected('');
    setQ3Other('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--accent)' }}>
          Q1. この診断結果を見て、どう感じましたか？
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="q1"
              value="らしい"
              checked={q1 === 'らしい'}
              onChange={(e) => setQ1(e.target.value)}
            />
            👍 すごくその人らしい
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="q1"
              value="半分"
              checked={q1 === '半分'}
              onChange={(e) => setQ1(e.target.value)}
            />
            🤔 半分くらい当たってる
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="q1"
              value="意外"
              checked={q1 === '意外'}
              onChange={(e) => setQ1(e.target.value)}
            />
            ❓ 意外！新しい発見
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--accent)' }}>
          Q2. この人の強みや魅力はどんなところだと思いますか？
        </h3>
        <textarea
          value={q2}
          onChange={(e) => setQ2(e.target.value)}
          placeholder="自由に記述してください"
          rows={3}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid var(--line)',
            background: '#0f1a3a',
            color: 'var(--text)',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--accent)' }}>
          Q3. この人が次のステージで発揮できそうなものは？
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="q3"
              value="アイデア"
              checked={q3Selected === 'アイデア'}
              onChange={(e) => setQ3Selected(e.target.value)}
            />
            💡 アイデアや発想力
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="q3"
              value="優しさ"
              checked={q3Selected === '優しさ'}
              onChange={(e) => setQ3Selected(e.target.value)}
            />
            🌿 優しさや人との関わり
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="q3"
              value="行動力"
              checked={q3Selected === '行動力'}
              onChange={(e) => setQ3Selected(e.target.value)}
            />
            🚀 行動力や挑戦心
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="q3"
              value="other"
              checked={q3Selected === 'other'}
              onChange={(e) => setQ3Selected(e.target.value)}
            />
            ⭐ その他
          </label>
          {q3Selected === 'other' && (
            <input
              type="text"
              value={q3Other}
              onChange={(e) => setQ3Other(e.target.value)}
              placeholder="具体的に記述してください"
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                background: '#0f1a3a',
                color: 'var(--text)',
                fontSize: '14px',
                marginLeft: '28px'
              }}
            />
          )}
        </div>
      </div>

      <button type="submit" className="btn" style={{ width: '100%' }}>
        {personNumber}人目の感想を送信
      </button>
    </form>
  );
}



import React, { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm';
import { getShare, addFeedback } from '../firebase/shareService';

export default function SharedFeedbackPage({ shareId }) {
  const [submitted, setSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [shareData, setShareData] = useState(null);
  const [loading, setLoading] = useState(true);

  // シェアデータを取得
  useEffect(() => {
    const fetchShareData = async () => {
      try {
        const data = await getShare(shareId);
        setShareData(data);
        setLoading(false);
      } catch (error) {
        console.error('データ取得エラー:', error);
        setLoading(false);
      }
    };

    if (shareId) {
      fetchShareData();
    }
  }, [shareId]);

  const handleSubmit = async (feedback) => {
    try {
      await addFeedback(shareId, feedback.q2);
      setFeedbackText(feedback.q2);
      setSubmitted(true);
    } catch (error) {
      console.error('感想送信エラー:', error);
      alert('エラーが発生しました。もう一度お試しください。');
    }
  };

  // テスト用ダミー感想送信
  const sendTestFeedback = async () => {
    const testFeedbacks = [
      "とても興味深い診断結果ですね！私も同じような傾向がある気がします。",
      "新しい視点を教えてもらいました。参考になります！",
      "診断結果を見て、自分自身について考え直すきっかけになりました。",
      "とても詳しく分析されていて、納得できる内容でした。",
      "この診断結果を活かして、今後の行動に取り入れたいと思います。"
    ];
    
    const randomFeedback = testFeedbacks[Math.floor(Math.random() * testFeedbacks.length)];
    
    try {
      await addFeedback(shareId, randomFeedback);
      setFeedbackText(randomFeedback);
      setSubmitted(true);
    } catch (error) {
      console.error('テスト感想送信エラー:', error);
      alert('エラーが発生しました。もう一度お試しください。');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h1>🌟 読み込み中...</h1>
          <p className="sub">診断結果を取得しています</p>
        </div>
      </div>
    );
  }

  if (!shareData) {
    return (
      <div className="container">
        <div className="card">
          <h1>❌ エラー</h1>
          <p className="sub">診断結果が見つかりませんでした</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>🌟 {shareData.name}さんの診断結果</h1>
        <p className="sub" style={{ marginBottom: '2rem' }}>
          診断結果を見て、感想を伝えてください
        </p>

        {/* 診断結果の表示 */}
        <div style={{
          padding: '1.5rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '12px',
          border: '2px solid var(--accent)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            ✨ {shareData.title}
          </h2>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent)' }}>
            {shareData.zodiac}
          </p>
          <p style={{ lineHeight: '1.7', textAlign: 'center' }}>
            {shareData.longMessage.replace(/あなた/g, `${shareData.name}さん`)}
          </p>
        </div>

        {!submitted ? (
          <>
            <h3 style={{ marginBottom: '1rem' }}>💬 あなたの感想をお聞かせください</h3>
            <FeedbackForm 
              onSubmit={handleSubmit}
              personNumber={1}
            />
            
            {/* 開発用テストボタン */}
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'rgba(255, 193, 7, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 193, 7, 0.3)',
              textAlign: 'center'
            }}>
              <p className="sub" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                🧪 開発用テスト機能
              </p>
              <button 
                className="btn"
                onClick={sendTestFeedback}
                style={{ 
                  fontSize: '0.9rem', 
                  padding: '0.6rem 1.2rem',
                  background: 'rgba(255, 193, 7, 0.8)',
                  color: '#333'
                }}
              >
                ⚡ テスト感想を送信
              </button>
            </div>
          </>
        ) : (
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.1), rgba(100, 180, 255, 0.1))',
            borderRadius: '12px',
            border: '2px solid var(--accent)',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>✨ 感想を送信しました！</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
              あなたの感想：
            </p>
            <div style={{
              padding: '1rem',
              background: 'rgba(143, 211, 255, 0.05)',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              💬 {feedbackText}
            </div>
            <p style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent)', fontWeight: '600' }}>
              {shareData.name}さんの画面に自動で届きました！🎉
            </p>
            <p className="sub" style={{ fontSize: '0.9rem' }}>
              コピーや送信は不要です。<br />
              {shareData.name}さんの星座が輝きます✨
            </p>
          </div>
        )}

        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: 'rgba(143, 211, 255, 0.03)',
          borderRadius: '8px',
          border: '1px solid var(--line)',
          textAlign: 'center'
        }}>
          <p className="sub" style={{ fontSize: '0.85rem', margin: 0 }}>
            あなたも診断してみませんか？
          </p>
          <button 
            className="btn"
            onClick={() => window.location.href = '/'}
            style={{ marginTop: '0.5rem', fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
          >
            診断を受ける
          </button>
        </div>
      </div>
    </div>
  );
}


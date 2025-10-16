import React, { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm';
import ConstellationImage from './ConstellationImage';
import FallingStars from './FallingStars';
import { generateShareId, createShare, subscribeToFeedbacks } from '../firebase/shareService';

export default function ShareFlow({ currentType, onComplete, onProgress }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFallingStars, setShowFallingStars] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareId, setShareId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState('');
  const [highlightShareButton, setHighlightShareButton] = useState(false);

  // 復元: シェア待機状態とshareIdを保持
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('starpath.share.state') || 'null');
      if (saved) {
        if (saved.shareId) setShareId(saved.shareId);
        // リロード後は保存された状態を復元
        if (typeof saved.isListening === 'boolean') {
          setIsListening(saved.isListening);
        }
        if (Array.isArray(saved.feedbacks)) {
          setFeedbacks(saved.feedbacks);
          
          // 3人以上の感想がある場合、星座の位置にスクロール
          if (saved.feedbacks.length >= 3) {
            setTimeout(() => {
              const skyElement = document.querySelector('.sky');
              if (skyElement) {
                skyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 500);
          }
        }
        if (saved.userName) setUserName(saved.userName);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const snapshot = { shareId, isListening, feedbacks, userName };
    try {
      localStorage.setItem('starpath.share.state', JSON.stringify(snapshot));
    } catch {}
  }, [shareId, isListening, feedbacks, userName]);

  const handleStartShare = () => {
    setShowShareOptions(true);
    setCopySuccess(false);
  };

  const handleStartCopyFlow = () => {
    // 既に名前が保存されている場合は入力画面を表示しない
    if (!userName || userName.trim() === '') {
      setShowNameInput(true);
    }
  };

  const handleCopyShareText = () => {
    if (!userName || userName.trim() === '') {
      alert('名前を入力してください');
      return;
    }

    // 既存のshareIdを再利用。なければ生成
    const idToUse = shareId || generateShareId();
    const shareUrl = `${window.location.origin}?share=${idToUse}`;
    
    const shareText = `【StarPath診断結果】
${userName}さんのタイプ：${currentType.title}（${currentType.zodiac}）

診断結果を見て、感想を教えてください！

こちらから感想を入力できます：
${shareUrl}`;

    console.log('コピーするテキスト:', shareText);

    // iOS対応：タップイベント内ですぐにコピー
    const textArea = document.createElement('textarea');
    textArea.value = shareText;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    
    // iOSでの選択を確実にする
    textArea.focus();
    textArea.setSelectionRange(0, textArea.value.length);
    
    try {
      const successful = document.execCommand('copy');
      console.log('コピー結果:', successful);
      if (successful) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 5000);
        
        // コピー成功後、バックグラウンドでFirebaseに保存（既存IDならマージ更新）
        createShare(idToUse, {
          type: currentType.id,
          name: userName,
          zodiac: currentType.zodiac,
          title: currentType.title,
          longMessage: currentType.longMessage
        }).then(() => {
          console.log('Firebaseに保存成功');
          // リアルタイムリスナーを開始
          setShareId(idToUse);
          setIsListening(true);
        }).catch(error => {
          console.error('Firebase エラー:', error);
        });
      } else {
        console.error('コピー失敗: execCommand returned false');
      }
    } catch (err) {
      console.error('コピー失敗エラー:', err);
    }
    
    document.body.removeChild(textArea);
  };

  // Firebaseから感想をリアルタイムで受信
  useEffect(() => {
    if (!shareId || !isListening) return;

    const unsubscribe = subscribeToFeedbacks(shareId, (newFeedbacks) => {
      // Firebaseの感想を { q2: text } 形式に変換
      const formattedFeedbacks = newFeedbacks.map(fb => ({ q2: fb.text }));
      
      setFeedbacks(prevFeedbacks => {
        // 新規の感想が届いた時のみ処理を実行
        if (formattedFeedbacks.length > prevFeedbacks.length) {
          // シェアオプションを閉じる
          setShowShareOptions(false);
          
          // 進捗を更新
          if (onProgress) {
            onProgress(formattedFeedbacks.length);
          }

          // 感想が届いたら星座にスクロール（新規に届いた時のみ）
          if (prevFeedbacks.length > 0) {
            setTimeout(() => {
              const skyElement = document.querySelector('.sky');
              if (skyElement) {
                skyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
          }

          // 3人揃ったらアニメーション
          if (formattedFeedbacks.length >= 3 && prevFeedbacks.length < 3) {
            setShowFallingStars(true);
            setTimeout(() => setShowFallingStars(false), 3000);
            if (onComplete) {
              onComplete(formattedFeedbacks);
            }
          }
          
          // 3人目以降、新しい感想が届いたら詳細を閉じる
          if (formattedFeedbacks.length >= 3) {
            setShowDetails(false);
          }
        }
        
        return formattedFeedbacks;
      });
    });

    return () => unsubscribe();
  }, [shareId, isListening]);

  const handleManualInput = () => {
    setShowShareOptions(false);
    setShowForm(true);
  };

  const handleFeedbackSubmit = (feedback) => {
    const newFeedbacks = [...feedbacks, feedback];
    setFeedbacks(newFeedbacks);
    setShowForm(false);
    
    // 進捗を更新
    if (onProgress) {
      onProgress(newFeedbacks.length);
    }
    
    // 星座にスクロール
    setTimeout(() => {
      const skyElement = document.querySelector('.sky');
      if (skyElement) {
        skyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    if (newFeedbacks.length >= 3) {
      // 星降りアニメーション
      setShowFallingStars(true);
      setTimeout(() => setShowFallingStars(false), 3000);
      // 3人分揃ったら、ConstellationProgressを表示
      if (onComplete) {
        onComplete(newFeedbacks);
      }
    }
  };

  const handleDemoAddOne = () => {
    const demoFeedbacks = [
      { q2: '優しさと人への気配りが光っています。', person: 1 },
      { q2: '行動力があって、次のステージで必ず役立つと思う。', person: 2 },
      { q2: '新しいアイデアを生み出す力が輝いている。', person: 3 },
      { q2: '冷静な判断力と深い洞察力を持っている。', person: 4 },
      { q2: 'どんな困難も乗り越える強さがある。', person: 5 }
    ];
    
    const nextFeedback = demoFeedbacks[feedbacks.length];
    if (nextFeedback) {
      const newFeedbacks = [...feedbacks, nextFeedback];
      setFeedbacks(newFeedbacks);
      
      // シェアオプションを閉じる
      setShowShareOptions(false);
      
      if (onProgress) {
        onProgress(newFeedbacks.length);
      }
      
      // 星座にスクロール
      setTimeout(() => {
        const skyElement = document.querySelector('.sky');
        if (skyElement) {
          skyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      if (newFeedbacks.length >= 3) {
        // 星降りアニメーション
        setShowFallingStars(true);
        setTimeout(() => setShowFallingStars(false), 3000);
        // 3人分揃ったら、ConstellationProgressを表示
        if (onComplete) {
          onComplete(newFeedbacks);
        }
        
        // 3人目以降、詳細を閉じる
        setShowDetails(false);
      }
    }
  };

  const currentPerson = feedbacks.length + 1;

  return (
    <div>
      <h2>📤 診断を共有して感想をもらう</h2>
      <p className="sub">
        あなたの診断結果「{currentType.title}（{currentType.zodiac}）」を3人に見せて、
        感想をもらいましょう。3人の言葉が線でつながり、あなたの小さな星座になります。
      </p>

      {/* 星座の表示 */}
      <div className="sky" style={{ marginTop: '1.5rem' }}>
        {currentType && <ConstellationImage typeId={currentType.id} progress={feedbacks.length} />}
        <FallingStars trigger={showFallingStars} />
        
        {/* 星座名を表示 */}
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
              opacity: feedbacks.length > 0 ? 0.9 : 0.4,
              transition: 'opacity 0.8s ease-out',
              textShadow: '0 0 8px rgba(143, 211, 255, 0.5)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <div style={{ lineHeight: '1.2' }}>
              メイン星座：{currentType.zodiac}
              {feedbacks.length >= 3 && (
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
              補完星座：{feedbacks.length >= 3 && currentType.complementary ? 
                currentType.complementary.join('・') : 
                '？？？'
              }
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '16px' }}>
        {/* 1〜3人目のボタン（初期段階） */}
        {feedbacks.length < 3 && !showForm && (
          <button 
            className="btn" 
            onClick={handleStartShare}
            style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', marginTop: '1.5rem' }}
          >
            {currentPerson}人目に共有して感想をもらう
          </button>
        )}

        {/* シェア方法の選択（3人以上の時は下側に移動） */}
        {showShareOptions && feedbacks.length < 3 && (
          <div style={{ 
            marginTop: '1.5rem',
            padding: '1.5rem',
            background: 'rgba(143, 211, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid var(--line)'
          }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
              シェア方法を選択
            </h3>

            {/* コピー成功メッセージ */}
            {copySuccess && (
              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.2), rgba(100, 180, 255, 0.2))',
                borderRadius: '8px',
                border: '2px solid var(--accent)',
                marginBottom: '1rem',
                textAlign: 'center',
                animation: 'fadeInUp 0.5s ease-out'
              }}>
                <p style={{ margin: 0, fontWeight: '600', marginBottom: '0.5rem' }}>
                  ✅ コピーしました！
                </p>
                <p className="sub" style={{ fontSize: '0.85rem', margin: 0 }}>
                  LINEやメールで送ってください。<br />
                  相手が感想を入力すると、<strong>自動でここに届きます！</strong>✨
                </p>
              </div>
            )}

            {/* リアルタイム待機中メッセージ */}
            {isListening && !copySuccess && (
              <div style={{
                padding: '1rem',
                background: 'rgba(143, 211, 255, 0.1)',
                borderRadius: '8px',
                marginBottom: '1rem',
                textAlign: 'center',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>
                  📡 感想を待っています...
                </p>
                <p className="sub" style={{ fontSize: '0.8rem', margin: 0, marginTop: '0.3rem' }}>
                  相手が入力すると自動で届きます
                </p>
              </div>
            )}
            
            {!showNameInput ? (
              <>
                <button 
                  className="btn" 
                  onClick={() => {
                    // 既に名前が保存されている場合は直接コピー
                    if (userName && userName.trim() !== '') {
                      handleCopyShareText();
                    } else {
                      handleStartCopyFlow();
                    }
                  }}
                  style={{ 
                    width: '100%', 
                    marginBottom: '0.8rem',
                    background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.2), rgba(100, 180, 255, 0.2))',
                    border: '2px solid var(--accent)'
                  }}
                >
                  📋 シェア用テキストをコピー
                  {userName && userName.trim() !== '' && (
                    <span style={{ fontSize: '0.8rem', marginLeft: '0.5rem', opacity: 0.8 }}>
                      （{userName}さん）
                    </span>
                  )}
                </button>
                <p className="sub" style={{ fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>
                  LINEやメールで送って、感想をもらおう
                </p>
              </>
            ) : (
              <div style={{ 
                marginBottom: '1rem',
                padding: '1.5rem',
                background: 'rgba(143, 211, 255, 0.08)',
                borderRadius: '12px',
                border: '2px solid var(--accent)'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.8rem', 
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  color: 'var(--accent)'
                }}>
                  ✏️ あなたの名前（ニックネームOK）を入力してください
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="例：山田太郎"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.1rem',
                    borderRadius: '8px',
                    border: '3px solid var(--accent)',
                    background: 'rgba(143, 211, 255, 0.1)',
                    color: 'var(--fg)',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 8px rgba(143, 211, 255, 0.2)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '3px solid var(--accent)';
                    e.target.style.boxShadow = '0 4px 12px rgba(143, 211, 255, 0.4)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '3px solid var(--accent)';
                    e.target.style.boxShadow = '0 2px 8px rgba(143, 211, 255, 0.2)';
                  }}
                />
                <button 
                  className="btn" 
                  onClick={handleCopyShareText}
                  style={{ 
                    width: '100%',
                    marginBottom: '0.8rem',
                    fontSize: '1.1rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.2), rgba(100, 180, 255, 0.2))',
                    border: '2px solid var(--accent)'
                  }}
                >
                  📋 コピーする
                </button>
                <button 
                  className="btn demo" 
                  onClick={() => {
                    setShowNameInput(false);
                    setUserName('');
                  }}
                  style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}
                >
                  戻る
                </button>
              </div>
            )}

            <button 
              className="btn" 
              onClick={handleManualInput}
              style={{ width: '100%', marginBottom: '0.8rem' }}
            >
              ✍️ その場で入力してもらう
            </button>
            <p className="sub" style={{ fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>
              スマホを渡して直接入力
            </p>

            <button 
              className="btn demo" 
              onClick={() => setShowShareOptions(false)}
              style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}
            >
              キャンセル
            </button>
          </div>
        )}

        {showForm && feedbacks.length < 5 && (
          <div style={{ marginTop: '1.5rem' }}>
            <FeedbackForm 
              onSubmit={handleFeedbackSubmit}
              personNumber={currentPerson}
            />
          </div>
        )}

        {/* デモ再生ボタン（段階的に1人ずつ） */}

        <div className="msg" style={{ 
          marginTop: '1.5rem',
          padding: '1rem', 
          background: 'rgba(143, 211, 255, 0.1)', 
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          {feedbacks.length === 0 && '星座がうっすらと見えています。感想を集めて輝かせましょう。'}
          {feedbacks.length === 1 && '🌟 1人目の光を受け取りました。星座がほのかに輝き始めました。'}
          {feedbacks.length === 2 && '🌟🌟 2人目の光が加わり、星座がさらに明るく輝いています。'}
          {feedbacks.length === 3 && '🌟🌟🌟 3人目の光で、星座が完全に輝きました！'}
          {feedbacks.length === 4 && '🌟🌟🌟🌟 4人目の光が加わり、新たな進化を遂げようとしています！'}
          {feedbacks.length >= 5 && '✨✨✨ 5人の光で、あなたは極みに到達しました！'}
        </div>
        

        {/* 詳細情報ボタン（3人以上揃った時） */}
        {feedbacks.length >= 3 && currentType && (
          <div style={{ 
            marginTop: '1.5rem',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            {!showDetails && feedbacks.length >= 3 && feedbacks.length < 5 && (
              <div style={{
                padding: '1.2rem',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 165, 0, 0.15))',
                borderRadius: '12px',
                marginBottom: '1rem',
                textAlign: 'center',
                border: '2px solid rgba(255, 215, 0, 0.4)',
                animation: feedbacks.length === 3 ? 'pulse 2s ease-in-out infinite' : 'none'
              }}>
                <p style={{ 
                  fontSize: '1.1rem', 
                  margin: 0, 
                  fontWeight: '700',
                  color: 'var(--accent)',
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
                  lineHeight: '1.5'
                }}>
                  ✨ 新しい情報が解放されて{feedbacks.length === 3 ? 'いました！' : 'います。'}
                </p>
                <p style={{ 
                  fontSize: '1rem', 
                  margin: '0.5rem 0 0 0', 
                  fontWeight: '500',
                  color: 'var(--text)',
                  lineHeight: '1.6'
                }}>
                  下のボタンから詳細を確認できます。
                </p>
              </div>
            )}
            {!showDetails && feedbacks.length >= 5 && (
              <div style={{
                padding: '1.2rem',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 165, 0, 0.15))',
                borderRadius: '12px',
                marginBottom: '1rem',
                textAlign: 'center',
                border: '2px solid rgba(255, 215, 0, 0.4)',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <p style={{ 
                  fontSize: '1.3rem', 
                  margin: 0, 
                  fontWeight: '700',
                  color: 'var(--accent)',
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
                  lineHeight: '1.5'
                }}>
                  ⚡ 極みへと進化しました！
                </p>
                <p style={{ 
                  fontSize: '1rem', 
                  margin: '0.5rem 0 0 0', 
                  fontWeight: '500',
                  color: 'var(--text)',
                  lineHeight: '1.6'
                }}>
                  下のボタンをタップして<br />確認してみてください！
                </p>
              </div>
            )}
            <button 
              className="btn" 
              onClick={() => setShowDetails(!showDetails)}
              style={{ 
                width: '100%', 
                marginBottom: showDetails ? '1rem' : '0',
                fontSize: '1.2rem',
                padding: '1.2rem',
                fontWeight: '700',
                animation: !showDetails ? 'bounce 1s ease-in-out 3' : 'none'
              }}
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
                <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  {currentType.step2Message}
                </p>

                {/* 進化の予告（5人未満の時のみ表示） */}
                {feedbacks.length < 5 && (
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                    padding: '0.8rem',
                    background: 'rgba(255, 215, 0, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 215, 0, 0.3)'
                  }}>
                    <p style={{ 
                      fontSize: '1rem', 
                      margin: 0, 
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: 'var(--accent)'
                    }}>
                      さらに進化することもできます！
                    </p>
                    <div style={{ 
                      fontSize: '2.5rem',
                      animation: 'bounce 1.5s ease-in-out infinite'
                    }}>
                      ⬇️
                    </div>
                  </div>
                )}

                {/* 極み（3人以上で表示、5人で解放） */}
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  background: feedbacks.length >= 5 
                    ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1))'
                    : 'linear-gradient(135deg, rgba(100, 100, 100, 0.05), rgba(80, 80, 80, 0.05))',
                  borderRadius: '12px',
                  border: feedbacks.length >= 5 
                    ? '2px solid rgba(255, 215, 0, 0.5)'
                    : '2px solid rgba(100, 100, 100, 0.3)',
                  position: 'relative',
                  transition: 'all 0.8s ease-out',
                  animation: feedbacks.length >= 5 ? 'fadeInUp 0.8s ease-out' : 'none'
                }}>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '1rem', 
                    color: 'var(--accent)',
                    textAlign: 'center',
                    filter: feedbacks.length >= 5 ? 'none' : 'blur(0.5px)',
                    opacity: feedbacks.length >= 5 ? 1 : 0.6
                  }}>
                    ⚡ {currentType.step3Title}
                  </h3>
                  
                  {/* 文字化けと解放条件を重ねる */}
                  <div style={{ position: 'relative' }}>
                    <p style={{ 
                      lineHeight: '1.7', 
                      marginBottom: '0',
                      textAlign: 'center',
                      fontSize: '1.05rem',
                      fontWeight: '500',
                      whiteSpace: 'pre-line',
                      opacity: feedbacks.length >= 5 ? 1 : 0.25
                    }}>
                      {feedbacks.length >= 5 
                        ? currentType.step3Message 
                        : '■■■■■■■■■■■■■■■\n■■■■■■■■■■■■■■■\n■■■■■■■■■■■■■■■\n■■■■■■■■■■■■■■■'}
                    </p>
                    
                    {/* 解放条件を重ねる（5人未満の時） */}
                    {feedbacks.length < 5 && (
                      <div 
                        onClick={() => {
                          // 4人目に共有するボタンの位置にスクロール
                          const shareButton = document.querySelector('[data-share-button]');
                          if (shareButton) {
                            shareButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // ボタンをハイライトしてアニメーション
                            setHighlightShareButton(true);
                            setTimeout(() => setHighlightShareButton(false), 3500);
                          }
                        }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '95%',
                          padding: '1rem 0.8rem',
                          background: 'rgba(255, 215, 0, 0.75)',
                          borderRadius: '8px',
                          textAlign: 'center',
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: 'var(--bg)',
                          border: '2px solid rgba(255, 215, 0, 1)',
                          boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
                          lineHeight: '1.5',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(255, 215, 0, 0.9)';
                          e.target.style.transform = 'translate(-50%, -50%) scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(255, 215, 0, 0.75)';
                          e.target.style.transform = 'translate(-50%, -50%) scale(1)';
                        }}
                      >
                        🔓 あと{5 - feedbacks.length}人（合計5人）に<br />感想を聞くと解放されます<br />
                        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>タップして次のステップへ</span>
                      </div>
                    )}
                  </div>
                  
                  {/* 解放演出（5人の時） */}
                  {feedbacks.length >= 5 && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '0.8rem',
                      background: 'rgba(255, 215, 0, 0.2)',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      animation: 'pulse 2s ease-in-out 3'
                    }}>
                      ✨ 極みが解放されました！
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 集まった言葉を表示 */}
        {feedbacks.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
              💬 {feedbacks.length}人の言葉
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

        {/* 4〜5人目のボタン（3人以上集まった後、下側に配置） */}
        {feedbacks.length >= 3 && feedbacks.length < 5 && !showForm && (
          <div style={{ position: 'relative', marginTop: '1.5rem' }}>
            {/* 矢印表示（ハイライト時） */}
            {highlightShareButton && (
              <div style={{
                position: 'absolute',
                top: '-45px',
                left: '12%',
                fontSize: '2.2rem',
                animation: 'bounce 0.8s ease-in-out infinite',
                zIndex: 10,
                color: 'var(--accent)',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                ⬇️
              </div>
            )}
            <button 
              className="btn" 
              data-share-button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('4人目ボタンクリック:', { shareId, showShareOptions });
                
                // 他のスクロール処理を無効化
                const skyElement = document.querySelector('.sky');
                if (skyElement) {
                  skyElement.scrollIntoView = () => {}; // 一時的に無効化
                }
                
                // シェアオプションを表示
                setShowShareOptions(true);
                setCopySuccess(false);
                
                // 少し遅延してからスクロール処理を復元
                setTimeout(() => {
                  if (skyElement) {
                    skyElement.scrollIntoView = Element.prototype.scrollIntoView;
                  }
                }, 1000);
              }}
              style={{ 
                width: '100%', 
                fontSize: '1.1rem', 
                padding: '1rem'
              }}
            >
              {currentPerson}人目に共有して感想をもらう
            </button>
          </div>
        )}

        {/* デモボタン（4人目のボタンの下に配置） */}
        {feedbacks.length >= 3 && feedbacks.length < 5 && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button 
              className="btn demo" 
              onClick={handleDemoAddOne} 
              style={{ fontSize: '12px', padding: '0.5rem 1rem' }}
            >
              ⚡ デモ：{currentPerson}人目を追加
            </button>
          </div>
        )}

        {/* シェア方法の選択（4人目以降、下側に配置、ボタンタップ時のみ） */}
        {showShareOptions && feedbacks.length >= 3 && feedbacks.length <= 5 && !showForm && (
          <div style={{ 
            marginTop: '1.5rem',
            padding: '1.5rem',
            background: 'rgba(143, 211, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid var(--line)'
          }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
              シェア方法を選択
            </h3>

            {/* コピー成功メッセージ */}
            {copySuccess && (
              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.2), rgba(100, 180, 255, 0.2))',
                borderRadius: '8px',
                border: '2px solid var(--accent)',
                marginBottom: '1rem',
                textAlign: 'center',
                animation: 'fadeInUp 0.5s ease-out'
              }}>
                <p style={{ margin: 0, fontWeight: '600', marginBottom: '0.5rem' }}>
                  ✅ コピーしました！
                </p>
                <p className="sub" style={{ fontSize: '0.85rem', margin: 0 }}>
                  LINEやメールで送ってください。<br />
                  相手が感想を入力すると、<strong>自動でここに届きます！</strong>✨
                </p>
              </div>
            )}

            {/* リアルタイム待機中メッセージ */}
            {isListening && !copySuccess && (
              <div style={{
                padding: '1rem',
                background: 'rgba(143, 211, 255, 0.1)',
                borderRadius: '8px',
                marginBottom: '1rem',
                textAlign: 'center',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>
                  📡 感想を待っています...
                </p>
                <p className="sub" style={{ fontSize: '0.8rem', margin: 0, marginTop: '0.3rem' }}>
                  相手が入力すると自動で届きます
                </p>
              </div>
            )}
            
            {!showNameInput ? (
              <>
                <button 
                  className="btn" 
                  onClick={() => {
                    // 既に名前が保存されている場合は直接コピー
                    if (userName && userName.trim() !== '') {
                      handleCopyShareText();
                    } else {
                      handleStartCopyFlow();
                    }
                  }}
                  style={{ 
                    width: '100%', 
                    marginBottom: '0.8rem',
                    background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.2), rgba(100, 180, 255, 0.2))',
                    border: '2px solid var(--accent)'
                  }}
                >
                  📋 シェア用テキストをコピー
                  {userName && userName.trim() !== '' && (
                    <span style={{ fontSize: '0.8rem', marginLeft: '0.5rem', opacity: 0.8 }}>
                      （{userName}さん）
                    </span>
                  )}
                </button>
                <p className="sub" style={{ fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>
                  LINEやメールで送って、感想をもらおう
                </p>
              </>
            ) : (
              <div style={{ 
                marginBottom: '1rem',
                padding: '1.5rem',
                background: 'rgba(143, 211, 255, 0.08)',
                borderRadius: '12px',
                border: '2px solid var(--accent)'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.8rem', 
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  color: 'var(--accent)'
                }}>
                  ✏️ あなたの名前（ニックネームOK）を入力してください
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="例：山田太郎"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.1rem',
                    borderRadius: '8px',
                    border: '3px solid var(--accent)',
                    background: 'rgba(143, 211, 255, 0.1)',
                    color: 'var(--fg)',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 8px rgba(143, 211, 255, 0.2)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '3px solid var(--accent)';
                    e.target.style.boxShadow = '0 4px 12px rgba(143, 211, 255, 0.4)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '3px solid var(--accent)';
                    e.target.style.boxShadow = '0 2px 8px rgba(143, 211, 255, 0.2)';
                  }}
                />
                <button 
                  className="btn" 
                  onClick={handleCopyShareText}
                  style={{ 
                    width: '100%',
                    marginBottom: '0.8rem',
                    fontSize: '1.1rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.2), rgba(100, 180, 255, 0.2))',
                    border: '2px solid var(--accent)'
                  }}
                >
                  📋 コピーする
                </button>
                <button 
                  className="btn demo" 
                  onClick={() => {
                    setShowNameInput(false);
                    setUserName('');
                  }}
                  style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}
                >
                  戻る
                </button>
              </div>
            )}

            <button 
              className="btn" 
              onClick={handleManualInput}
              style={{ width: '100%', marginBottom: '0.8rem' }}
            >
              ✍️ その場で入力してもらう
            </button>
            <p className="sub" style={{ fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>
              スマホを渡して直接入力
            </p>

            <button 
              className="btn demo" 
              onClick={() => setShowShareOptions(false)}
              style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}
            >
              キャンセル
            </button>
          </div>
        )}

        {/* 公開設定（3人揃った時） */}
        {feedbacks.length >= 3 && (
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
        )}

      </div>
    </div>
  );
}



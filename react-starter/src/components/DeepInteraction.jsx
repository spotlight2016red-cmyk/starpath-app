import React, { useState } from 'react';

// 3つの深掘りルート（AI対話形式）
const DEEP_ROUTES = {
  gap: {
    title: 'ギャップ発見',
    subtitle: '思い込みを超える',
    description: 'あなたが思っていることと、周りが見ていることのギャップを発見し、新たな気づきを得ましょう。',
    questions: [
      {
        ai: '周りの人は、あなたのことをどんな風に言いますか？例えば「優しい」「頼りになる」「面白い」など、よく言われる言葉を教えてください。',
        placeholder: '例：優しい、真面目、面白い...',
        followUp: 'なるほど、周りからはそう見られているんですね。'
      },
      {
        ai: 'では、あなた自身は自分のことをどんな人だと思いますか？周りの評価とは違うかもしれませんね。',
        placeholder: '例：実は心配性、本当は...',
        followUp: 'そうなんですね。周りが見ているあなたと、自分が思うあなたに違いがありそうですね。'
      },
      {
        ai: 'その「周りが見るあなた」と「あなたが思う自分」のギャップから、どんな新しい可能性が見えてきますか？',
        placeholder: '例：周りは優しいと言うけど、実は...',
        followUp: '素晴らしい気づきですね！'
      },
      {
        ai: 'そのギャップを意識することで、これからどんなことにチャレンジできそうですか？',
        placeholder: '例：もっと自分らしく...',
        followUp: 'ありがとうございます。あなたの可能性が見えてきました！'
      }
    ]
  },
  success: {
    title: '成功パターン',
    subtitle: '輝く瞬間から学ぶ',
    description: '過去にあなたが一番輝いていた瞬間を振り返り、その成功パターンを発見しましょう。',
    questions: [
      {
        ai: 'これまでの人生で「最高に上手くいった！」「やった！」と感じた経験を教えてください。どんな小さなことでも大丈夫です。',
        placeholder: '例：プロジェクトを成功させた、友達を助けた...',
        followUp: 'それは素晴らしい経験ですね！'
      },
      {
        ai: 'その時、あなたはどんな状況で、どんな気持ちでしたか？その瞬間を思い出してみてください。',
        placeholder: '例：チームで協力していて、ワクワクしていた...',
        followUp: 'その時の感覚、大切ですね。'
      },
      {
        ai: 'その成功体験で、あなたはどんな強みや能力を発揮していましたか？',
        placeholder: '例：人をまとめる力、粘り強さ...',
        followUp: 'それがあなたの強みなんですね！'
      },
      {
        ai: 'その成功パターンを、今抱えている課題や目標にどう活かせそうですか？',
        placeholder: '例：同じように人を巻き込んで...',
        followUp: 'ありがとうございます。あなたの成功の鍵が見えてきました！'
      }
    ]
  },
  roots: {
    title: 'ルーツ発見',
    subtitle: '家族・ご先祖からの影響',
    description: 'あなたの家族やルーツから受け継いだ価値観や特性を発見し、自分の本質を理解しましょう。',
    questions: [
      {
        ai: 'あなたの家族（祖父母や両親）は、どんなことを大切にしていましたか？覚えているエピソードがあれば教えてください。',
        placeholder: '例：家族の絆、誠実さ、助け合い...',
        followUp: 'そういう家族の中で育ったんですね。'
      },
      {
        ai: 'その家族の価値観から、あなたが受け継いでいると感じるものは何ですか？',
        placeholder: '例：人を大切にする心、諦めない姿勢...',
        followUp: 'それがあなたの根っこにあるんですね。'
      },
      {
        ai: 'もしご先祖様が今のあなたを見て、メッセージを送るとしたら、どんな言葉だと思いますか？',
        placeholder: '例：よく頑張っているね、自分らしく生きなさい...',
        followUp: 'きっとそう言ってくれていると思います。'
      },
      {
        ai: 'そのルーツの繋がりを意識して、これからどんな貢献や生き方ができそうですか？',
        placeholder: '例：家族のように人を支える、伝統を次に繋ぐ...',
        followUp: 'ありがとうございます。あなたの使命が見えてきました！'
      }
    ]
  }
};

export default function DeepInteraction({ currentType, onComplete, savedResult, onClose }) {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [completedRoutes, setCompletedRoutes] = useState(new Set());
  const [allRouteAnswers, setAllRouteAnswers] = useState({}); // 全ルートの回答を保存
  const [routeProgress, setRouteProgress] = useState({}); // ルートごとの進捗（質問番号と回答）を保存
  const [viewMode, setViewMode] = useState(false); // 閲覧モード
  const [prefill, setPrefill] = useState(null); // 診断回答の文脈
  
  // 保存された結果がある場合は閲覧モードで開始
  React.useEffect(() => {
    if (savedResult && savedResult.allRouteAnswers) {
      setViewMode(true);
      setAllRouteAnswers(savedResult.allRouteAnswers);
      setCompletedRoutes(new Set(Object.keys(savedResult.allRouteAnswers)));
    }
    // 12問の回答を読み込んで、問いかけに文脈を付与
    try {
      const q = JSON.parse(localStorage.getItem('starpath.questionnaire.answers') || 'null');
      if (q) setPrefill(q);
    } catch {}
  }, [savedResult]);

  const handleAnswer = (questionIndex, answer) => {
    const newAnswers = { ...answers, [questionIndex]: answer };
    setAnswers(newAnswers);

    if (questionIndex === DEEP_ROUTES[selectedRoute].questions.length - 1) {
      // 最後の質問の場合
      setShowResult(true);
      setCompletedRoutes(prev => new Set([...prev, selectedRoute]));
      
      // このルートの回答を保存
      setAllRouteAnswers(prev => ({
        ...prev,
        [selectedRoute]: newAnswers
      }));
      
      // 自動でonCompleteは呼ばない（ユーザーが「次へ進む」ボタンを押すまで結果を表示）
    } else {
      // 次の質問へ
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    }
  };

  const generateInsights = (route, answers, type) => {
    const routeData = DEEP_ROUTES[route];
    const answerTexts = Object.values(answers);
    
    // 回答内容から分析を生成
    let analysis = '';
    if (route === 'gap') {
      analysis = `あなたは周りから見られている姿と、自分が思う姿にギャップがあることに気づきました。このギャップこそが、あなたの「隠れた可能性」です。${type.name}タイプのあなたは、このギャップを活かすことで、さらに輝くことができます。`;
    } else if (route === 'success') {
      analysis = `あなたの成功体験から、あなたが最も力を発揮できる状況やパターンが見えてきました。${type.name}タイプのあなたは、この成功パターンを意識することで、今後の課題にも自信を持って取り組めるでしょう。`;
    } else if (route === 'roots') {
      analysis = `あなたのルーツを辿ることで、あなたの核となる価値観や使命が明確になりました。${type.name}タイプのあなたは、このルーツの繋がりを意識することで、より深い自己理解と人生の方向性を得られます。`;
    }
    
    return {
      title: `${routeData.title}の気づき`,
      summary: `${type.name}タイプのあなたが、${routeData.title}を通じて発見した重要な気づきです。`,
      analysis: analysis,
      insights: [
        'あなたの隠れた強みが明確になりました',
        'これまでの思い込みを超える視点を得ました',
        '今後の行動指針が見えてきました'
      ],
      nextStep: 'この気づきを活かして、星座の進捗に進みましょう'
    };
  };

  const resetFlow = () => {
    // 現在のルートの進捗を保存してからリセット
    if (selectedRoute && Object.keys(answers).length > 0) {
      setRouteProgress(prev => ({
        ...prev,
        [selectedRoute]: {
          currentQuestion: currentQuestion,
          answers: answers
        }
      }));
    }
    
    setSelectedRoute(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    // completedRoutesとrouteProgressは保持する（リセットしない）
  };

  if (showResult) {
    const insights = generateInsights(selectedRoute, answers, currentType);
    const routeData = DEEP_ROUTES[selectedRoute];
    
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div className="stars-falling">✨</div>
        <h2>🌟 {insights.title}</h2>
        <p className="sub">{insights.summary}</p>
        
        {/* 回答の振り返り */}
        <div style={{ 
          background: 'rgba(143, 211, 255, 0.05)', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          border: '1px solid var(--line)',
          textAlign: 'left',
          marginTop: '2rem',
          marginBottom: '2rem'
        }}>
          <h4 style={{ fontSize: '16px', marginBottom: '1rem', color: 'var(--accent)' }}>
            📝 あなたの回答
          </h4>
          {routeData.questions.map((question, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                fontSize: '14px', 
                color: 'var(--muted)', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                Q{index + 1}: {question.ai}
              </div>
              <div style={{ 
                fontSize: '14px', 
                lineHeight: '1.6',
                paddingLeft: '1rem',
                borderLeft: '2px solid var(--accent)',
                color: 'var(--text)'
              }}>
                {answers[index] || '（未回答）'}
              </div>
            </div>
          ))}
        </div>

          {/* 分析結果（タイプに応じた一言を追加） */}
        <div style={{ 
          background: 'rgba(255, 215, 0, 0.05)', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          border: '1px solid rgba(255, 215, 0, 0.3)',
          textAlign: 'left',
          marginBottom: '2rem'
        }}>
          <h4 style={{ fontSize: '16px', marginBottom: '1rem', color: '#FFD700' }}>
            💡 分析結果
          </h4>
          <p style={{ lineHeight: '1.8', fontSize: '15px' }}>
            {insights.analysis}
          </p>
            {prefill && (
              <p className="sub" style={{ marginTop: '0.5rem' }}>
                先ほどの12問の傾向（例：自由/調和/誠実 など）も踏まえて対話を行いました。
              </p>
            )}
        </div>

        <div className="msg" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <strong>{insights.nextStep}</strong>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '1rem', color: 'var(--accent)' }}>
            他のルートも試してみませんか？
          </h3>
          <div className="options">
            {Object.entries(DEEP_ROUTES)
              .filter(([key]) => key !== selectedRoute)
              .map(([key, route]) => (
                <div key={key} className="option unlocked">
                  <div>
                    <strong>{route.title}</strong>
                    <br />
                    <span className="sub">{route.subtitle}</span>
                  </div>
                  <button 
                    className="btn" 
                    onClick={() => {
                      if (!completedRoutes.has(key)) {
                        setSelectedRoute(key);
                        setCurrentQuestion(0);
                        setAnswers({});
                        setShowResult(false);
                      }
                    }}
                    disabled={completedRoutes.has(key)}
                    style={{
                      opacity: completedRoutes.has(key) ? 0.5 : 1,
                      cursor: completedRoutes.has(key) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {completedRoutes.has(key) ? '✓ 完了' : '始める'}
                  </button>
                </div>
              ))}
          </div>
          
          {completedRoutes.size >= Object.keys(DEEP_ROUTES).length && (
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button 
                className="btn demo" 
                onClick={() => onComplete({
                  route: selectedRoute,
                  answers: answers,
                  allRouteAnswers: allRouteAnswers,
                  insights: generateInsights(selectedRoute, answers, currentType),
                  allCompleted: true
                })}
              >
                全て完了！次へ進む
              </button>
              <p className="sub" style={{ marginTop: '1rem' }}>
                3つのルート全てが完了しました！次のステップに進みましょう。
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedRoute && currentQuestion < DEEP_ROUTES[selectedRoute].questions.length) {
    const route = DEEP_ROUTES[selectedRoute];
    const question = route.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / route.questions.length) * 100;

    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h2>{route.title}</h2>
          <p className="sub">{route.description}</p>
          
          {/* 進捗バー */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'var(--line)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'var(--accent)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p className="sub" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
              質問 {currentQuestion + 1} / {route.questions.length}
            </p>
          </div>
        </div>

        {/* AI対話形式の質問 */}
        <div style={{ 
          padding: '2rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid var(--line)',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {/* AIのアイコンと吹き出し */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ 
              fontSize: '2rem', 
              marginRight: '1rem',
              flexShrink: 0
            }}>
              🤖
            </div>
            <div style={{
              background: 'rgba(143, 211, 255, 0.1)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid var(--accent)',
              flex: 1
            }}>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6',
                margin: 0
              }}>
                {question.ai}
              </p>
            </div>
          </div>

          {/* 回答入力 */}
          <textarea
            placeholder={question.placeholder}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '1rem',
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              color: 'var(--text)',
              fontSize: '16px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            onChange={(e) => {
              // リアルタイムで回答を保存
              const newAnswers = { ...answers, [currentQuestion]: e.target.value };
              setAnswers(newAnswers);
            }}
            value={answers[currentQuestion] || ''}
          />

          <button 
            className="btn" 
            onClick={() => handleAnswer(currentQuestion, answers[currentQuestion] || '')}
            disabled={!answers[currentQuestion]?.trim()}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            {currentQuestion === route.questions.length - 1 ? '完了' : '次へ'}
          </button>
        </div>

        <button 
          className="btn" 
          onClick={resetFlow}
          style={{ marginTop: '1rem', background: 'var(--muted)' }}
        >
          ← ルート選択に戻る
        </button>

        {/* デバッグ用：回答スキップボタン */}
        <div style={{ marginTop: '1rem', textAlign: 'center', borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
          <p className="sub" style={{ fontSize: '12px', marginBottom: '0.5rem' }}>開発用ショートカット</p>
          <button 
            className="btn" 
            onClick={() => {
              // 全質問にダミー回答を設定
              const dummyAnswers = {};
              route.questions.forEach((_, index) => {
                dummyAnswers[index] = `テスト回答 ${index + 1}`;
              });
              setAnswers(dummyAnswers);
              // 最後の質問に進んで完了
              handleAnswer(route.questions.length - 1, `テスト回答 ${route.questions.length}`);
            }}
            style={{ fontSize: '12px', padding: '0.5rem 1rem', background: 'var(--muted)' }}
          >
            ⚡ このルートをスキップ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>{viewMode ? '📖 深い対話の記録' : '💫 もっと深くあなたらしさを知りませんか？'}</h2>
      <p className="sub">
        {viewMode 
          ? 'これまでの回答と分析結果を見返すことができます。' 
          : '普段抱えている悩みや課題から、あなたの本当の強みや可能性を一緒に発見していきましょう！'
        }
      </p>

      <div className="options" style={{ marginTop: '2rem' }}>
        {Object.entries(DEEP_ROUTES).map(([key, route]) => {
          const isCompleted = completedRoutes.has(key);
          const progress = routeProgress[key];
          const hasProgress = progress && Object.keys(progress.answers).length > 0;
          
          return (
            <div key={key} className="option unlocked">
              <div>
                <strong>{route.title}</strong>
                {isCompleted && <span style={{ marginLeft: '0.5rem', color: 'var(--accent)' }}>✓ 完了</span>}
                {!isCompleted && hasProgress && (
                  <span style={{ marginLeft: '0.5rem', color: 'var(--muted)', fontSize: '12px' }}>
                    （回答途中：{Object.keys(progress.answers).length}/{route.questions.length}）
                  </span>
                )}
                <br />
                <span className="sub">{route.subtitle}</span>
                <br />
                <span className="sub" style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {route.description}
                </span>
              </div>
              <button 
                className="btn" 
                onClick={() => {
                  setSelectedRoute(key);
                  // 閲覧モードの場合は保存された回答を表示
                  if (viewMode && allRouteAnswers[key]) {
                    setAnswers(allRouteAnswers[key]);
                    setShowResult(true);
                  } else if (progress) {
                    // 進捗がある場合は復元
                    setCurrentQuestion(progress.currentQuestion);
                    setAnswers(progress.answers);
                  }
                }}
                disabled={!viewMode && isCompleted}
                style={!viewMode && isCompleted ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              >
                {viewMode ? '📖 見る' : (isCompleted ? '✓ 完了' : hasProgress ? '続きから' : '始める')}
              </button>
            </div>
          );
        })}
      </div>

      {!viewMode && (
        <div className="msg" style={{ marginTop: '2rem' }}>
          <strong>💡 ヒント：</strong>どのルートから始めても構いません。気になるものから始めてみてください。
        </div>
      )}

      {!viewMode && completedRoutes.size < Object.keys(DEEP_ROUTES).length && (
        <div style={{ marginTop: '1rem', textAlign: 'center', borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
          <p className="sub" style={{ fontSize: '12px', marginBottom: '0.5rem' }}>開発用ショートカット</p>
          <button 
            className="btn" 
            onClick={() => {
              // 全ルートにダミー回答を設定して完了状態にする
              const allDummyAnswers = {};
              Object.keys(DEEP_ROUTES).forEach(routeKey => {
                const dummyRouteAnswers = {};
                DEEP_ROUTES[routeKey].questions.forEach((_, index) => {
                  dummyRouteAnswers[index] = `テスト回答 ${index + 1}`;
                });
                allDummyAnswers[routeKey] = dummyRouteAnswers;
              });
              
              setAllRouteAnswers(allDummyAnswers);
              setCompletedRoutes(new Set(Object.keys(DEEP_ROUTES)));
              
              // 状態更新後に結果を表示
              setTimeout(() => {
                const firstRoute = Object.keys(DEEP_ROUTES)[0];
                setSelectedRoute(firstRoute);
                setAnswers(allDummyAnswers[firstRoute]);
                setShowResult(true);
              }, 100);
            }}
            style={{ fontSize: '12px', padding: '0.5rem 1rem', background: 'var(--muted)' }}
          >
            ⚡ 全ルートをスキップ
          </button>
        </div>
      )}

      {viewMode && onClose && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn" 
              onClick={onClose}
              style={{ background: 'var(--muted)' }}
            >
              展開を閉じる
            </button>
            <button 
              className="btn" 
              onClick={() => {
                // 深い対話の結果を保存してから完了
                if (savedResult && onComplete) {
                  onComplete(savedResult);
                }
              }}
              style={{ 
                background: 'linear-gradient(135deg, var(--accent), #6bb6ff)'
              }}
            >
              🚀 次のステップに進む
            </button>
          </div>
        </div>
      )}

      {/* 全ルート完了時の次のステップボタン */}
      {!viewMode && completedRoutes.size >= Object.keys(DEEP_ROUTES).length && (
        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>🌟 深い対話完了！</h3>
            <p className="sub">すべてのルートを探索しました。あなたの新しい気づきを活かして、次のステップに進みましょう。</p>
          </div>
          <button 
            className="btn" 
            onClick={() => {
              // 深い対話の結果を保存
              const result = {
                allRouteAnswers,
                completedAt: new Date().toISOString(),
                insights: Object.keys(DEEP_ROUTES).map(routeKey => ({
                  route: routeKey,
                  title: DEEP_ROUTES[routeKey].title,
                  answers: allRouteAnswers[routeKey] || {}
                }))
              };
              
              // 結果を保存してから完了
              if (onComplete) {
                onComplete(result);
              }
            }}
            style={{ 
              background: 'linear-gradient(135deg, var(--accent), #6bb6ff)',
              fontSize: '1.1rem',
              padding: '1rem 2rem'
            }}
          >
            🚀 次のステップを確認する
          </button>
        </div>
      )}
    </div>
  );
}

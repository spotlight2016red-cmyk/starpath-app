import React, { useState } from 'react';

// 12問の質問（より本質に触れる内容）
const QUESTIONS = [
  { id: 1,  text: '決断の前に、まず「全体の流れ」や背景を見渡す。', axis: 'overview' },
  { id: 2,  text: '言葉にしづらい直観（空気の変化・可能性の芽）を感じ取れる。', axis: 'intuition' },
  { id: 3,  text: '人の感情や場の雰囲気に敏感で、自然と気遣いが生まれる。', axis: 'empathy' },
  { id: 4,  text: '一人の静かな時間で、心が整いエネルギーが回復する。', axis: 'solitude' },
  { id: 5,  text: '枠にない発想・新しいつなぎ方を考えるのが好きだ。', axis: 'creation' },
  { id: 6,  text: '「誰かの役に立てた」と実感できると、一気に力が湧く。', axis: 'support' },
  { id: 7,  text: '揺れた時でも、呼吸や習慣で気持ちを立て直せる。', axis: 'calm' },
  { id: 8,  text: '自由と自走を重んじ、細かな管理より信頼で動きたい。', axis: 'freedom' },
  { id: 9,  text: '物語・比喩・言葉選びで、想いを伝えるのが得意だ。', axis: 'expression' },
  { id: 10, text: '誠実さ・感謝・約束を守ることを、自分の芯として大切にしている。', axis: 'sincerity' },
  { id: 11, text: '変化の波にワクワクでき、方向転換や再設計が苦にならない。', axis: 'change' },
  { id: 12, text: '最後は「全体の調和」に資する選択をしたい。', axis: 'harmony' }
];

// タイプ判定ロジック
function determineType(answers) {
  // スコア集計
  const scores = {
    intuition: answers[2] || 0,        // Q2
    overview: answers[1] || 0,         // Q1
    empathy: answers[3] || 0,          // Q3
    creation: answers[5] || 0,         // Q5
    expression: answers[9] || 0,       // Q9
    support: answers[6] || 0,          // Q6
    freedom: answers[8] || 0,          // Q8
    harmony: answers[12] || 0,         // Q12
    change: answers[11] || 0,          // Q11
    sincerity: answers[10] || 0        // Q10
  };

  // 価値観スコア
  const values = {
    harmony: scores.harmony + scores.empathy,
    freedom: scores.freedom + scores.change,
    sincerity: scores.sincerity + scores.support
  };

  // タイプ判定（しきい値ベース）
  // 和の創造者（Harmony Creator）
  if (scores.intuition >= 4 && scores.overview >= 4 && scores.empathy >= 4 && values.harmony >= 8) {
    return 'harmonizer';
  }
  
  // 光の探究者（Vision Seeker）
  if (scores.intuition >= 4 && (scores.expression >= 4 || scores.creation >= 4) && values.freedom >= 7) {
    return 'explorer';
  }
  
  // 根の守り人（Ground Keeper）
  if (scores.support >= 4 && scores.sincerity >= 4 && values.sincerity >= 8) {
    return 'healer';
  }
  
  // 流れの旅人（Flow Messenger）
  if (scores.freedom >= 4 && scores.change >= 4 && scores.creation >= 3) {
    return 'reformer';
  }
  
  // 時の語り手（Eternal Weaver）
  if (scores.overview >= 4 && scores.expression >= 3 && scores.sincerity >= 4) {
    return 'guide';
  }

  // デフォルト：最もスコアが高い軸で判定
  const maxScore = Math.max(
    values.harmony,
    values.freedom,
    values.sincerity,
    scores.expression,
    scores.creation
  );

  if (maxScore === values.harmony) return 'harmonizer';
  if (maxScore === values.freedom) return 'explorer';
  if (maxScore === values.sincerity) return 'healer';
  if (maxScore === scores.creation) return 'reformer';
  return 'guide';
}

export default function Questionnaire({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // 最後の質問の場合
    if (currentQuestion === QUESTIONS.length - 1) {
      const typeId = determineType(newAnswers);
      // 回答を保存（深い対話の初期文脈に活用）
      try { localStorage.setItem('starpath.questionnaire.answers', JSON.stringify(newAnswers)); } catch {}
      setShowResult(true);
      setTimeout(() => {
        onComplete(typeId);
      }, 1500);
    } else {
      // 次の質問へ
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  if (showResult) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div className="stars-falling">✨</div>
        <h2>🌟 診断完了！</h2>
        <p className="sub">あなたのタイプを判定しています...</p>
      </div>
    );
  }

  return (
    <div className="questionnaire">
      {/* 進捗バー */}
      <div style={{ marginBottom: '2rem' }}>
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
          質問 {currentQuestion + 1} / {QUESTIONS.length}
        </p>
      </div>

      {/* 質問 */}
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
        <h3 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          {question.text}
        </h3>

        {/* 回答ボタン（1-5） */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
          onTouchStart={(e) => {
            // iOSでのクリック遅延やフォーカス暴発を防ぐための軽微な抑止
            e.stopPropagation();
          }}
        >
          {[1, 2, 3, 4, 5].map(value => (
            <button
              key={value}
              className="btn"
              onClick={() => handleAnswer(question.id, value)}
              style={{
                minWidth: '60px',
                padding: '0.8rem 1.2rem'
              }}
            >
              {value}
            </button>
          ))}
        </div>

        {/* ラベル */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: '1rem',
          fontSize: '0.85rem',
          color: 'var(--sub)'
        }}>
          <span>全く当てはまらない</span>
          <span>とても当てはまる</span>
        </div>
      </div>
    </div>
  );
}


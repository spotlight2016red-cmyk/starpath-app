import React, { useState } from 'react';

export default function PreDiagnosisGuide({ onComplete }) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step === 1) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  // ステップ1: 診断前のメッセージ
  if (step === 0) {
    return (
      <div className="pre-diagnosis-guide">
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            marginBottom: '1.5rem',
            color: 'var(--accent)',
            lineHeight: '1.4'
          }}>
            🌟 あなたは本当の自分に出逢う<br />入り口に立つはずです
          </h1>
          
          <div style={{
            padding: '1.5rem',
            background: 'rgba(143, 211, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid var(--line)',
            marginBottom: '2rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '1rem',
              color: 'var(--accent)'
            }}>
              推奨環境
            </h2>
            <ul style={{
              textAlign: 'left',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '1.2rem' }}>
                できるだけ1人で<br />
                静かな時間に
              </li>
              <li style={{ marginBottom: '1.2rem' }}>
                心を落ち着けて<br />
                リラックスした状態で
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                直感で答えることを<br />
                大切に
              </li>
            </ul>
          </div>

          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            marginBottom: '2rem',
            color: 'var(--text)'
          }}>
            呼吸を整え、本当の自分をイメージできたら<br />
            スタートしてください！
          </p>

          <button 
            onClick={handleNext}
            className="btn"
            style={{
              width: '100%',
              padding: '1.2rem',
              fontSize: '1.2rem',
              fontWeight: '600'
            }}
          >
            準備ができました
          </button>

          <button 
            onClick={handleSkip}
            style={{
              marginTop: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              fontSize: '1rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            スキップする
          </button>
        </div>
      </div>
    );
  }

  // ステップ2: 深呼吸ガイド
  return (
    <div className="pre-diagnosis-guide">
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '2rem',
          color: 'var(--accent)'
        }}>
          呼吸を整えましょう
        </h2>

        <div style={{
          padding: '2rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid var(--line)',
          marginBottom: '2rem'
        }}>
          <p style={{
            fontSize: '1.8rem',
            lineHeight: '2',
            marginBottom: '1rem',
            color: 'var(--text)'
          }}>
            吸って...
          </p>
          
          <p style={{
            fontSize: '1.8rem',
            lineHeight: '2',
            marginBottom: '1rem',
            color: 'var(--text)'
          }}>
            吐いて...
          </p>

          <p style={{
            fontSize: '1.8rem',
            lineHeight: '2',
            marginBottom: '1rem',
            color: 'var(--text)'
          }}>
            吸って...
          </p>

          <p style={{
            fontSize: '1.8rem',
            lineHeight: '2',
            marginBottom: '1rem',
            color: 'var(--text)'
          }}>
            吐いて...
          </p>
        </div>

        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
          color: 'var(--text)'
        }}>
          心の準備ができました
        </p>

        <button 
          onClick={handleNext}
          className="btn"
          style={{
            width: '100%',
            padding: '1.2rem',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}
        >
          診断を始める
        </button>
      </div>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import { MESSAGE_TONES } from '../data/companionMessages';

export default function CompanionMessage({ message, tone = 'gentle', onComplete, autoClose = true }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // フェードイン
    setTimeout(() => setIsVisible(true), 100);

    // 自動で閉じる
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onComplete && onComplete(), 500); // フェードアウト後にコールバック
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onComplete]);

  const toneStyle = MESSAGE_TONES[tone] || MESSAGE_TONES.gentle;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '2rem',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out'
    }}>
      <div style={{
        background: 'var(--panel)',
        border: `2px solid ${toneStyle.color}`,
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        transition: 'transform 0.5s ease-in-out'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          {toneStyle.icon}
        </div>

        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '1rem',
          color: toneStyle.color,
          lineHeight: '1.4'
        }}>
          {message.title}
        </h2>

        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.6',
          color: 'var(--text)',
          marginBottom: '1.5rem'
        }}>
          {message.message}
        </p>

        {!autoClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onComplete && onComplete(), 500);
            }}
            className="btn"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              background: toneStyle.color,
              color: 'var(--bg)'
            }}
          >
            次へ進む
          </button>
        )}
      </div>
    </div>
  );
}


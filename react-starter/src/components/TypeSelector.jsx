import React from 'react';
import { TYPE_LIST } from '../data/types';

export default function TypeSelector({ currentType, onTypeChange }) {
  return (
    <div className="row" style={{ justifyContent: 'space-between' }}>
      <div>
        <h1>🎉 次のステージへようこそ！</h1>
        <p className="sub">
          ここからは、<b>星の光</b>があなたを導きます。
        </p>
      </div>
      <div className="row">
        <span className="sub">タイプ：</span>
        <div style={{
          padding: '8px 12px',
          background: '#0f1a3a',
          border: '1px solid var(--line)',
          borderRadius: '10px',
          color: 'var(--text)',
          fontSize: '14px'
        }}>
          {currentType.name}（{currentType.zodiac}）
        </div>
      </div>
    </div>
  );
}





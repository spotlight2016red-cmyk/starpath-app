import React from 'react';

export default function UnlockCard({ currentType, onOpenVoices }) {
  return (
    <div>
      <h2>✨ 解放されました</h2>
      <p className="sub">
        新しい道が<b>星の光</b>に照らされました。
        あなたは <b>{currentType.title}（{currentType.zodiac}）</b> です。
      </p>
      <div className="row">
        <span className="badge">🌟 星の紋章（共通バッジ）</span>
        <button className="btn" onClick={onOpenVoices}>
          「あなたの光を映す声」を受け取る
        </button>
      </div>
    </div>
  );
}










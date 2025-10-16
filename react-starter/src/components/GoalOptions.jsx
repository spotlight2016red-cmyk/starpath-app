import React from 'react';

export default function GoalOptions({ unlocked, onGoDeeper, onReceive }) {
  return (
    <div>
      <h2>これからの選択肢</h2>
      <div className="options">
        <div className="option unlocked">
          <div>
            ① 一区切りにする
            <br />
            <span className="sub">今日の気づきを持って日常へ</span>
          </div>
          <button className="btn">進む</button>
        </div>

        <div className="option unlocked">
          <div>
            ② 旅を続ける
            <br />
            <span className="sub">更に自分を知るワークへ進む</span>
          </div>
          <button className="btn" onClick={onReceive}>更に知る</button>
        </div>

        <div className="option special">
          <div>
            ③ さらに深める {unlocked ? '✨' : ''}
            <br />
            <span className="sub">
              {unlocked ? (
                <>更に自分を深く知るステップへ</>
              ) : (
                <>
                  ※更に自分を知るワークをクリアすれば選択できます。🔒
                </>
              )}
            </span>
          </div>
          <button 
            className="btn" 
            disabled={!unlocked}
            onClick={onGoDeeper}
          >
            {unlocked ? '深める' : '解放待ち'}
          </button>
        </div>
      </div>
    </div>
  );
}


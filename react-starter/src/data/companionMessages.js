// 伴走メッセージの設定

export const COMPANION_MESSAGES = {
  // Q1の後
  afterQ1: {
    title: 'あなたの心の羅針盤が見えてきました',
    message: '次の質問に進みましょう。',
    tone: 'gentle'
  },
  
  // Q3の後（深掘り完了）
  afterQ3: {
    title: 'あなたの本質がはっきり見えてきました',
    message: 'もう少しだけ、深く見ていきましょう。',
    tone: 'encouraging'
  },
  
  // 最後の質問の後
  beforeResult: {
    title: 'あなたの星座が完成しました',
    message: '結果を見てみましょう。',
    tone: 'excited'
  },
  
  // タイプ別のメッセージ
  byType: {
    explorer: {
      title: 'あなたは探検者です',
      message: '新しい道を切り拓く力が、あなたの本質です。',
      tone: 'adventurous'
    },
    guide: {
      title: 'あなたは導き手です',
      message: '人を照らし、導く力が、あなたの本質です。',
      tone: 'inspiring'
    },
    healer: {
      title: 'あなたは癒し手です',
      message: '人を癒し、支える力が、あなたの本質です。',
      tone: 'caring'
    },
    reformer: {
      title: 'あなたは変革者です',
      message: '新しい風を呼び込む力が、あなたの本質です。',
      tone: 'revolutionary'
    },
    harmonizer: {
      title: 'あなたは調和者です',
      message: 'バランスを保ち、調和を生む力が、あなたの本質です。',
      tone: 'balanced'
    }
  }
};

// 伴走メッセージのトーン
export const MESSAGE_TONES = {
  gentle: {
    color: '#8fd3ff',
    icon: '💫',
    animation: 'fadeIn'
  },
  encouraging: {
    color: '#8fff8f',
    icon: '🌟',
    animation: 'fadeIn'
  },
  excited: {
    color: '#ffd48f',
    icon: '✨',
    animation: 'bounce'
  },
  adventurous: {
    color: '#ff8f8f',
    icon: '🚀',
    animation: 'slideIn'
  },
  inspiring: {
    color: '#ffd48f',
    icon: '💡',
    animation: 'fadeIn'
  },
  caring: {
    color: '#d48fff',
    icon: '💜',
    animation: 'fadeIn'
  },
  revolutionary: {
    color: '#8fff8f',
    icon: '⚡',
    animation: 'slideIn'
  },
  balanced: {
    color: '#8fd3ff',
    icon: '⚖️',
    animation: 'fadeIn'
  }
};

// 伴走メッセージの表示時間（ミリ秒）
export const MESSAGE_DISPLAY_TIME = 2000;

// 伴走メッセージのフェードイン/アウト時間（ミリ秒）
export const MESSAGE_FADE_TIME = 500;


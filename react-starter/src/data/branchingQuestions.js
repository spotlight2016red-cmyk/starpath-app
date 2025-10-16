// 分岐型質問システム

// 第1問（入り口・最重要）
export const Q1 = {
  id: 1,
  text: '新しい道を歩む時、あなたは何を頼りにしますか？',
  options: [
    {
      id: 'a',
      text: '直感と「これだ！」という感覚',
      branch: 'exploration' // 探索型
    },
    {
      id: 'b',
      text: '情熱と「やりたい！」という気持ち',
      branch: 'will' // 意志型
    },
    {
      id: 'c',
      text: '周りの人との調和やつながり',
      branch: 'harmony' // 調和型
    }
  ]
};

// 探索型の深掘り質問（開拓者 vs 変革者）
export const explorationQuestions = [
  {
    id: 2,
    text: '新しい挑戦をする時、あなたはどんな気持ちですか？',
    options: [
      { id: 'a', text: 'ワクワクして、早く始めたい！', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: '慎重に準備してから始めたい', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: 'その時々の気分で決める', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 3,
    text: '未知の世界に飛び込む時、あなたは？',
    options: [
      { id: 'a', text: '直感を信じて飛び込む', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: '少しずつ探りながら進む', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: '仲間と一緒に進む', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 4,
    text: '新しいアイデアが浮かんだ時、あなたは？',
    options: [
      { id: 'a', text: 'すぐに行動に移す', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: 'じっくり考えてから行動する', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: '人に相談してから決める', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 5,
    text: '新しい挑戦をする時、あなたはどんな気持ちになりますか？',
    options: [
      { id: 'a', text: 'ワクワクして、心が躍る', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: '落ち着いて、準備する', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 6,
    text: '未知の世界に飛び込む時、あなたは何を感じますか？',
    options: [
      { id: 'a', text: 'わくわくして、楽しみになる', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: '慎重に、少しずつ進む', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 7,
    text: '新しいアイデアが浮かんだ時、あなたはどうしますか？',
    options: [
      { id: 'a', text: 'すぐに行動に移す', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: 'じっくり考えてから行動する', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: '人に相談してから決める', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 8,
    text: '自由と自走を重んじる時、あなたは？',
    options: [
      { id: 'a', text: '自分のペースで進む', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: '周りと協力しながら進む', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: 'その時々で変わる', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 9,
    text: '変化の波にワクワクする時、あなたは？',
    options: [
      { id: 'a', text: '積極的に変化を求める', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: '慎重に変化を受け入れる', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: '自然と変化に順応する', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 10,
    text: '全体の流れを見てから行動する時、あなたは？',
    options: [
      { id: 'a', text: '直感で行動する', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: '分析してから行動する', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: 'その時々で変わる', score: { explorer: 2, reformer: 2 } }
    ]
  },
  {
    id: 11,
    text: '最後は「全体の調和」に資する選択をしたい時、あなたは？',
    options: [
      { id: 'a', text: '自分の直感を優先する', score: { explorer: 3, reformer: 1 } },
      { id: 'b', text: '周りのことを考える', score: { explorer: 1, reformer: 3 } },
      { id: 'c', text: 'バランスを取る', score: { explorer: 2, reformer: 2 } }
    ]
  }
];

// 意志型の深掘り質問（導き手を確定）
export const willQuestions = [
  {
    id: 2,
    text: '人を導く時、あなたはどんな気持ちですか？',
    options: [
      { id: 'a', text: '情熱が湧いてくる', score: { guide: 3 } },
      { id: 'b', text: '責任を感じる', score: { guide: 2 } },
      { id: 'c', text: '自然とそうなる', score: { guide: 3 } }
    ]
  },
  {
    id: 3,
    text: '目標に向かって進む時、あなたは？',
    options: [
      { id: 'a', text: '情熱を持って突き進む', score: { guide: 3 } },
      { id: 'b', text: '計画的に進める', score: { guide: 2 } },
      { id: 'c', text: '周りを巻き込んで進む', score: { guide: 3 } }
    ]
  },
  {
    id: 4,
    text: '人を励ます時、あなたは？',
    options: [
      { id: 'a', text: '情熱的に励ます', score: { guide: 3 } },
      { id: 'b', text: '優しく励ます', score: { guide: 2 } },
      { id: 'c', text: '具体的なアドバイスをする', score: { guide: 2 } }
    ]
  },
  {
    id: 5,
    text: '人を導く時、あなたはどんな気持ちになりますか？',
    options: [
      { id: 'a', text: '情熱が湧いてくる', score: { guide: 3 } },
      { id: 'b', text: '責任を感じる', score: { guide: 2 } },
      { id: 'c', text: '自然とそうなる', score: { guide: 3 } }
    ]
  },
  {
    id: 6,
    text: '目標に向かって進む時、あなたは何を感じますか？',
    options: [
      { id: 'a', text: '情熱を持って突き進む', score: { guide: 3 } },
      { id: 'b', text: '計画的に進める', score: { guide: 2 } },
      { id: 'c', text: '周りを巻き込んで進む', score: { guide: 3 } }
    ]
  },
  {
    id: 7,
    text: '人を励ます時、あなたはどうしますか？',
    options: [
      { id: 'a', text: '情熱的に励ます', score: { guide: 3 } },
      { id: 'b', text: '優しく励ます', score: { guide: 2 } },
      { id: 'c', text: '具体的なアドバイスをする', score: { guide: 2 } }
    ]
  },
  {
    id: 8,
    text: '人を照らし、導く時、あなたは？',
    options: [
      { id: 'a', text: '情熱を持って導く', score: { guide: 3 } },
      { id: 'b', text: '優しく導く', score: { guide: 2 } },
      { id: 'c', text: '具体的に導く', score: { guide: 2 } }
    ]
  },
  {
    id: 9,
    text: '人を巻き込む時、あなたは？',
    options: [
      { id: 'a', text: '情熱で巻き込む', score: { guide: 3 } },
      { id: 'b', text: '優しく巻き込む', score: { guide: 2 } },
      { id: 'c', text: '具体的に巻き込む', score: { guide: 2 } }
    ]
  },
  {
    id: 10,
    text: '全体を見渡す時、あなたは？',
    options: [
      { id: 'a', text: '情熱を持って見渡す', score: { guide: 3 } },
      { id: 'b', text: '冷静に見渡す', score: { guide: 2 } },
      { id: 'c', text: '具体的に見渡す', score: { guide: 2 } }
    ]
  },
  {
    id: 11,
    text: '最後は「全体の調和」に資する選択をしたい時、あなたは？',
    options: [
      { id: 'a', text: '情熱を持って選択する', score: { guide: 3 } },
      { id: 'b', text: '冷静に選択する', score: { guide: 2 } },
      { id: 'c', text: '具体的に選択する', score: { guide: 2 } }
    ]
  }
];

// 調和型の深掘り質問（癒し手 vs 調和者）
export const harmonyQuestions = [
  {
    id: 2,
    text: '人を支える時、あなたはどんな気持ちですか？',
    options: [
      { id: 'a', text: '優しく寄り添いたい', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: 'バランスを取りたい', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 3,
    text: '対立が起きた時、あなたは？',
    options: [
      { id: 'a', text: '優しく仲介する', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: 'バランスを取って解決する', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '冷静に分析する', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 4,
    text: '人とのつながりを感じる時、あなたは？',
    options: [
      { id: 'a', text: '心が温かくなる', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: '調和を感じる', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 5,
    text: '人を支える時、あなたはどんな気持ちになりますか？',
    options: [
      { id: 'a', text: '優しく寄り添いたい', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: 'バランスを取りたい', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 6,
    text: '対立が起きた時、あなたは何を感じますか？',
    options: [
      { id: 'a', text: '優しく仲介する', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: 'バランスを取って解決する', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '冷静に分析する', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 7,
    text: '人とのつながりを感じる時、あなたはどうしますか？',
    options: [
      { id: 'a', text: '心が温かくなる', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: '調和を感じる', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 8,
    text: '人を癒し、支える時、あなたは？',
    options: [
      { id: 'a', text: '優しく寄り添う', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: 'バランスを取る', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 9,
    text: '感情に敏感で共感力が高い時、あなたは？',
    options: [
      { id: 'a', text: '優しく寄り添う', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: 'バランスを取る', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 10,
    text: '静かな時間を大切にする時、あなたは？',
    options: [
      { id: 'a', text: '優しく寄り添う', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: 'バランスを取る', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { healer: 2, harmonizer: 2 } }
    ]
  },
  {
    id: 11,
    text: '最後は「全体の調和」に資する選択をしたい時、あなたは？',
    options: [
      { id: 'a', text: '優しく寄り添う', score: { healer: 3, harmonizer: 1 } },
      { id: 'b', text: 'バランスを取る', score: { healer: 1, harmonizer: 3 } },
      { id: 'c', text: '自然とそうなる', score: { healer: 2, harmonizer: 2 } }
    ]
  }
];

// 分岐に応じた質問を取得
export function getQuestionsByBranch(branch) {
  switch (branch) {
    case 'exploration':
      return explorationQuestions;
    case 'will':
      return willQuestions;
    case 'harmony':
      return harmonyQuestions;
    default:
      return [];
  }
}

// スコアからタイプを判定
export function determineTypeFromScores(scores) {
  const maxScore = Math.max(
    scores.explorer || 0,
    scores.guide || 0,
    scores.healer || 0,
    scores.reformer || 0,
    scores.harmonizer || 0
  );

  if (maxScore === (scores.explorer || 0)) return 'explorer';
  if (maxScore === (scores.guide || 0)) return 'guide';
  if (maxScore === (scores.healer || 0)) return 'healer';
  if (maxScore === (scores.reformer || 0)) return 'reformer';
  if (maxScore === (scores.harmonizer || 0)) return 'harmonizer';
  
  return 'guide';
}


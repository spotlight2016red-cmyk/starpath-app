// 統合判定ロジック（占星術 + 四柱推命 + 易学 + 質問）

import { getAstrologicalType } from './astrology';
import { getFourPillarsType } from './fourPillars';
import { getBaguaType } from './bagua';

// タイプの重み付け
const WEIGHTS = {
  astrological: 0.30,  // 占星術: 30%
  fourPillars: 0.30,   // 四柱推命: 30%
  bagua: 0.20,         // 易学: 20%
  questionnaire: 0.20  // 質問: 20%
};

// タイプのスコアを計算
function calculateTypeScores(astrologicalType, fourPillarsType, baguaType, questionnaireType) {
  const scores = {
    explorer: 0,
    guide: 0,
    healer: 0,
    reformer: 0,
    harmonizer: 0
  };

  // 占星術のスコア
  if (astrologicalType) scores[astrologicalType] += WEIGHTS.astrological;
  
  // 四柱推命のスコア
  if (fourPillarsType) scores[fourPillarsType] += WEIGHTS.fourPillars;
  
  // 易学のスコア
  if (baguaType) scores[baguaType] += WEIGHTS.bagua;
  
  // 質問のスコア
  if (questionnaireType) scores[questionnaireType] += WEIGHTS.questionnaire;

  return scores;
}

// 信頼度を計算
function calculateConfidence(scores) {
  const sortedScores = Object.values(scores).sort((a, b) => b - a);
  const maxScore = sortedScores[0];
  const secondMaxScore = sortedScores[1];
  
  // 最大スコアと2番目のスコアの差が大きいほど信頼度が高い
  const gap = maxScore - secondMaxScore;
  
  // 信頼度を計算（0-100%）
  const confidence = Math.min(95, Math.max(70, 70 + gap * 100));
  
  return Math.round(confidence);
}

// 統合判定
export function determineIntegratedType(birthDate, questionnaireAnswers) {
  // 各占術からタイプを取得
  const astrologicalType = getAstrologicalType(birthDate);
  const fourPillarsType = getFourPillarsType(birthDate);
  const baguaType = getBaguaType(birthDate);
  
  // 質問からタイプを取得（既存のロジックを使用）
  const questionnaireType = determineTypeFromQuestionnaire(questionnaireAnswers);
  
  // タイプのスコアを計算
  const scores = calculateTypeScores(
    astrologicalType,
    fourPillarsType,
    baguaType,
    questionnaireType
  );
  
  // 最もスコアが高いタイプを決定
  const finalType = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  // 信頼度を計算
  const confidence = calculateConfidence(scores);
  
  return {
    type: finalType,
    confidence,
    scores,
    details: {
      astrological: astrologicalType,
      fourPillars: fourPillarsType,
      bagua: baguaType,
      questionnaire: questionnaireType
    }
  };
}

// 質問からタイプを判定（既存のロジックを簡略化）
function determineTypeFromQuestionnaire(answers) {
  if (!answers) return 'guide';
  
  // スコア集計
  const scores = {
    intuition: answers[2] || 0,
    overview: answers[1] || 0,
    empathy: answers[3] || 0,
    creation: answers[5] || 0,
    expression: answers[9] || 0,
    support: answers[6] || 0,
    freedom: answers[8] || 0,
    harmony: answers[12] || 0,
    change: answers[11] || 0,
    sincerity: answers[10] || 0
  };

  // 価値観スコア
  const values = {
    harmony: scores.harmony + scores.empathy,
    freedom: scores.freedom + scores.change,
    sincerity: scores.sincerity + scores.support
  };

  // タイプ判定
  if (scores.intuition >= 4 && scores.overview >= 4 && scores.empathy >= 4 && values.harmony >= 8) {
    return 'harmonizer';
  }
  
  if (scores.intuition >= 4 && (scores.expression >= 4 || scores.creation >= 4) && values.freedom >= 7) {
    return 'explorer';
  }
  
  if (scores.support >= 4 && scores.sincerity >= 4 && values.sincerity >= 8) {
    return 'healer';
  }
  
  if (scores.freedom >= 4 && scores.change >= 4 && scores.creation >= 3) {
    return 'reformer';
  }
  
  if (scores.overview >= 4 && scores.expression >= 3 && scores.sincerity >= 4) {
    return 'guide';
  }

  // デフォルト
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

// 詳細な結果メッセージを生成
export function generateDetailedMessage(result, birthDate, questionnaireAnswers) {
  const { type, confidence, details } = result;
  
  const typeNames = {
    explorer: '探検者',
    guide: '導き手',
    healer: '癒し手',
    reformer: '変革者',
    harmonizer: '調和者'
  };
  
  const typeName = typeNames[type];
  
  return `
あなたは、**${confidence}%の精度**で「${typeName}」タイプです。

## 📊 判定の根拠

### 🌟 占星術
- 太陽星座: ${details.astrological}
- あなたの基本的な性格特性

### 🔮 四柱推命
- 五行のバランス: ${details.fourPillars}
- あなたの本質的なエネルギー

### ☯️ 易学
- 八卦の配置: ${details.bagua}
- あなたの人生の流れ

### 📝 12の質問
- 現在の状態: ${details.questionnaire}
- あなたの意識的な選択

## 🎯 あなたの特徴

${getTypeCharacteristics(type)}

## 🌟 あなたの強み

${getTypeStrengths(type)}

## 💡 次のステージで発揮できること

${getTypePotential(type)}
  `.trim();
}

// タイプ別の特徴
function getTypeCharacteristics(type) {
  const characteristics = {
    explorer: `
- 新しい道を切り拓く力が強い
- 自由と自走を重んじる
- 変化の波にワクワクできる
- 全体の流れを見ながら行動できる
    `,
    guide: `
- 人を照らし、導く力がある
- 情熱と信念を持って行動する
- 人を巻き込む力がある
- 全体を見渡す力がある
    `,
    healer: `
- 人を癒し、支える力がある
- 感情に敏感で共感力が高い
- 静かな時間を大切にする
- 人とのつながりを深める
    `,
    reformer: `
- 新しい風を呼び込む力がある
- 枠にない発想ができる
- 変化を恐れない
- イノベーションを起こす
    `,
    harmonizer: `
- バランスを保つ力がある
- 対立を和らげる力がある
- 全体の調和を大切にする
- 異なるものを繋げる力がある
    `
  };
  
  return characteristics[type] || '';
}

// タイプ別の強み
function getTypeStrengths(type) {
  const strengths = {
    explorer: `
- 直観力が鋭い
- 行動力がある
- 人を巻き込む力がある
- 新しい視点を持っている
    `,
    guide: `
- リーダーシップがある
- 人を励ます力がある
- 目標に向かって進める
- 情熱がある
    `,
    healer: `
- 共感力が高い
- 人を支える力がある
- 感情に敏感
- 静かな強さがある
    `,
    reformer: `
- 創造力がある
- 柔軟性がある
- 変化を楽しめる
- 新しいアイデアを生み出す
    `,
    harmonizer: `
- バランス感覚がある
- 調整力がある
- 全体を見渡せる
- 調和を生み出す
    `
  };
  
  return strengths[type] || '';
}

// タイプ別の可能性
function getTypePotential(type) {
  const potential = {
    explorer: `
- 新しいプロジェクトを立ち上げる
- チームを引っ張るリーダーシップ
- イノベーションを起こす
- 新しい道を切り拓く
    `,
    guide: `
- 人を導くリーダーシップ
- チームを鼓舞する
- 目標を達成する
- 人を照らす存在になる
    `,
    healer: `
- 人を支える存在になる
- 感情的なサポートを提供する
- 静かな強さで人を癒す
- 人とのつながりを深める
    `,
    reformer: `
- 新しいアイデアを実現する
- イノベーションを起こす
- 変化をリードする
- 新しい風を呼び込む
    `,
    harmonizer: `
- チームの調整役になる
- 対立を和らげる
- 全体の調和を生み出す
- 異なるものを繋げる
    `
  };
  
  return potential[type] || '';
}


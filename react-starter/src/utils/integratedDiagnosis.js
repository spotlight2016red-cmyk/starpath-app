// 統合診断システム（生年月日 + 質問 + 易学）

import { getAstrologicalDetails } from './astrology';
import { getFourPillarsDetails } from './fourPillars';
import { getBaguaFullDetails } from './bagua';

// 易の卦とタイプの対応
const HEXAGRAM_TO_TYPE = {
  '乾': 'explorer',    // 天 - 創造、開拓
  '離': 'guide',       // 火 - 光、導き
  '坎': 'healer',      // 水 - 癒し、流れ
  '震': 'reformer',    // 雷 - 変革、動き
  '兌': 'harmonizer'   // 沢 - 調和、喜び
};

// 五行とタイプの対応
const ELEMENT_TO_TYPE = {
  '木': 'explorer',    // 木 - 成長、探検
  '火': 'guide',       // 火 - 情熱、導き
  '水': 'healer',      // 水 - 癒し、支え
  '金': 'reformer',    // 金 - 変革、革新
  '土': 'harmonizer'   // 土 - 調和、安定
};

// 統合判定システム
export function performIntegratedDiagnosis(birthDate, questionnaireAnswers) {
  // 1. 占星術の判定
  const astroDetails = getAstrologicalDetails(birthDate);
  const astroType = astroDetails.type;
  
  // 2. 四柱推命の判定
  const fourPillarsDetails = getFourPillarsDetails(birthDate);
  const fourPillarsType = fourPillarsDetails.type;
  
  // 3. 易学の判定
  const baguaDetails = getBaguaFullDetails(birthDate);
  const baguaType = HEXAGRAM_TO_TYPE[baguaDetails.bagua] || 'guide';
  
  // 4. 質問の判定（簡易版）
  const questionnaireType = determineTypeFromQuestionnaire(questionnaireAnswers);
  
  // 5. 統合判定
  const integratedResult = integrateAllResults({
    astro: astroType,
    fourPillars: fourPillarsType,
    bagua: baguaType,
    questionnaire: questionnaireType
  });
  
  return {
    finalType: integratedResult.type,
    confidence: integratedResult.confidence,
    details: {
      astrological: astroDetails,
      fourPillars: fourPillarsDetails,
      bagua: baguaDetails,
      questionnaire: questionnaireType
    },
    reasoning: integratedResult.reasoning
  };
}

// 質問からタイプを判定（簡易版）
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

// すべての結果を統合
function integrateAllResults(results) {
  const { astro, fourPillars, bagua, questionnaire } = results;
  
  // タイプのスコア
  const typeScores = {
    explorer: 0,
    guide: 0,
    healer: 0,
    reformer: 0,
    harmonizer: 0
  };
  
  // 重み付け
  const weights = {
    astro: 0.30,
    fourPillars: 0.30,
    bagua: 0.20,
    questionnaire: 0.20
  };
  
  // スコアを集計
  typeScores[astro] += weights.astro;
  typeScores[fourPillars] += weights.fourPillars;
  typeScores[bagua] += weights.bagua;
  typeScores[questionnaire] += weights.questionnaire;
  
  // 最もスコアが高いタイプを決定
  const finalType = Object.keys(typeScores).reduce((a, b) => 
    typeScores[a] > typeScores[b] ? a : b
  );
  
  // 信頼度を計算
  const maxScore = typeScores[finalType];
  const secondMaxScore = Math.max(
    ...Object.values(typeScores).filter(score => score !== maxScore)
  );
  
  const gap = maxScore - secondMaxScore;
  const confidence = Math.min(95, Math.max(70, 70 + gap * 100));
  
  // 根拠を生成
  const reasoning = generateReasoning(results, finalType, confidence);
  
  return {
    type: finalType,
    confidence: Math.round(confidence),
    reasoning
  };
}

// 根拠を生成
function generateReasoning(results, finalType, confidence) {
  const { astro, fourPillars, bagua, questionnaire } = results;
  
  const typeNames = {
    explorer: '探検者',
    guide: '導き手',
    healer: '癒し手',
    reformer: '変革者',
    harmonizer: '調和者'
  };
  
  const typeName = typeNames[finalType];
  
  let reasoning = `あなたは、**${confidence}%の精度**で「${typeName}」タイプです。\n\n`;
  
  reasoning += `## 📊 判定の根拠\n\n`;
  
  reasoning += `### 🌟 占星術\n`;
  reasoning += `- 太陽星座: ${astro}\n`;
  reasoning += `- あなたの基本的な性格特性\n\n`;
  
  reasoning += `### 🔮 四柱推命\n`;
  reasoning += `- 五行のバランス: ${fourPillars}\n`;
  reasoning += `- あなたの本質的なエネルギー\n\n`;
  
  reasoning += `### ☯️ 易学\n`;
  reasoning += `- 八卦の配置: ${bagua}\n`;
  reasoning += `- あなたの人生の流れ\n\n`;
  
  reasoning += `### 📝 12の質問\n`;
  reasoning += `- 現在の状態: ${questionnaire}\n`;
  reasoning += `- あなたの意識的な選択\n\n`;
  
  return reasoning;
}

// 易学の深い解釈
export function getDeepInterpretation(diagnosisResult) {
  const { finalType, details } = diagnosisResult;
  
  const interpretations = {
    explorer: {
      hexagram: '乾（天）',
      element: '木',
      meaning: '創造と開拓の力。新しい道を切り拓く天のエネルギーが、あなたの本質です。',
      advice: '直感を信じて、新しい挑戦を恐れずに進んでください。あなたの探求心が、新しい世界を切り拓きます。'
    },
    guide: {
      hexagram: '離（火）',
      element: '火',
      meaning: '光と導きの力。人を照らし、導く火のエネルギーが、あなたの本質です。',
      advice: 'あなたの情熱と信念で、周りの人を照らしてください。あなたの導きが、多くの人の道を明るくします。'
    },
    healer: {
      hexagram: '坎（水）',
      element: '水',
      meaning: '癒しと支えの力。人を癒し、支える水のエネルギーが、あなたの本質です。',
      advice: 'あなたの優しさと共感力で、周りの人を支えてください。あなたの癒しが、多くの人の心を温めます。'
    },
    reformer: {
      hexagram: '震（雷）',
      element: '金',
      meaning: '変革と革新の力。新しい風を呼び込む雷のエネルギーが、あなたの本質です。',
      advice: 'あなたの創造力と柔軟性で、新しい風を呼び込んでください。あなたの変革が、世界をより良くします。'
    },
    harmonizer: {
      hexagram: '兌（沢）',
      element: '土',
      meaning: '調和と安定の力。バランスを保ち、調和を生む土のエネルギーが、あなたの本質です。',
      advice: 'あなたのバランス感覚と調整力で、周りの調和を保ってください。あなたの調和が、世界をより平和にします。'
    }
  };
  
  return interpretations[finalType] || interpretations.guide;
}


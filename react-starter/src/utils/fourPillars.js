// 四柱推命の計算ロジック

// 天干地支のマッピング
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行のマッピング
const FIVE_ELEMENTS = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土',
  '庚': '金', '辛': '金', '壬': '水', '癸': '水',
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 陰陽のマッピング
const YIN_YANG = {
  '甲': '陽', '乙': '陰', '丙': '陽', '丁': '陰', '戊': '陽', '己': '陰',
  '庚': '陽', '辛': '陰', '壬': '陽', '癸': '陰',
  '子': '陽', '丑': '陰', '寅': '陽', '卯': '陰', '辰': '陽', '巳': '陰',
  '午': '陽', '未': '陰', '申': '陽', '酉': '陰', '戌': '陽', '亥': '陰'
};

// 四柱推命の計算
export function calculateFourPillars(birthDate) {
  const { year, month, day, hour } = birthDate;
  
  // 年柱の計算
  const yearStem = HEAVENLY_STEMS[(year - 4) % 10];
  const yearBranch = EARTHLY_BRANCHES[(year - 4) % 12];
  
  // 月柱の計算（簡易版）
  const monthStem = HEAVENLY_STEMS[(year * 12 + month - 1) % 10];
  const monthBranch = EARTHLY_BRANCHES[(month - 1) % 12];
  
  // 日柱の計算（簡易版）
  const dayStem = HEAVENLY_STEMS[(year * 365 + month * 30 + day) % 10];
  const dayBranch = EARTHLY_BRANCHES[(year * 365 + month * 30 + day) % 12];
  
  // 時柱の計算（簡易版）
  const h = hour || 12;
  const timeBranch = EARTHLY_BRANCHES[Math.floor(h / 2) % 12];
  const timeStem = HEAVENLY_STEMS[(day * 12 + Math.floor(h / 2)) % 10];
  
  return {
    year: { stem: yearStem, branch: yearBranch },
    month: { stem: monthStem, branch: monthBranch },
    day: { stem: dayStem, branch: dayBranch },
    hour: { stem: timeStem, branch: timeBranch }
  };
}

// 五行のバランスを計算
export function calculateFiveElements(pillars) {
  const elements = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0
  };

  // 四柱の天干地支から五行を集計
  for (const pillar of Object.values(pillars)) {
    elements[FIVE_ELEMENTS[pillar.stem]]++;
    elements[FIVE_ELEMENTS[pillar.branch]]++;
  }

  return elements;
}

// 陰陽のバランスを計算
export function calculateYinYang(pillars) {
  const yinYang = {
    yin: 0,
    yang: 0
  };

  // 四柱の天干地支から陰陽を集計
  for (const pillar of Object.values(pillars)) {
    yinYang[YIN_YANG[pillar.stem]]++;
    yinYang[YIN_YANG[pillar.branch]]++;
  }

  return yinYang;
}

// 四柱推命からタイプを判定
export function getFourPillarsType(birthDate) {
  const pillars = calculateFourPillars(birthDate);
  const fiveElements = calculateFiveElements(pillars);
  const yinYang = calculateYinYang(pillars);
  
  // 五行のバランスからタイプを判定
  const maxElement = Object.keys(fiveElements).reduce((a, b) => 
    fiveElements[a] > fiveElements[b] ? a : b
  );
  
  const typeMap = {
    'wood': 'explorer',    // 木 = 探検者
    'fire': 'guide',       // 火 = 導き手
    'earth': 'harmonizer', // 土 = 調和者
    'metal': 'reformer',   // 金 = 変革者
    'water': 'healer'      // 水 = 癒し手
  };

  return typeMap[maxElement] || 'guide';
}

// 四柱推命の詳細情報を取得
export function getFourPillarsDetails(birthDate) {
  const pillars = calculateFourPillars(birthDate);
  const fiveElements = calculateFiveElements(pillars);
  const yinYang = calculateYinYang(pillars);
  
  return {
    pillars,
    fiveElements,
    yinYang,
    type: getFourPillarsType(birthDate)
  };
}


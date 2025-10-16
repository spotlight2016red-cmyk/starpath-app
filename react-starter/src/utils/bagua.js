// 易学（八卦）の計算ロジック

// 八卦のマッピング
const BAGUA = ['乾', '兌', '離', '震', '巽', '坎', '艮', '坤'];

// 八卦の意味
const BAGUA_MEANINGS = {
  '乾': { element: '金', nature: '天', attribute: '創造' },
  '兌': { element: '金', nature: '沢', attribute: '喜び' },
  '離': { element: '火', nature: '火', attribute: '明るさ' },
  '震': { element: '木', nature: '雷', attribute: '動き' },
  '巽': { element: '木', nature: '風', attribute: '柔軟' },
  '坎': { element: '水', nature: '水', attribute: '深さ' },
  '艮': { element: '土', nature: '山', attribute: '安定' },
  '坤': { element: '土', nature: '地', attribute: '受容' }
};

// 八卦の計算（簡易版）
export function calculateBagua(birthDate) {
  const { year, month, day, hour } = birthDate;
  
  // 生年月日時から八卦を計算
  const sum = year + month + day + (hour || 12);
  const baguaIndex = sum % 8;
  
  return BAGUA[baguaIndex];
}

// 八卦の詳細情報を取得
export function getBaguaDetails(birthDate) {
  const bagua = calculateBagua(birthDate);
  const meaning = BAGUA_MEANINGS[bagua];
  
  return {
    bagua,
    element: meaning.element,
    nature: meaning.nature,
    attribute: meaning.attribute
  };
}

// 八卦からタイプを判定
export function getBaguaType(birthDate) {
  const bagua = calculateBagua(birthDate);
  const meaning = BAGUA_MEANINGS[bagua];
  
  // 五行からタイプを判定
  const typeMap = {
    '木': 'explorer',    // 木 = 探検者
    '火': 'guide',       // 火 = 導き手
    '土': 'harmonizer',  // 土 = 調和者
    '金': 'reformer',    // 金 = 変革者
    '水': 'healer'       // 水 = 癒し手
  };

  return typeMap[meaning.element] || 'guide';
}

// 易経の卦を計算（簡易版）
export function calculateHexagram(birthDate) {
  const { year, month, day, hour } = birthDate;
  
  // 生年月日時から卦を計算
  const sum = year + month + day + (hour || 12);
  const hexagramNumber = (sum % 64) + 1;
  
  return {
    number: hexagramNumber,
    name: `${hexagramNumber}卦`
  };
}

// 易学の詳細情報を取得
export function getBaguaFullDetails(birthDate) {
  const bagua = calculateBagua(birthDate);
  const meaning = BAGUA_MEANINGS[bagua];
  const hexagram = calculateHexagram(birthDate);
  
  return {
    bagua,
    element: meaning.element,
    nature: meaning.nature,
    attribute: meaning.attribute,
    hexagram: hexagram.number,
    type: getBaguaType(birthDate)
  };
}


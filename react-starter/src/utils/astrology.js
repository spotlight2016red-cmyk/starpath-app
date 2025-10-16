// 占星術の計算ロジック

// 太陽星座の計算
export function getSunSign(birthDate) {
  const { month, day } = birthDate;
  const date = new Date(2000, month - 1, day);
  
  // 星座の境界日
  const signs = [
    { name: '牡羊座', start: new Date(2000, 2, 21), end: new Date(2000, 3, 20) },
    { name: '牡牛座', start: new Date(2000, 3, 21), end: new Date(2000, 4, 20) },
    { name: '双子座', start: new Date(2000, 4, 21), end: new Date(2000, 5, 21) },
    { name: '蟹座', start: new Date(2000, 5, 22), end: new Date(2000, 6, 22) },
    { name: '獅子座', start: new Date(2000, 6, 23), end: new Date(2000, 7, 22) },
    { name: '乙女座', start: new Date(2000, 7, 23), end: new Date(2000, 8, 22) },
    { name: '天秤座', start: new Date(2000, 8, 23), end: new Date(2000, 9, 23) },
    { name: '蠍座', start: new Date(2000, 9, 24), end: new Date(2000, 10, 22) },
    { name: '射手座', start: new Date(2000, 10, 23), end: new Date(2000, 11, 21) },
    { name: '山羊座', start: new Date(2000, 11, 22), end: new Date(2001, 0, 19) },
    { name: '水瓶座', start: new Date(2001, 0, 20), end: new Date(2001, 1, 18) },
    { name: '魚座', start: new Date(2001, 1, 19), end: new Date(2001, 2, 20) }
  ];

  for (const sign of signs) {
    if (date >= sign.start && date <= sign.end) {
      return sign.name;
    }
  }

  return '牡羊座'; // デフォルト
}

// 月星座の計算（簡易版）
export function getMoonSign(birthDate) {
  const { year, month, day, hour, minute } = birthDate;
  const date = new Date(year, month - 1, day, hour || 12, minute || 0);
  
  // 月の周期は約29.5日なので、簡易計算
  const daysSinceNewMoon = (date.getTime() - new Date(2000, 0, 6).getTime()) / (1000 * 60 * 60 * 24);
  const moonCycle = daysSinceNewMoon % 29.5;
  const signIndex = Math.floor((moonCycle / 29.5) * 12);
  
  const signs = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', 
                 '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'];
  
  return signs[signIndex];
}

// 上昇星座の計算（簡易版）
export function getRisingSign(birthDate) {
  const { month, hour } = birthDate;
  const h = hour || 12;
  
  // 上昇星座は出生時刻によって変わる（簡易計算）
  const risingSignIndex = (month - 1 + Math.floor(h / 2)) % 12;
  const signs = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', 
                 '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'];
  
  return signs[risingSignIndex];
}

// 水星の星座（思考・コミュニケーション）
export function getMercurySign(birthDate) {
  const { month } = birthDate;
  const signs = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', 
                 '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'];
  return signs[(month - 1 + 1) % 12];
}

// 金星の星座（愛情・価値観）
export function getVenusSign(birthDate) {
  const { month } = birthDate;
  const signs = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', 
                 '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'];
  return signs[(month - 1 + 2) % 12];
}

// 火星の星座（行動力・情熱）
export function getMarsSign(birthDate) {
  const { month } = birthDate;
  const signs = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', 
                 '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'];
  return signs[(month - 1 + 3) % 12];
}

// 木星の星座（拡大・成長）
export function getJupiterSign(birthDate) {
  const { month } = birthDate;
  const signs = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', 
                 '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'];
  return signs[(month - 1 + 4) % 12];
}

// 土星の星座（制限・責任）
export function getSaturnSign(birthDate) {
  const { month } = birthDate;
  const signs = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', 
                 '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'];
  return signs[(month - 1 + 5) % 12];
}

// 占星術からタイプを判定
export function getAstrologicalType(birthDate) {
  const sunSign = getSunSign(birthDate);
  
  // 太陽星座からタイプを判定
  const typeMap = {
    '射手座': 'explorer',
    '獅子座': 'guide',
    '魚座': 'healer',
    '水瓶座': 'reformer',
    '天秤座': 'harmonizer'
  };

  return typeMap[sunSign] || 'guide';
}

// 占星術の詳細情報を取得
export function getAstrologicalDetails(birthDate) {
  return {
    sun: getSunSign(birthDate),
    moon: getMoonSign(birthDate),
    rising: getRisingSign(birthDate),
    mercury: getMercurySign(birthDate),
    venus: getVenusSign(birthDate),
    mars: getMarsSign(birthDate),
    jupiter: getJupiterSign(birthDate),
    saturn: getSaturnSign(birthDate),
    type: getAstrologicalType(birthDate)
  };
}


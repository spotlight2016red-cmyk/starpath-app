// 各星座の星の配置パターン（パーセンテージ）
export const CONSTELLATION_PATTERNS = {
  explorer: {
    // 射手座（弓矢の形）
    stars: [
      { x: 20, y: 65, size: 8 },  // 弓の下部
      { x: 35, y: 50, size: 10 }, // 弓の中央
      { x: 25, y: 35, size: 8 },  // 弓の上部
      { x: 55, y: 45, size: 8 },  // 矢の中央
      { x: 75, y: 40, size: 10 }, // 矢の先端
    ],
    connections: [
      { from: 0, to: 1 }, // 弓の下→中央
      { from: 1, to: 2 }, // 弓の中央→上
      { from: 1, to: 3 }, // 弓→矢
      { from: 3, to: 4 }, // 矢の中央→先端
    ]
  },
  guide: {
    // 獅子座（横向きの獅子の形）
    stars: [
      { x: 20, y: 50, size: 10 }, // 頭部
      { x: 15, y: 40, size: 8 },  // たてがみ上
      { x: 10, y: 60, size: 8 },  // たてがみ下
      { x: 5, y: 70, size: 8 },   // 前足
      { x: 35, y: 55, size: 10 }, // 胴体中央
      { x: 50, y: 50, size: 8 },  // 胴体後部
      { x: 60, y: 65, size: 8 },  // 後ろ足
      { x: 75, y: 45, size: 8 },  // しっぽ
    ],
    connections: [
      { from: 0, to: 1 }, // 頭部→たてがみ上
      { from: 0, to: 2 }, // 頭部→たてがみ下
      { from: 0, to: 3 }, // 頭部→前足
      { from: 3, to: 4 }, // 前足→胴体中央
      { from: 4, to: 5 }, // 胴体中央→胴体後部
      { from: 5, to: 6 }, // 胴体後部→後ろ足
      { from: 5, to: 7 }, // 胴体後部→しっぽ
    ]
  },
  healer: {
    // 魚座（2匹の魚）
    stars: [
      { x: 25, y: 40, size: 10 }, // 左の魚
      { x: 30, y: 55, size: 8 },  // 左の魚の尾
      { x: 50, y: 50, size: 8 },  // 中央（紐）
      { x: 70, y: 45, size: 8 },  // 右の魚の頭
      { x: 75, y: 60, size: 10 }, // 右の魚
    ],
    connections: [
      { from: 0, to: 1 }, // 左の魚
      { from: 0, to: 2 }, // 左→中央
      { from: 2, to: 3 }, // 中央→右
      { from: 3, to: 4 }, // 右の魚
    ]
  },
  reformer: {
    // 水瓶座（水を注ぐ形）
    stars: [
      { x: 40, y: 30, size: 10 }, // 瓶の上部
      { x: 45, y: 45, size: 8 },  // 瓶の下部
      { x: 50, y: 60, size: 8 },  // 水の流れ1
      { x: 60, y: 70, size: 8 },  // 水の流れ2
      { x: 70, y: 75, size: 10 }, // 水の最下部
    ],
    connections: [
      { from: 0, to: 1 }, // 瓶
      { from: 1, to: 2 }, // 水の流れ
      { from: 2, to: 3 },
      { from: 3, to: 4 },
    ]
  }
};

// タイプIDから星座パターンを取得
export function getConstellationPattern(typeId) {
  return CONSTELLATION_PATTERNS[typeId] || CONSTELLATION_PATTERNS.guide;
}


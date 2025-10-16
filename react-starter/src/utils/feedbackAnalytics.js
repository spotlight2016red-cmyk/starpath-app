/**
 * フィードバック分析ユーティリティ
 * 
 * 開発者コンソールで以下を実行：
 * import { getFeedbackStats } from './utils/feedbackAnalytics';
 * getFeedbackStats();
 */

export function getFeedbackStats() {
  const feedbacks = JSON.parse(localStorage.getItem('starpath_feedbacks') || '[]');
  
  if (feedbacks.length === 0) {
    console.log('📊 まだフィードバックデータがありません');
    return null;
  }

  // タイプ別の集計
  const statsByType = {};
  const feedbackCounts = { good: 0, ok: 0, bad: 0 };

  feedbacks.forEach(fb => {
    // 全体集計
    feedbackCounts[fb.feedback]++;

    // タイプ別集計
    if (!statsByType[fb.typeId]) {
      statsByType[fb.typeId] = {
        typeName: fb.typeName,
        count: 0,
        good: 0,
        ok: 0,
        bad: 0
      };
    }
    statsByType[fb.typeId].count++;
    statsByType[fb.typeId][fb.feedback]++;
  });

  // 結果表示
  console.log('📊 StarPath フィードバック統計');
  console.log('='.repeat(50));
  console.log(`総フィードバック数: ${feedbacks.length}`);
  console.log('');
  
  console.log('【全体】');
  console.log(`👍 ぴったり: ${feedbackCounts.good} (${((feedbackCounts.good / feedbacks.length) * 100).toFixed(1)}%)`);
  console.log(`😐 まあまあ: ${feedbackCounts.ok} (${((feedbackCounts.ok / feedbacks.length) * 100).toFixed(1)}%)`);
  console.log(`👎 違う: ${feedbackCounts.bad} (${((feedbackCounts.bad / feedbacks.length) * 100).toFixed(1)}%)`);
  console.log('');

  console.log('【タイプ別】');
  Object.values(statsByType).forEach(stat => {
    const accuracy = ((stat.good / stat.count) * 100).toFixed(1);
    console.log(`${stat.typeName}: ${stat.count}件 (精度: ${accuracy}%)`);
    console.log(`  👍 ${stat.good} / 😐 ${stat.ok} / 👎 ${stat.bad}`);
  });
  console.log('='.repeat(50));

  return {
    total: feedbacks.length,
    feedbackCounts,
    statsByType,
    rawData: feedbacks
  };
}

export function clearFeedbacks() {
  if (confirm('すべてのフィードバックデータを削除しますか？')) {
    localStorage.removeItem('starpath_feedbacks');
    console.log('✅ フィードバックデータを削除しました');
  }
}

export function exportFeedbacks() {
  const feedbacks = JSON.parse(localStorage.getItem('starpath_feedbacks') || '[]');
  const dataStr = JSON.stringify(feedbacks, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `starpath-feedbacks-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  console.log('✅ フィードバックデータをエクスポートしました');
}

// グローバルに公開（開発用）
if (typeof window !== 'undefined') {
  window.starpathAnalytics = {
    getStats: getFeedbackStats,
    clear: clearFeedbacks,
    export: exportFeedbacks
  };
  console.log('💡 開発者向け: window.starpathAnalytics でフィードバック分析ができます');
}


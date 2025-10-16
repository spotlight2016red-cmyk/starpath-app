// 音声再生ユーティリティ

let audioContext = null;

// 簡易的なチーン音を生成（Web Audio API使用）
export function playChimeSound() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const now = audioContext.currentTime;
    
    // オシレーター（音源）を作成
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // 周波数設定（C6音 = 1046.5Hz あたり）
    oscillator.frequency.setValueAtTime(1046.5, now);
    
    // 音量エンベロープ（ADSR）
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5); // Decay
    
    // 接続
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // 再生
    oscillator.start(now);
    oscillator.stop(now + 1.5);

    return true;
  } catch (error) {
    console.warn('Audio playback not supported:', error);
    return false;
  }
}

// 初期化（ユーザー操作で最初に呼び出す）
export function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // resumeでユーザー操作後にコンテキストをアクティブ化
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}



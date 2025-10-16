import React, { useEffect, useState } from 'react';
import { DEFAULT_TYPE, TYPES } from './data/types';
import Questionnaire from './components/Questionnaire';
import TypeSelector from './components/TypeSelector';
import GoalOptions from './components/GoalOptions';
import DeepInteraction from './components/DeepInteraction';
import ConstellationProgress from './components/ConstellationProgress';
import ProgressiveMessage from './components/ProgressiveMessage';
import ShareFlow from './components/ShareFlow';
import FlowDesigner from './components/FlowDesigner';
import SharedFeedbackPage from './components/SharedFeedbackPage';
import BirthDateInput from './components/BirthDateInput';
import PreDiagnosisGuide from './components/PreDiagnosisGuide';
import BranchingQuestionnaire from './components/BranchingQuestionnaire';
import DiagnosisResult from './components/DiagnosisResult';
import './utils/feedbackAnalytics'; // フィードバック分析ツールを読み込み
import './styles.css';

export default function App() {
  // URLパラメータをチェック
  const urlParams = new URLSearchParams(window.location.search);
  const shareId = urlParams.get('share');
  const isSharedView = !!shareId;
  
  const [showPreDiagnosisGuide, setShowPreDiagnosisGuide] = useState(!isSharedView);
  const [showBirthDateInput, setShowBirthDateInput] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [currentType, setCurrentType] = useState(DEFAULT_TYPE);
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [showShareFlow, setShowShareFlow] = useState(false);
  const [showConstellationProgress, setShowConstellationProgress] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [showDeepInteraction, setShowDeepInteraction] = useState(false);
  const [deepInteractionResult, setDeepInteractionResult] = useState(null);
  const [showFlowDesigner, setShowFlowDesigner] = useState(false);
  const [showSharedFeedbackForm, setShowSharedFeedbackForm] = useState(isSharedView);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showSlotsPanel, setShowSlotsPanel] = useState(false);
  const [slots, setSlots] = useState({});
  const [newSlotName, setNewSlotName] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [lastSavedSlot, setLastSavedSlot] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [birthDate, setBirthDate] = useState(null);

  // 進行状況の復元（共有リンクビュー以外）
  useEffect(() => {
    if (isSharedView) return;
    try {
      const saved = JSON.parse(localStorage.getItem('starpath.app.state') || 'null');
      if (saved) {
        setShowQuestionnaire(!!saved.showQuestionnaire === false ? false : saved.showQuestionnaire);
        if (saved.currentType && saved.currentType.id) setCurrentType(saved.currentType);
        if (typeof saved.progress === 'number') setProgress(saved.progress);
        if (typeof saved.unlocked === 'boolean') setUnlocked(saved.unlocked);
        if (typeof saved.showShareFlow === 'boolean') setShowShareFlow(saved.showShareFlow);
        if (typeof saved.showDeepInteraction === 'boolean') setShowDeepInteraction(saved.showDeepInteraction);
        if (saved.deepInteractionResult) setDeepInteractionResult(saved.deepInteractionResult);
      }

      // 共有待機の状態があれば、共有フローを自動表示
      const shareSaved = JSON.parse(localStorage.getItem('starpath.share.state') || 'null');
      if (shareSaved && shareSaved.shareId) {
        setShowShareFlow(true);
        setShowQuestionnaire(false);
      }
      // スロットの読み込み
      const slotsRaw = JSON.parse(localStorage.getItem('starpath.save.slots') || '{}');
      setSlots(slotsRaw);
      
      // 最後に保存したスロット名を復元
      const lastSlot = localStorage.getItem('starpath.lastSavedSlot');
      if (lastSlot) setLastSavedSlot(lastSlot);
    } catch {}
  }, []); // 初回のみ実行

  // 進行状況の保存
  useEffect(() => {
    if (isSharedView) return;
    const snapshot = {
      showQuestionnaire,
      currentType,
      progress,
      unlocked,
      showShareFlow,
      showDeepInteraction,
      deepInteractionResult
    };
    try {
      localStorage.setItem('starpath.app.state', JSON.stringify(snapshot));
    } catch {}
  }, [isSharedView, showQuestionnaire, currentType, progress, unlocked, showShareFlow, showDeepInteraction, deepInteractionResult]);

  const handlePreDiagnosisComplete = () => {
    setShowPreDiagnosisGuide(false);
    setShowBirthDateInput(true);
  };

  const handleBirthDateComplete = (date) => {
    setBirthDate(date);
    setShowBirthDateInput(false);
    setShowQuestionnaire(true);
  };

  const handleQuestionnaireComplete = (typeId) => {
    const detectedType = TYPES[typeId];
    setCurrentType(detectedType);
    setShowQuestionnaire(false);
  };

  const handleBranchingQuestionnaireComplete = (typeId) => {
    const detectedType = TYPES[typeId];
    setCurrentType(detectedType);
    setShowQuestionnaire(false);
  };

  const handleProgress = (step) => {
    setProgress(step);
  };

  const handleShareComplete = (feedbackData) => {
    setFeedbacks(feedbackData);
    // ShareFlowは残したまま、ConstellationProgressを表示
    setProgress(3);
    // 星座の進捗を表示
    setShowConstellationProgress(true);
    
    // スクロールは不要（ShareFlowのボタンから制御）
  };

  // 「更に知る」で深い対話へ
  const handleScrollToProgress = () => {
    setShowDeepInteraction(true);
    setTimeout(() => {
      const deepCard = document.querySelector('.card:last-child');
      if (deepCard) {
        deepCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // 「深める」で共有フローへ
  const handleGoDeeper = () => {
    setShowShareFlow(true);
    setTimeout(() => {
      const cards = document.querySelectorAll('.card');
      const shareCard = Array.from(cards).find(card => 
        card.textContent.includes('診断を共有して感想をもらう')
      );
      if (shareCard) {
        shareCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  const handleDeepInteractionComplete = (result) => {
    setDeepInteractionResult(result);
    setShowDeepInteraction(false);
    // 深い対話完了で③さらに深めるを解放
    setUnlocked(true);
    
    setTimeout(() => {
      const cards = document.querySelectorAll('.card');
      const deepRecordCard = Array.from(cards).find(card => 
        card.textContent.includes('深い対話の記録')
      );
      if (deepRecordCard) {
        deepRecordCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // ホームへ（進捗リセット）
  const handleGoHome = () => {
    // 保存は残したままホームへ
    window.location.href = window.location.origin;
  };

  // 完全リセット
  const handleReset = () => {
    try {
      localStorage.removeItem('starpath.app.state');
      localStorage.removeItem('starpath.share.state');
    } catch {}
    window.location.href = window.location.origin;
  };

  // 保存ボタン：選択肢を表示
  const handleSave = () => {
    setShowSaveOptions(true);
    setShowMenu(false);
  };

  // スロット関連
  const refreshSlots = () => {
    try {
      setSlots(JSON.parse(localStorage.getItem('starpath.save.slots') || '{}'));
    } catch { setSlots({}); }
  };

  const saveToSlot = (slotName) => {
    if (!slotName) return;
    try {
      const appState = {
        showQuestionnaire,
        currentType,
        progress,
        unlocked,
        showShareFlow,
        showDeepInteraction,
        deepInteractionResult
      };
      const shareState = JSON.parse(localStorage.getItem('starpath.share.state') || 'null');
      const all = JSON.parse(localStorage.getItem('starpath.save.slots') || '{}');
      all[slotName] = { appState, shareState, savedAt: new Date().toISOString() };
      localStorage.setItem('starpath.save.slots', JSON.stringify(all));
      
      // 最後に保存したスロット名を記録
      setLastSavedSlot(slotName);
      localStorage.setItem('starpath.lastSavedSlot', slotName);
      
      setNewSlotName('');
      refreshSlots();
      
      // 保存完了トーストを表示
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2000);
    } catch {}
  };

  const loadFromSlot = (slotName) => {
    try {
      const all = JSON.parse(localStorage.getItem('starpath.save.slots') || '{}');
      const slot = all[slotName];
      if (!slot) return;
      const a = slot.appState || {};
      setShowQuestionnaire(!!a.showQuestionnaire);
      if (a.currentType) setCurrentType(a.currentType);
      if (typeof a.progress === 'number') setProgress(a.progress);
      if (typeof a.unlocked === 'boolean') setUnlocked(a.unlocked);
      if (typeof a.showShareFlow === 'boolean') setShowShareFlow(a.showShareFlow);
      if (typeof a.showDeepInteraction === 'boolean') setShowDeepInteraction(a.showDeepInteraction);
      if (a.deepInteractionResult) setDeepInteractionResult(a.deepInteractionResult);

      if (slot.shareState) {
        localStorage.setItem('starpath.share.state', JSON.stringify(slot.shareState));
        if (slot.shareState.shareId) setShowShareFlow(true);
      }
      setShowSlotsPanel(false);
    } catch {}
  };

  const deleteSlot = (slotName) => {
    try {
      const all = JSON.parse(localStorage.getItem('starpath.save.slots') || '{}');
      delete all[slotName];
      localStorage.setItem('starpath.save.slots', JSON.stringify(all));
      refreshSlots();
    } catch {}
  };

  // シェアされたページの表示
  if (isSharedView) {
    return <SharedFeedbackPage shareId={shareId} />;
  }

  return (
    <div className="container">
      {/* ボトムツールバー：ホーム/メニュー/使い方 */}
      {!isSharedView && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          background: 'var(--panel)',
          borderTop: '1px solid var(--line)',
          padding: '0.5rem'
        }}>
          <button
            onClick={handleGoHome}
            style={{
              flex: 1,
              padding: '0.8rem 0.5rem',
              background: 'rgba(143, 211, 255, 0.9)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              fontWeight: '600'
            }}
          >
            🏠 ホーム
          </button>
          <div style={{ position: 'relative', flex: 1, margin: '0 0.25rem' }}>
            <button
              onClick={() => { setShowMenu(!showMenu); setShowSlotsPanel(false); }}
              style={{
                width: '100%',
                padding: '0.8rem 0.5rem',
                background: 'rgba(143, 211, 255, 0.9)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                fontWeight: '600'
              }}
            >
              ⚙️ メニュー
            </button>
            {showMenu && (
              <div style={{
                position: 'absolute',
                bottom: '60px',
                left: 0,
                background: 'rgba(0,0,0,0.85)',
                color: 'white',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                padding: '8px',
                minWidth: '200px',
                backdropFilter: 'blur(6px)'
              }}>
                <button onClick={() => { handleSave(); setShowMenu(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px', background: 'transparent', color: 'white', border: 'none', fontSize: '1rem' }}>💾 保存</button>
                <button onClick={() => { setShowSlotsPanel(true); setShowMenu(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px', background: 'transparent', color: 'white', border: 'none', fontSize: '1rem' }}>📦 保存スロット</button>
                <button onClick={() => { setShowResetConfirm(true); setShowMenu(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px', background: 'transparent', color: 'white', border: 'none', fontSize: '1rem' }}>🔄 リセット</button>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowTutorial(true)}
            style={{
              flex: 1,
              padding: '0.8rem 0.5rem',
              background: 'rgba(143, 211, 255, 0.9)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              fontWeight: '600'
            }}
          >
            ℹ️ 使い方
          </button>
        </div>
      )}

      {/* 保存トースト */}
      {showSavedToast && (
        <div style={{
          position: 'fixed',
          top: '4.2rem',
          left: '1rem',
          zIndex: 1000,
          padding: '0.5rem 0.8rem',
          background: 'rgba(143, 211, 255, 0.9)',
          color: 'var(--bg)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          保存しました
        </div>
      )}

      {/* 保存オプション選択 */}
      {showSaveOptions && (
        <>
          {/* 背景オーバーレイ */}
          <div 
            onClick={() => setShowSaveOptions(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1000
            }}
          />
          
          {/* 保存オプションダイアログ */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1001,
            background: 'rgba(18, 26, 51, 0.98)',
            color: 'white',
            border: '2px solid var(--accent)',
            borderRadius: '12px',
            padding: '1.5rem',
            minWidth: '300px',
            maxWidth: '90%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', textAlign: 'center' }}>💾 保存</h3>
            
            {lastSavedSlot && (
              <button 
                onClick={() => {
                  saveToSlot(lastSavedSlot);
                  setShowSaveOptions(false);
                }}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  marginBottom: '0.8rem',
                  background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.2), rgba(100, 180, 255, 0.2))',
                  border: '2px solid var(--accent)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📝 上書き保存「{lastSavedSlot}」
              </button>
            )}
            
            <button 
              onClick={() => {
                setShowSaveOptions(false);
                setShowSlotsPanel(true);
              }}
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '0.8rem',
                background: 'rgba(143, 211, 255, 0.1)',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ➕ 新規保存
            </button>
            
            <button 
              onClick={() => setShowSaveOptions(false)}
              style={{
                width: '100%',
                padding: '0.6rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              キャンセル
            </button>
          </div>
        </>
      )}

      {/* リセット確認ダイアログ */}
      {showResetConfirm && (
        <>
          {/* 背景オーバーレイ */}
          <div 
            onClick={() => setShowResetConfirm(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1002
            }}
          />
          
          {/* リセット確認ダイアログ */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1003,
            background: 'rgba(18, 26, 51, 0.98)',
            color: 'white',
            border: '2px solid #ff6b6b',
            borderRadius: '12px',
            padding: '1.5rem',
            minWidth: '300px',
            maxWidth: '90%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', textAlign: 'center', color: '#ff6b6b' }}>⚠️ リセット確認</h3>
            
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.95rem', textAlign: 'center', lineHeight: '1.6' }}>
              すべての進行状況と<br />自動保存がリセットされます。<br />
              （保存スロットは残ります）
            </p>
            
            <button 
              onClick={() => {
                handleReset();
              }}
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '0.8rem',
                background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 80, 80, 0.2))',
                border: '2px solid #ff6b6b',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🗑️ リセットする
            </button>
            
            <button 
              onClick={() => setShowResetConfirm(false)}
              style={{
                width: '100%',
                padding: '0.6rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              キャンセル
            </button>
          </div>
        </>
      )}

      {/* チュートリアル */}
      {showTutorial && (
        <>
          {/* 背景オーバーレイ */}
          <div 
            onClick={() => setShowTutorial(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              zIndex: 1004
            }}
          />
          
          {/* チュートリアルダイアログ */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1005,
            background: 'rgba(18, 26, 51, 0.98)',
            color: 'white',
            border: '2px solid var(--accent)',
            borderRadius: '12px',
            padding: '1.5rem',
            minWidth: '320px',
            maxWidth: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', textAlign: 'center', color: 'var(--accent)' }}>
              ℹ️ StarPath 使い方
            </h3>
            
            <div style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
              <section style={{ marginBottom: '1.2rem' }}>
                <h4 style={{ color: 'var(--accent)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🌟 基本の流れ</h4>
                <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  <li>12の質問に答えて、あなたのタイプを診断</li>
                  <li>診断結果を共有して、3人から感想をもらう</li>
                  <li>星座が輝き、あなたのシンボルが明らかに</li>
                  <li>さらに深い対話で自分軸を見つける</li>
                  <li>5人から感想をもらうと「極み」が解放</li>
                </ol>
              </section>
              
              <section style={{ marginBottom: '1.2rem' }}>
                <h4 style={{ color: 'var(--accent)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>💾 保存機能</h4>
                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  <li><strong>自動保存</strong>: 進行状況は常に自動保存されます</li>
                  <li><strong>スロット保存</strong>: 重要なポイントを複数保存できます</li>
                  <li><strong>上書き保存</strong>: 同じスロット名で更新できます</li>
                </ul>
              </section>
              
              <section style={{ marginBottom: '1.2rem' }}>
                <h4 style={{ color: 'var(--accent)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🔄 リセット</h4>
                <p style={{ margin: 0 }}>
                  メニュー → リセットで、すべての進行状況をリセットして0から始められます。<br />
                  （保存スロットは残ります）
                </p>
              </section>
              
              <section style={{ marginBottom: '0' }}>
                <h4 style={{ color: 'var(--accent)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>⚡ デモ機能</h4>
                <p style={{ margin: 0 }}>
                  「デモ：X人目を追加」ボタンで、感想を疑似的に追加して動作確認ができます。
                </p>
              </section>
            </div>
            
            <button 
              onClick={() => setShowTutorial(false)}
              style={{
                width: '100%',
                padding: '0.8rem',
                marginTop: '1.5rem',
                background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.2), rgba(100, 180, 255, 0.2))',
                border: '2px solid var(--accent)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              閉じる
            </button>
          </div>
        </>
      )}

      {/* ツールバーのぶつかり回避スペーサー */}
      {!isSharedView && (
        <div style={{ height: '64px' }} />
      )}

      {showSlotsPanel && (
        <>
          {/* 背景オーバーレイ（保存スロット） */}
          <div 
            onClick={() => setShowSlotsPanel(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(12px)',
              zIndex: 999
            }}
          />
          
          {/* 保存スロットパネル */}
          <div style={{
            position: 'absolute',
            top: '6.2rem',
            left: '1rem',
            right: '1rem',
            zIndex: 1000,
            padding: '1rem',
            background: 'rgba(18, 26, 51, 0.98)',
            color: 'white',
            border: '2px solid var(--accent)',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <strong>📁 保存スロット</strong>
            <button onClick={() => setShowSlotsPanel(false)} style={{ background: 'transparent', color: 'white', border: 'none' }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
            <input
              value={newSlotName}
              onChange={(e) => setNewSlotName(e.target.value)}
              placeholder="スロット名（例：今日のメモ）"
              style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--line)' }}
            />
            <button onClick={() => saveToSlot(newSlotName)} style={{ padding: '0.5rem 0.8rem', background: 'rgba(143, 211, 255, 0.9)', color: 'var(--bg)', border: 'none', borderRadius: '8px', fontWeight: '600' }}>保存</button>
          </div>
          <div style={{ maxHeight: '40vh', overflow: 'auto' }}>
            {Object.keys(slots).length === 0 && (
              <div style={{ opacity: 0.8 }}>まだ保存はありません</div>
            )}
            {Object.entries(slots).map(([name, s]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{new Date(s.savedAt).toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => loadFromSlot(name)} style={{ padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid var(--line)', borderRadius: '6px' }}>読み込み</button>
                  <button onClick={() => deleteSlot(name)} style={{ padding: '0.4rem 0.6rem', background: 'rgba(255,0,0,0.5)', color: 'white', border: 'none', borderRadius: '6px' }}>削除</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      )}
      {/* フロー設計図ボタン（開発用・右上固定）- 非表示 */}
      {false && (
        <button
          onClick={() => setShowFlowDesigner(!showFlowDesigner)}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 999,
            padding: '0.5rem 1rem',
            background: 'rgba(143, 211, 255, 0.9)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          {showFlowDesigner ? '✕ 閉じる' : '📋 設計図'}
        </button>
      )}

      {/* ページトップ移動ボタン（右下固定） */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 999,
          width: '50px',
          height: '50px',
          background: 'rgba(143, 211, 255, 0.9)',
          color: 'var(--bg)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1.2rem',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="ページトップに戻る"
      >
        ↑
      </button>

      {/* フロー設計図 */}
      {showFlowDesigner && (
        <FlowDesigner 
          onNavigate={(nodeId) => {
            console.log('Navigate to:', nodeId);
            // TODO: 各セクションへのスクロール実装
          }}
          onClose={() => setShowFlowDesigner(false)}
        />
      )}

      {/* 診断前のガイド（深呼吸） */}
      {showPreDiagnosisGuide && (
        <div className="card">
          <PreDiagnosisGuide onComplete={handlePreDiagnosisComplete} />
        </div>
      )}

      {/* 生年月日入力画面 */}
      {showBirthDateInput && (
        <div className="card">
          <BirthDateInput onComplete={handleBirthDateComplete} />
        </div>
      )}

      {/* 診断画面（分岐型質問システム） */}
      {showQuestionnaire ? (
        <div className="card">
          <h1>🌟 あなたの星を見つけよう</h1>
          <p className="sub" style={{ marginBottom: '2rem' }}>
            12の質問に答えて、あなたのタイプを診断します。
          </p>
          <BranchingQuestionnaire onComplete={handleBranchingQuestionnaireComplete} />
          
          {/* 結果表示 */}
          {currentType && currentType.id && (
            <DiagnosisResult 
              typeId={currentType.id}
              birthDate={birthDate}
              questionnaireAnswers={{}}
            />
          )}
          
          {/* デバッグ用：診断スキップボタン */}
          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
            <p className="sub" style={{ fontSize: '12px', marginBottom: '0.5rem' }}>開発用ショートカット</p>
            <button 
              className="btn" 
              onClick={() => handleQuestionnaireComplete('explorer')}
              style={{ fontSize: '12px', padding: '0.5rem 1rem', background: 'var(--muted)' }}
            >
              ⚡ 診断をスキップ
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card">
            <TypeSelector 
              currentType={currentType} 
              onTypeChange={setCurrentType} 
            />
          </div>

      <div className="card">
        <ProgressiveMessage 
          type={currentType}
          progress={progress}
        />
      </div>

      <div className="card">
        <GoalOptions 
          unlocked={unlocked}
          onReceive={handleScrollToProgress}
          onGoDeeper={handleGoDeeper}
        />
      </div>

      {showDeepInteraction && (
        <div className="card">
          <DeepInteraction 
            currentType={currentType}
            onComplete={handleDeepInteractionComplete}
            savedResult={deepInteractionResult}
            onClose={() => setShowDeepInteraction(false)}
          />
        </div>
      )}

      {/* 深い対話を見返すボタン */}
      {deepInteractionResult && !showDeepInteraction && (
        <div className="card">
          <h2>💭 深い対話の記録</h2>
          <p className="sub">
            あなたの回答と分析結果をいつでも見返せます
          </p>
          <button 
            className="btn" 
            onClick={() => setShowDeepInteraction(true)}
            style={{ marginTop: '1rem' }}
          >
            📖 深い対話を見返す
          </button>
          
          {/* 解放通知 */}
          {unlocked && (
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1))',
              borderRadius: '12px',
              border: '2px solid rgba(255, 215, 0, 0.5)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                🎉 おめでとうございます！
              </h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                ③ さらに深める が解放されました！
              </p>
              <p className="sub" style={{ fontSize: '14px' }}>
                下から進むことができます。
              </p>
            </div>
          )}
          
          <p className="sub" style={{ marginTop: '1.5rem', fontSize: '14px' }}>
            💡 深い対話が完了したので、星座の進捗に進むことができます。
          </p>
        </div>
      )}

      {/* ③さらに深める（深い対話完了後にここに表示） */}
      {unlocked && deepInteractionResult && (
        <div className="card" style={{
          background: 'linear-gradient(135deg, rgba(143, 211, 255, 0.05), rgba(255, 215, 143, 0.05))',
          border: '2px solid rgba(143, 211, 255, 0.3)',
          animation: 'fadeInUp 0.8s ease-out, pulse 2s ease-in-out 0.8s infinite'
        }}>
          <h2>③ さらに深める ✨</h2>
          <p className="sub">更に自分を深く知るステップへ</p>
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(143, 211, 255, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              タップして次のステップへ進みましょう
            </p>
          </div>
          <button 
            className="btn demo" 
            onClick={handleGoDeeper}
            style={{ 
              width: '100%',
              fontSize: '1.1rem',
              padding: '1rem',
              animation: 'bounce 1s ease-in-out infinite'
            }}
          >
            深める
          </button>
        </div>
      )}

      {/* 📤 診断を共有して感想をもらう（全てここで完結） */}
      {showShareFlow && (
        <div className="card">
          <ShareFlow 
            currentType={currentType}
            onComplete={handleShareComplete}
            onProgress={handleProgress}
          />
        </div>
      )}

        </>
      )}
    </div>
  );
}

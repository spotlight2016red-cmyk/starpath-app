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
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AvatarEvolution from './components/AvatarEvolution';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import { saveDiagnosisDataWithConsent } from './firebase/diagnosisService';
import './utils/feedbackAnalytics'; // フィードバック分析ツールを読み込み
import './styles.css';

export default function App() {
  // URLパラメータをチェック
  const urlParams = new URLSearchParams(window.location.search);
  const shareId = urlParams.get('share');
  const isSharedView = !!shareId;
  
  const [showPreDiagnosisGuide, setShowPreDiagnosisGuide] = useState(!isSharedView);
  const [showLandingPage, setShowLandingPage] = useState(true);
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
  const [hasDataConsent, setHasDataConsent] = useState(false);

  // データ収集の同意を自動的に有効化
  useEffect(() => {
    setHasDataConsent(true);
  }, []);

  // 状態の復元
  useEffect(() => {
    if (isSharedView) return;
    try {
      const saved = JSON.parse(localStorage.getItem('starpath.app.state') || 'null');
      if (saved) {
        setShowQuestionnaire(!!saved.showQuestionnaire === false ? false : saved.showQuestionnaire);
        if (typeof saved.progress === 'number') setProgress(saved.progress);
        if (typeof saved.unlocked === 'boolean') setUnlocked(saved.unlocked);
        if (typeof saved.showShareFlow === 'boolean') setShowShareFlow(saved.showShareFlow);
        if (typeof saved.showDeepInteraction === 'boolean') setShowDeepInteraction(saved.deepInteractionResult);
      }
      
      // セーブスロットの復元
      const savedSlots = JSON.parse(localStorage.getItem('starpath.slots') || '{}');
      setSlots(savedSlots);
    } catch {}
  }, []);

  // 状態の保存
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

  const handleProgress = (newProgress) => {
    setProgress(newProgress);
    if (newProgress >= 100) {
      setUnlocked(true);
    }
  };

  const handleUnlock = () => {
    setUnlocked(true);
  };

  const handleShareComplete = () => {
    setShowShareFlow(false);
    setShowConstellationProgress(true);
  };

  const handleGoHome = () => {
    // 保存は残したままホームへ
    window.location.href = window.location.origin;
  };

  // 完全リセット
  const handleStartDiagnosis = () => {
    setShowLandingPage(false);
    setShowPreDiagnosisGuide(true);
  };

  const handleViewAvatar = () => {
    setShowLandingPage(false);
    setShowConstellationProgress(true);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('starpath.app.state');
      localStorage.removeItem('starpath.share.state');
    } catch {}
    window.location.href = window.location.origin;
  };

  // シェアされたページの表示
  if (isSharedView) {
    return <SharedFeedbackPage shareId={shareId} />;
  }

  return (
    <div className="container">
      {/* ランディングページ */}
      {showLandingPage && !isSharedView && (
        <>
          <Hero onStartDiagnosis={handleStartDiagnosis} onViewAvatar={handleViewAvatar} />
          <Features />
          <HowItWorks />
          <Testimonials />
          <CTA onStartDiagnosis={handleStartDiagnosis} onViewAvatar={handleViewAvatar} />
          <Footer />
        </>
      )}

      {/* 診断アプリ */}
      {!showLandingPage && (
        <>
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
              background: 'rgba(18, 26, 51, 0.98)',
              borderTop: '2px solid var(--accent)',
              padding: '1rem 0.5rem',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)'
            }}>
              <button
                onClick={handleGoHome}
                style={{
                  flex: 1,
                  padding: '1.2rem 0.8rem',
                  background: 'rgba(143, 211, 255, 0.95)',
                  color: 'var(--bg)',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.3rem',
                  whiteSpace: 'nowrap',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(143, 211, 255, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(143, 211, 255, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(143, 211, 255, 0.3)';
                }}
              >
                🏠 ホーム
              </button>
              <button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  flex: 1,
                  padding: '1.2rem 0.8rem',
                  background: showMenu ? 'rgba(143, 211, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
                  color: showMenu ? 'var(--bg)' : 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  transition: 'all 0.2s ease'
                }}
              >
                📋 メニュー
              </button>
              <button
                onClick={() => setShowSlotsPanel(true)}
                style={{
                  flex: 1,
                  padding: '1.2rem 0.8rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  transition: 'all 0.2s ease'
                }}
              >
                📖 使い方
              </button>
            </div>
          )}

          {/* メインコンテンツエリア */}
          <div style={{ paddingBottom: '120px' }}>
            {/* 診断前ガイド */}
            {showPreDiagnosisGuide && (
              <div className="card">
                <PreDiagnosisGuide 
                  onStart={() => setShowBirthDateInput(true)}
                  onSkip={() => setShowQuestionnaire(true)}
                />
              </div>
            )}

            {/* 生年月日入力 */}
            {showBirthDateInput && (
              <div className="card">
                <BirthDateInput 
                  onComplete={() => setShowQuestionnaire(true)}
                  onBack={() => setShowBirthDateInput(false)}
                />
              </div>
            )}

            {/* 診断質問 */}
            {showQuestionnaire && (
              <div className="card">
                <BranchingQuestionnaire 
                  onComplete={(type) => {
                    setCurrentType(type);
                    setShowQuestionnaire(false);
                    setShowConstellationProgress(true);
                  }}
                />
              </div>
            )}

            {/* 星座進捗表示 */}
            {showConstellationProgress && (
              <div className="card">
                <ConstellationProgress 
                  currentType={currentType}
                  progress={progress}
                  unlocked={unlocked}
                  onProgress={handleProgress}
                  onUnlock={handleUnlock}
                  onShare={() => setShowShareFlow(true)}
                  onDeepInteraction={() => setShowDeepInteraction(true)}
                />
              </div>
            )}

            {/* 深い対話 */}
            {showDeepInteraction && (
              <div className="card">
                <DeepInteraction 
                  currentType={currentType}
                  onComplete={(result) => {
                    setDeepInteractionResult(result);
                    setShowDeepInteraction(false);
                    setShowConstellationProgress(true);
                  }}
                />
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
          </div>
        </>
      )}
    </div>
  );
}
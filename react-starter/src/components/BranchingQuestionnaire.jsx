import React, { useState } from 'react';
import { Q1, getQuestionsByBranch, determineTypeFromScores } from '../data/branchingQuestions';
import { COMPANION_MESSAGES } from '../data/companionMessages';
import CompanionMessage from './CompanionMessage';

export default function BranchingQuestionnaire({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [branch, setBranch] = useState(null);
  const [scores, setScores] = useState({});
  const [showCompanionMessage, setShowCompanionMessage] = useState(false);
  const [companionMessage, setCompanionMessage] = useState(null);

  // 第1問の回答
  const handleQ1Answer = (option) => {
    setBranch(option.branch);
    setCurrentStep(1);
    
    // 伴走メッセージを表示
    setCompanionMessage({
      title: COMPANION_MESSAGES.afterQ1.title,
      message: COMPANION_MESSAGES.afterQ1.message
    });
    setShowCompanionMessage(true);
  };

  // 深掘り質問の回答
  const handleDeepQuestionAnswer = (questionId, option) => {
    const newScores = { ...scores };
    
    // スコアを集計
    Object.keys(option.score).forEach(type => {
      newScores[type] = (newScores[type] || 0) + option.score[type];
    });
    
    setScores(newScores);
    
    // 次の質問へ
    const questions = getQuestionsByBranch(branch);
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // すべての質問に回答完了
      const finalType = determineTypeFromScores(newScores);
      
      // 最後の伴走メッセージを表示
      setCompanionMessage({
        title: COMPANION_MESSAGES.beforeResult.title,
        message: COMPANION_MESSAGES.beforeResult.message
      });
      setShowCompanionMessage(true);
      
      // 結果を返す
      setTimeout(() => {
        onComplete(finalType);
      }, 2000);
    }
  };

  const handleCompanionMessageComplete = () => {
    setShowCompanionMessage(false);
  };

  // 伴走メッセージを表示
  if (showCompanionMessage) {
    return (
      <CompanionMessage
        message={companionMessage}
        tone="gentle"
        onComplete={handleCompanionMessageComplete}
      />
    );
  }

  // 第1問
  if (currentStep === 0) {
    return (
      <div className="branching-questionnaire">
        <div style={{ 
          padding: '2rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid var(--line)',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '2rem',
            lineHeight: '1.6',
            textAlign: 'center'
          }}>
            {Q1.text}
          </h3>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {Q1.options.map(option => (
              <button
                key={option.id}
                className="btn"
                onClick={() => handleQ1Answer(option)}
                style={{
                  width: '100%',
                  padding: '1.2rem',
                  fontSize: '1.1rem',
                  textAlign: 'left',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word'
                }}
              >
                {option.id.toUpperCase()}. {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 深掘り質問
  const questions = getQuestionsByBranch(branch);
  const currentQuestion = questions[currentStep - 1];

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="branching-questionnaire">
      <div style={{ 
        padding: '2rem',
        background: 'rgba(143, 211, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid var(--line)',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            width: '100%',
            height: '4px',
            background: 'var(--line)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(currentStep / questions.length) * 100}%`,
              height: '100%',
              background: 'var(--accent)',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p className="sub" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            質問 {currentStep} / {questions.length}
          </p>
        </div>

        <h3 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          lineHeight: '1.6',
          textAlign: 'center'
        }}>
          {currentQuestion.text}
        </h3>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {currentQuestion.options.map(option => (
            <button
              key={option.id}
              className="btn"
              onClick={() => handleDeepQuestionAnswer(currentQuestion.id, option)}
              style={{
                width: '100%',
                padding: '1.2rem',
                fontSize: '1.1rem',
                textAlign: 'left',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              }}
            >
              {option.id.toUpperCase()}. {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


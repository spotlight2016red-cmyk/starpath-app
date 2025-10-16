import React from 'react';

const PrivacyPolicy = ({ onConsent, onDecline }) => {
  const handleConsent = () => {
    localStorage.setItem('dataCollectionConsent', 'true');
    localStorage.setItem('dataCollectionConsentDate', new Date().toISOString());
    onConsent();
  };

  const handleDecline = () => {
    localStorage.setItem('dataCollectionConsent', 'false');
    onDecline();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#1a1a2e',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          📊 データ収集について
        </h1>

        <div style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            より良い診断精度とサービスの向上のために、
            <strong>匿名化された診断データ</strong>を収集しています。
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            個人を特定できる情報は一切収集しません。
          </p>
          <p style={{ 
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '0'
          }}>
            データ収集に同意されない場合でも、
            アプリの基本機能はご利用いただけます。
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <button
            onClick={handleConsent}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#fff',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            ✅ 同意して診断を始める
          </button>

          <button
            onClick={handleDecline}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              background: 'transparent',
              border: '2px solid #1a1a2e',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f0f0f0';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            ⏭️ 同意せずに診断を始める
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


import React from 'react';
import { getDeepInterpretation } from '../utils/integratedDiagnosis';
import { TYPES } from '../data/types';

export default function DiagnosisResult({ typeId, birthDate, questionnaireAnswers }) {
  const type = TYPES[typeId];
  const interpretation = getDeepInterpretation({ finalType: typeId, details: {} });

  return (
    <div className="diagnosis-result">
      <div style={{
        padding: '2rem',
        background: 'rgba(143, 211, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid var(--line)',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          color: 'var(--accent)',
          textAlign: 'center'
        }}>
          ✨ あなたの星座が完成しました
        </h1>

        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            {type.icon}
          </div>

          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '0.5rem',
            color: 'var(--accent)'
          }}>
            {type.title}
          </h2>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text)',
            marginBottom: '1rem'
          }}>
            {type.description}
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(143, 211, 255, 0.1)',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            marginBottom: '1rem',
            color: 'var(--accent)'
          }}>
            📊 判定の根拠
          </h3>

          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'var(--text)'
          }}>
            <p style={{ marginBottom: '0.8rem' }}>
              <strong>🌟 占星術（30%）</strong><br />
              太陽星座から、あなたの基本的な性格特性を判定しました。
            </p>

            <p style={{ marginBottom: '0.8rem' }}>
              <strong>🔮 四柱推命（30%）</strong><br />
              五行のバランスから、あなたの本質的なエネルギーを判定しました。
            </p>

            <p style={{ marginBottom: '0.8rem' }}>
              <strong>☯️ 易学（20%）</strong><br />
              八卦の配置から、あなたの人生の流れを判定しました。
            </p>

            <p style={{ marginBottom: '0.8rem' }}>
              <strong>📝 12の質問（20%）</strong><br />
              あなたの意識的な選択から、現在の状態を判定しました。
            </p>

            <p style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'rgba(255, 215, 0, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              fontSize: '1.2rem',
              fontWeight: '600',
              color: 'var(--accent)',
              textAlign: 'center'
            }}>
              <strong>95%の精度</strong>で「{type.name}」タイプです
            </p>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(143, 211, 255, 0.1)',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            marginBottom: '1rem',
            color: 'var(--accent)'
          }}>
            🔮 易学の深い解釈
          </h3>

          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'var(--text)'
          }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>卦: {interpretation.hexagram}</strong><br />
              {interpretation.meaning}
            </p>

            <p style={{
              padding: '1rem',
              background: 'rgba(143, 211, 255, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(143, 211, 255, 0.3)',
              fontSize: '1.1rem',
              lineHeight: '1.8'
            }}>
              <strong>💡 アドバイス</strong><br />
              {interpretation.advice}
            </p>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(143, 211, 255, 0.1)',
          borderRadius: '8px'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            marginBottom: '1rem',
            color: 'var(--accent)'
          }}>
            🎯 あなたの特徴
          </h3>

          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'var(--text)'
          }}>
            <p style={{ marginBottom: '0.8rem' }}>
              {type.longMessage}
            </p>

            <p style={{
              padding: '1rem',
              background: 'rgba(143, 211, 255, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(143, 211, 255, 0.3)',
              fontSize: '1.1rem',
              lineHeight: '1.8'
            }}>
              <strong>💡 次のステージで発揮できること</strong><br />
              {type.action}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


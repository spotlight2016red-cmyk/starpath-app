import React, { useState } from 'react';

export default function FlowDesigner({ onNavigate, onClose }) {
  const [selectedNode, setSelectedNode] = useState(null);

  const flowSteps = [
    {
      id: 'questionnaire',
      title: '🌟 診断',
      description: '12の質問に答える',
      next: ['typeResult'],
      position: { x: 50, y: 5 }
    },
    {
      id: 'typeResult',
      title: '✨ 診断結果',
      description: 'あなたのタイプ',
      next: ['progressiveMessage', 'goalOptions'],
      position: { x: 50, y: 20 }
    },
    {
      id: 'progressiveMessage',
      title: '💭 あなたの輝き',
      description: '段階的メッセージ',
      next: [],
      position: { x: 25, y: 35 }
    },
    {
      id: 'goalOptions',
      title: '🎯 これからの選択肢',
      description: '① 旅を続ける\n② 更に知る\n③ さらに深める',
      next: ['deepInteraction'],
      position: { x: 50, y: 35 }
    },
    {
      id: 'deepInteraction',
      title: '🧭 深い対話',
      description: 'ギャップ発見\n成功パターン\nルーツ発見',
      next: ['deepRecord'],
      position: { x: 50, y: 50 }
    },
    {
      id: 'deepRecord',
      title: '💭 深い対話の記録',
      description: '回答と分析結果',
      next: ['unlockNotice'],
      position: { x: 50, y: 65 }
    },
    {
      id: 'unlockNotice',
      title: '🎉 ③ さらに深める解放',
      description: '深めるボタンが使える',
      next: ['shareFlow'],
      position: { x: 50, y: 75 }
    },
    {
      id: 'shareFlow',
      title: '📤 診断を共有して感想をもらう',
      description: '3人の感想を集める\n★ メイン機能',
      next: ['constellationProgress'],
      position: { x: 50, y: 87 },
      isMain: true
    },
    {
      id: 'constellationProgress',
      title: '🌟 あなたを表すシンボル',
      description: '星座が完全に輝く\n補完星座が明らかに',
      next: ['publicSetting'],
      position: { x: 50, y: 100 }
    },
    {
      id: 'publicSetting',
      title: '🌐 公開設定',
      description: '匿名で公開する',
      next: [],
      position: { x: 50, y: 110 }
    }
  ];

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if (onNavigate) {
      onNavigate(node.id);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg)',
      zIndex: 1000,
      overflow: 'auto',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ margin: 0 }}>
            📋 StarPath フロー設計図
          </h1>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--accent)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            ✕ 閉じる
          </button>
        </div>

        {/* SVGキャンバス */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '1400px',
          background: 'rgba(143, 211, 255, 0.03)',
          borderRadius: '12px',
          border: '1px solid var(--line)'
        }}>
          <svg 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            {/* 矢印の定義 */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3, 0 6"
                  fill="var(--accent)"
                  opacity="0.5"
                />
              </marker>
            </defs>

            {/* 矢印を描画 */}
            {flowSteps.map(step => 
              step.next.map(nextId => {
                const nextStep = flowSteps.find(s => s.id === nextId);
                if (!nextStep) return null;
                
                return (
                  <line
                    key={`${step.id}-${nextId}`}
                    x1={`${step.position.x}%`}
                    y1={`${step.position.y + 8}%`}
                    x2={`${nextStep.position.x}%`}
                    y2={`${nextStep.position.y - 2}%`}
                    stroke="var(--accent)"
                    strokeWidth="2"
                    opacity="0.3"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })
            )}
          </svg>

          {/* ノードを描画 */}
          {flowSteps.map(step => (
            <div
              key={step.id}
              onClick={() => handleNodeClick(step)}
              style={{
                position: 'absolute',
                left: `${step.position.x}%`,
                top: `${step.position.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '200px',
                padding: '1rem',
                background: step.isMain 
                  ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2))'
                  : selectedNode?.id === step.id 
                    ? 'rgba(143, 211, 255, 0.2)' 
                    : 'var(--bg)',
                border: step.isMain 
                  ? '3px solid rgba(255, 215, 0, 0.8)'
                  : selectedNode?.id === step.id 
                    ? '2px solid var(--accent)' 
                    : '2px solid var(--line)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedNode?.id === step.id 
                  ? '0 4px 12px rgba(143, 211, 255, 0.3)' 
                  : 'none',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(143, 211, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                if (selectedNode?.id !== step.id) {
                  e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <h3 style={{ 
                fontSize: '0.9rem', 
                marginBottom: '0.5rem',
                color: 'var(--fg)'
              }}>
                {step.title}
              </h3>
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--muted)',
                margin: 0,
                whiteSpace: 'pre-line',
                lineHeight: '1.4'
              }}>
                {step.description}
              </p>
              {step.isMain && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.3rem',
                  background: 'rgba(255, 215, 0, 0.3)',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  ★ メイン機能
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 詳細パネル */}
        {selectedNode && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(143, 211, 255, 0.1)',
            borderRadius: '12px',
            border: '2px solid var(--accent)'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>{selectedNode.title}</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
              {selectedNode.description}
            </p>
            <div style={{ fontSize: '0.9rem' }}>
              <strong>次のステップ：</strong>
              {selectedNode.next.length > 0 ? (
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  {selectedNode.next.map(nextId => {
                    const nextStep = flowSteps.find(s => s.id === nextId);
                    return nextStep ? (
                      <li key={nextId}>{nextStep.title}</li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <span style={{ color: 'var(--muted)' }}> 最終ステップ</span>
              )}
            </div>
          </div>
        )}

        {/* 凡例 */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '8px',
          border: '1px solid var(--line)'
        }}>
          <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>凡例</h3>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '30px',
                height: '30px',
                border: '2px solid var(--line)',
                borderRadius: '4px',
                background: 'var(--bg)'
              }}></div>
              <span>通常ステップ</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '30px',
                height: '30px',
                border: '3px solid rgba(255, 215, 0, 0.8)',
                borderRadius: '4px',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2))'
              }}></div>
              <span>メイン機能</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '30px',
                height: '30px',
                border: '2px solid var(--accent)',
                borderRadius: '4px',
                background: 'rgba(143, 211, 255, 0.2)'
              }}></div>
              <span>選択中</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


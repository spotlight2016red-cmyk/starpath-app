import React from 'react';

const TermsOfService = ({ onClose }) => {
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
        maxWidth: '800px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#1a1a2e',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          📋 利用規約
        </h1>

        <div style={{
          fontSize: '1rem',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '2rem'
        }}>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
            最終更新日: 2024年1月1日
          </p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              第1条（適用）
            </h2>
            <p style={{ marginBottom: '0.8rem' }}>
              本利用規約は、StarPath（以下「本サービス」といいます）の利用条件を定めるものです。
              本サービスをご利用いただく際には、本利用規約にご同意いただく必要があります。
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              第2条（サービスの内容）
            </h2>
            <p style={{ marginBottom: '0.8rem' }}>
              本サービスは、星座と易学を組み合わせた診断アプリケーションであり、
              ユーザーの自己理解を深めるためのツールを提供します。
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              第3条（利用料金）
            </h2>
            <p style={{ marginBottom: '0.8rem' }}>
              本サービスは無料でご利用いただけます。
              ただし、今後有料機能を追加する可能性があります。
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              第4条（禁止事項）
            </h2>
            <p style={{ marginBottom: '0.8rem' }}>
              ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません：
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                法令または公序良俗に違反する行為
              </li>
              <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                犯罪行為に関連する行為
              </li>
              <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
              </li>
              <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                本サービスに不正アクセスをし、またはこれを試みる行為
              </li>
              <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                本サービスの運営を妨害するおそれのある行為
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              第5条（免責事項）
            </h2>
            <p style={{ marginBottom: '0.8rem' }}>
              本サービスは、診断結果の正確性、完全性、有用性、安全性等について、
              何ら保証するものではありません。
              本サービスの利用により生じた損害について、当方は一切の責任を負いません。
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              第6条（サービス内容の変更等）
            </h2>
            <p style={{ marginBottom: '0.8rem' }}>
              当方は、ユーザーへの事前通知なく、本サービスの内容を変更、
              追加、または廃止することができるものとします。
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              第7条（利用規約の変更）
            </h2>
            <p style={{ marginBottom: '0.8rem' }}>
              当方は、必要に応じて本利用規約を変更することができるものとします。
              変更後の利用規約は、本サービス上に表示した時点から効力を生じるものとします。
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              第8条（準拠法・裁判管轄）
            </h2>
            <p style={{ marginBottom: '0.8rem' }}>
              本利用規約の解釈にあたっては、日本法を準拠法とします。
              本サービスに関して紛争が生じた場合には、
              当方の本店所在地を管轄する裁判所を専属的合意管轄裁判所とします。
            </p>
          </section>
        </div>

        <button
          onClick={onClose}
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
          閉じる
        </button>
      </div>
    </div>
  );
};

export default TermsOfService;


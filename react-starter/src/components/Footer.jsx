import { Heart, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(to bottom, #f0f9ff, #ffffff)',
      color: '#4b5563',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              color: '#60a5fa',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Company Info */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
              color: 'white',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '1.5rem' }}>🌸</div>
              <h3 style={{ 
              fontSize: 'var(--size-font-xl)', 
              letterSpacing: '0.025em', 
              fontFamily: 'var(--font-family-sans)' 
            }}>MEGURI</h3>
              <div style={{ fontSize: '1.125rem' }}>巡</div>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#4b5563',
              maxWidth: '28rem',
              lineHeight: '1.625',
              marginTop: '1rem'
            }}>
              アバターと一緒に成長する旅。<br />
              診断でタイプを知り、祈りと行動で進化。<br />
              ゲーム感覚で楽しく、現実の一歩がデジタルの成長に。
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: '#2563eb',
              marginTop: '1rem'
            }}>
              <div style={{
                width: '0.375rem',
                height: '0.375rem',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span>小さな一歩が、大きな変化を生み出す</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              color: 'var(--color-neutral-gray-900)', 
              marginBottom: 'var(--size-spacing-md)', 
              fontFamily: 'var(--font-family-sans)' 
            }}>クイックリンク</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>診断を始める</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>5つのタイプ</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>よくある質問</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>ブログ</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ 
              color: 'var(--color-neutral-gray-900)', 
              marginBottom: 'var(--size-spacing-md)', 
              fontFamily: 'var(--font-family-sans)' 
            }}>法的情報</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>利用規約</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>プライバシーポリシー</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>特定商取引法</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>お問い合わせ</a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '2px solid #dbeafe',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: 0
          }}>
            © 2025 MEGURI. 
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Made with <Heart style={{ height: '0.75rem', width: '0.75rem', color: '#ec4899', fill: '#ec4899' }} /> for your journey.
            </span>
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#4b5563', transition: 'all 0.3s ease' }}>
              <Twitter style={{ height: '1.25rem', width: '1.25rem' }} />
            </a>
            <a href="#" style={{ color: '#4b5563', transition: 'all 0.3s ease' }}>
              <Instagram style={{ height: '1.25rem', width: '1.25rem' }} />
            </a>
            <a href="#" style={{ color: '#4b5563', transition: 'all 0.3s ease' }}>
              <Mail style={{ height: '1.25rem', width: '1.25rem' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


import { ArrowRight, Zap, Trophy, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function CTA({ onStartDiagnosis, onViewAvatar }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      style={{
        position: 'relative',
        padding: '8rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4, #0ea5e9)'
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1758181783937-b50e94afa4c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBqb3VybmV5JTIwcGF0aCUyMG5hdHVyZXxlbnwxfHx8fDE3NjA2OTIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.6), rgba(6, 182, 212, 0.6), rgba(251, 146, 60, 0.4))'
        }}></div>
      </div>

      {/* Floating Sparkles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              color: '#fef3c7',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 15}px`,
              animation: `pulse ${Math.random() * 2 + 1}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '2.5rem',
          left: '2.5rem',
          width: '18rem',
          height: '18rem',
          backgroundColor: 'rgba(253, 224, 71, 0.2)',
          borderRadius: '50%',
          filter: 'blur(48px)',
          animation: 'bounce 3s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2.5rem',
          width: '24rem',
          height: '24rem',
          backgroundColor: 'rgba(251, 146, 60, 0.2)',
          borderRadius: '50%',
          filter: 'blur(48px)',
          animation: 'bounce 4s infinite',
          animationDelay: '1s'
        }}></div>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 1rem',
        textAlign: 'center',
        transition: 'all 1s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(12px)',
          padding: '0.5rem 1.25rem',
          borderRadius: '9999px',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          marginBottom: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          animation: 'pulse 2s infinite',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          <Sparkles style={{ height: '1rem', width: '1rem', color: 'white' }} />
          <span style={{ fontSize: '0.875rem', color: 'white' }}>たった3分で冒険スタート</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            fontSize: '3rem',
            animation: 'bounce 2s infinite'
          }}>🌟</div>
          <h2 style={{
            color: 'var(--color-neutral-white)',
            fontSize: 'var(--size-font-5xl)',
            fontWeight: 'var(--font-weight-bold)',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            margin: 0,
            fontFamily: 'var(--font-family-sans)'
          }}>
            今日から、<br style={{ display: 'none' }} />あなたの冒険が始まる
          </h2>
          <div style={{
            fontSize: '3rem',
            animation: 'bounce 2s infinite',
            animationDelay: '0.5s'
          }}>🚀</div>
        </div>
        
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '3rem',
          maxWidth: '512px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.625',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          診断でタイプを知り、アバターと一緒に成長しよう。<br />
          ゲーム感覚で楽しく、現実の一歩がデジタルの成長に。<br />
          小さな一歩が、大きな変化を生み出します。
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <button 
            onClick={onStartDiagnosis}
            style={{
              backgroundColor: 'white',
              color: '#2563eb',
              padding: '2rem 3.5rem',
              borderRadius: '9999px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.boxShadow = '0 25px 50px -12px rgba(255, 255, 255, 0.5)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Zap style={{ height: '1.5rem', width: '1.5rem' }} />
            <span>診断を始める（3分）</span>
            <ArrowRight style={{ height: '1.5rem', width: '1.5rem' }} />
          </button>
          <button 
            onClick={onViewAvatar}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '2rem 3rem',
              borderRadius: '9999px',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Trophy style={{ height: '1.25rem', width: '1.25rem' }} />
            <span>アバターの進化を見る</span>
          </button>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem'
        }}>
          {[
            { emoji: '🎮', text: '5タイプ診断' },
            { emoji: '🏅', text: 'バッジコレクション' },
            { emoji: '✨', text: 'アバター育成' }
          ].map((feature, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>{feature.emoji}</div>
              <span style={{ color: 'white' }}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

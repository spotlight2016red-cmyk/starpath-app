import { ArrowRight, Sparkles, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { HERO_TOKENS } from "../styles/hero.tokens.js";

export default function Hero({ onStartDiagnosis, onViewAvatar }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--color-brand-gradient-hero)'
    }}>
      {/* Background Image with Overlay */}
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBibHVlJTIwc2t5JTIwc3VucmlzZSUyMGdyYWRpZW50fGVufDF8fHx8MTc2MDY5MDA2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom right, rgba(14, 165, 233, 0.4), rgba(59, 130, 246, 0.4), rgba(251, 146, 60, 0.3))'
        }}></div>
      </div>

      {/* 固定オーブ（tokens.hero.orbs） */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
        {HERO_TOKENS.orbs.map((o, i) => (
          <div key={i}
            style={{
              position: 'absolute',
              ...(o.position.top ? { top: o.position.top } : {}),
              ...(o.position.bottom ? { bottom: o.position.bottom } : {}),
              ...(o.position.left ? { left: o.position.left } : {}),
              ...(o.position.right ? { right: o.position.right } : {}),
              width: o.size, height: o.size, borderRadius: '50%',
              background: o.color, filter: `blur(${o.blur})`,
              animation: o.animation
            }}
          />
        ))}
      </div>

      {/* 固定スター（tokens.hero.stars） */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
        {HERO_TOKENS.stars.map((s, i) => (
          <div key={i}
            style={{
              position: 'absolute', left: s.x, top: s.y,
              width: s.size, height: s.size, borderRadius: '50%',
              background: 'var(--color-decoration-sparkle)',
              boxShadow: 'var(--shadow-white-glow)'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 'var(--size-container-hero)',
        margin: '0 auto',
        padding: '0 var(--size-spacing-xl)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size-spacing-xl)',
          transition: 'all var(--animation-duration-slower) var(--animation-easing-ease)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
        }}>
          {/* Logo/Brand with Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            marginBottom: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '1.875rem', animation: 'bounce 2s infinite' }}>🌸</div>
            <h1 style={{ 
              color: 'white', 
              fontSize: 'var(--size-font-4xl)', 
              letterSpacing: '0.025em', 
              fontFamily: 'var(--font-family-sans)' 
            }}>MEGURI</h1>
            <div style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)' }}>巡</div>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(to right, #facc15, #fb923c)',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            animation: 'pulse 2s infinite',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <Sparkles style={{ height: '1rem', width: '1rem', color: 'white' }} />
            <span style={{ fontSize: '0.875rem', color: 'white' }}>アバターと一緒に成長する旅</span>
          </div>
          
          <h2
            style={{
              color: 'var(--color-text-inverse)',
              fontSize: 'var(--font-display-hero-size)',
              lineHeight: 'var(--font-display-hero-line)',
              letterSpacing: 'var(--font-display-hero-letter)',
              fontWeight: 'var(--font-display-hero-weight)',
              textWrap: 'balance',
              maxWidth: '960px',
              marginInline: 'auto',
              textShadow: '0 2px 12px rgba(0,0,0,.25)',
              fontFamily: 'var(--font-family-sans)'
            }}
          >
            今日の一歩で、<br />アバターが進化する。
          </h2>
          
          <p style={{
            fontSize: 'var(--size-font-xl)',
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: 'var(--size-container-md)',
            margin: '0 auto',
            lineHeight: '1.625',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontFamily: 'var(--font-family-sans)'
          }}>
            診断でタイプを知り、祈りと行動でアバターが進化。<br />
            バッジを集めて、現実の一歩がデジタルの成長に。<br />
            ゲームみたいに楽しく、ちゃんと前に進める。
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '1rem'
          }}>
            <button 
              onClick={onStartDiagnosis}
              style={{
                backgroundColor: 'var(--color-neutral-white)',
                color: 'var(--color-primary-blue-600)',
                padding: 'var(--size-spacing-lg) var(--size-spacing-2xl)',
                borderRadius: 'var(--border-radius-full)',
                boxShadow: 'var(--shadow-button)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--size-spacing-sm)',
                fontSize: 'var(--size-font-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer',
                transition: 'all var(--animation-duration-normal) var(--animation-easing-ease)'
              }}
            >
              <Zap style={{ height: '1.25rem', width: '1.25rem' }} />
              診断を始める（3分）
              <ArrowRight style={{ height: '1.25rem', width: '1.25rem' }} />
            </button>
            <button 
              onClick={onViewAvatar}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '1.75rem 2.5rem',
                borderRadius: '9999px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Trophy style={{ height: '1.25rem', width: '1.25rem' }} />
              アバターの進化を見る
            </button>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            paddingTop: '2rem'
          }}>
            {['5つのタイプ診断', 'バッジコレクション', 'アバター育成'].map((feature, index) => (
              <div 
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(4px)',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundColor: '#fde047',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></div>
                <span style={{ color: 'white', fontSize: '0.875rem' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>
        <div style={{ animation: 'bounce 2s infinite' }}>
          <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

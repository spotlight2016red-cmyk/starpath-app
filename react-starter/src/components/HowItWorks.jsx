import { UserCheck, CheckCircle, MapPin, TrendingUp, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    icon: UserCheck,
    emoji: "🎯",
    title: "診断する",
    description: "あなたのタイプと初期アバターが誕生。探検者？導き手？あなたはどのタイプ？",
    tip: "3分で完了",
  },
  {
    number: "02",
    icon: CheckCircle,
    emoji: "📝",
    title: "毎日の一歩を記録",
    description: "祈り/実行/気づきを記録するとアバターに経験値が入る。小さな一歩が成長につながる。",
    tip: "習慣化がカギ",
  },
  {
    number: "03",
    icon: MapPin,
    emoji: "📍",
    title: "聖地でチェックイン",
    description: "聖地や人に会ったとき、特別バッジを付与。現実の体験がアプリに記録される。",
    tip: "旅が冒険に",
  },
  {
    number: "04",
    icon: TrendingUp,
    emoji: "✨",
    title: "レベルアップ",
    description: "外見進化/称号解放でアバターが変化。SNSでシェアして友達に自慢しよう！",
    tip: "見える成長",
  },
  {
    number: "05",
    icon: Zap,
    emoji: "🚀",
    title: "次のクエスト",
    description: "新しいクエストが降りてくる。小さな一歩が続く仕組みで、自然と前に進める。",
    tip: "継続は力なり",
  },
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 150);
            });
            observer.disconnect();
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
        padding: '6rem 0',
        background: 'linear-gradient(to bottom, #dbeafe, #ffffff, #f0f9ff)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Flowing Path Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path 
            d="M 0,500 Q 250,350 500,500 T 1000,500" 
            stroke="url(#gradient)" 
            strokeWidth="100" 
            fill="none" 
            opacity="0.3"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span style={{
              background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
              color: 'white',
              padding: '0.25rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>How It Works</span>
          </div>
          <h2 style={{
            marginBottom: '1rem',
            background: 'linear-gradient(to right, var(--color-primary-blue-600), var(--color-primary-cyan-600))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: 'var(--size-font-5xl)',
            fontWeight: 'var(--font-weight-bold)',
            fontFamily: 'var(--font-family-sans)'
          }}>5つのステップで、冒険が始まる</h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            ゲーム感覚で楽しみながら、自然と成長する仕組み
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          position: 'relative'
        }}>
          {/* Connection Line (hidden on mobile) */}
          <div style={{
            display: 'none',
            '@media (min-width: 1024px)': {
              display: 'block',
              position: 'absolute',
              top: '6rem',
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(to right, #bfdbfe, #a5f3fc, #bfdbfe)',
              zIndex: 0,
              borderRadius: '9999px'
            }
          }}></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);
            return (
              <div 
                key={index} 
                style={{
                  position: 'relative',
                  zIndex: 10,
                  transition: 'all 0.5s ease',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
                }}
              >
                <div style={{
                  padding: '1.5rem',
                  height: '100%',
                  border: '2px solid #bfdbfe',
                  borderRadius: '1rem',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#60a5fa';
                  e.target.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.25)';
                  e.target.style.transform = 'scale(1.05) translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#bfdbfe';
                  e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '1rem'
                  }}>
                    {/* Emoji */}
                    <div style={{
                      fontSize: '3rem',
                      animation: `bounce 2s infinite`,
                      animationDelay: `${index * 0.2}s`
                    }}>
                      {step.emoji}
                    </div>
                    
                    {/* Icon Badge */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}>
                        <Icon style={{ height: '1.75rem', width: '1.75rem', color: 'white' }} />
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '-0.5rem',
                        right: '-0.5rem',
                        width: '1.75rem',
                        height: '1.75rem',
                        background: 'linear-gradient(to bottom right, #facc15, #fb923c)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        animation: 'pulse 2s infinite'
                      }}>
                        {step.number.slice(1)}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <h3 style={{
                        color: 'var(--color-neutral-gray-900)',
                        fontSize: 'var(--size-font-lg)',
                        fontWeight: 'var(--font-weight-bold)',
                        margin: 0,
                        fontFamily: 'var(--font-family-sans)'
                      }}>{step.title}</h3>
                      <p style={{
                        color: '#4b5563',
                        fontSize: '0.875rem',
                        lineHeight: '1.625',
                        margin: 0
                      }}>
                        {step.description}
                      </p>
                      <div style={{
                        display: 'inline-block',
                        background: 'linear-gradient(to right, #dbeafe, #cffafe)',
                        color: '#1d4ed8',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        marginTop: '0.5rem',
                        border: '1px solid #bfdbfe'
                      }}>
                        {step.tip}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fun Stats */}
        <div style={{
          marginTop: '5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {[
            { emoji: '🎮', number: '5タイプ', description: 'あなたはどれ？' },
            { emoji: '🏅', number: '50+', description: '集められるバッジ' },
            { emoji: '✨', number: '∞', description: '進化の可能性' },
            { emoji: '🚀', number: '毎日', description: '新しい冒険' }
          ].map((stat, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              <div style={{
                fontSize: '3rem',
                transition: 'animation 0.3s ease'
              }}>{stat.emoji}</div>
              <div style={{
                fontSize: '1.875rem',
                background: 'linear-gradient(to right, #2563eb, #0891b2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold'
              }}>{stat.number}</div>
              <p style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                margin: 0
              }}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

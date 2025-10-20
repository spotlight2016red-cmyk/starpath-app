import { TrendingUp, Award, Users, Calendar, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    icon: TrendingUp,
    emoji: "🌱",
    title: "アバター進化",
    description: "日々の祈り・タスク達成で経験値を獲得。レベルアップすると見た目が変化！成長が目に見えるから、続けるのが楽しい。",
    badge: "育成",
  },
  {
    icon: Award,
    emoji: "🏅",
    title: "バッジコレクション",
    description: "聖地チェックインや人との面会で特別バッジを獲得。集めるほど、あなたの旅の記録が豊かに。",
    badge: "コレクション",
  },
  {
    icon: Users,
    emoji: "✨",
    title: "5つのタイプ診断",
    description: "探検者/導き手/癒し手/変革者/調和者。あなたはどのタイプ？診断であなたの初期アバターが誕生します。",
    badge: "診断",
  },
  {
    icon: Calendar,
    emoji: "📅",
    title: "デイリー導線",
    description: "連続祈りカウント、今日の一歩カード。毎日のルーティンが自然と習慣に。小さな積み重ねが大きな変化を生む。",
    badge: "習慣化",
  },
  {
    icon: Sparkles,
    emoji: "💫",
    title: "物語演出",
    description: "星/光/オーラなど、軽やかな演出で「ワクワク」を継続。RPGのような体験で、現実の一歩が冒険になる。",
    badge: "体験",
  },
];

export default function Features() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
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
        background: 'linear-gradient(to bottom, #ffffff, #f0f9ff, #dbeafe)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorations */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.4,
        pointerEvents: 'none'
      }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              color: '#bfdbfe',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 10}px`,
            }}
          >
            ✦
          </div>
        ))}
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
            }}>Features</span>
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
          }}>成長を楽しむ、5つの仕掛け</h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            ゲームみたいに楽しいのに、ちゃんと自分が前に進んでる
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);
            return (
              <div 
                key={index} 
                style={{
                  padding: '2rem',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  border: '2px solid #dbeafe',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.5s ease',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  ':hover': {
                    boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
                    transform: 'scale(1.05) translateY(-8px)',
                    borderColor: '#93c5fd'
                  }
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.25)';
                  e.target.style.transform = 'scale(1.05) translateY(-8px)';
                  e.target.style.borderColor = '#93c5fd';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.borderColor = '#dbeafe';
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%'
                  }}>
                    <div style={{
                      fontSize: '2.25rem',
                      animation: `bounce 2s infinite`,
                      animationDelay: `${index * 0.1}s`
                    }}>
                      {feature.emoji}
                    </div>
                    <span style={{
                      background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      border: 'none'
                    }}>
                      {feature.badge}
                    </span>
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <Icon style={{ height: '1.5rem', width: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 style={{
                    color: 'var(--color-neutral-gray-900)',
                    fontSize: 'var(--size-font-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    margin: 0,
                    fontFamily: 'var(--font-family-sans)'
                  }}>{feature.title}</h3>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.625',
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
          
          {/* Empty card with Coming Soon */}
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(to bottom right, #dbeafe, #cffafe)',
            borderRadius: '1rem',
            border: '2px dashed #93c5fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#60a5fa';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#93c5fd';
            e.target.style.transform = 'scale(1)';
          }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                animation: 'pulse 2s infinite',
                marginBottom: '1rem'
              }}>🚀</div>
              <p style={{ color: '#2563eb', margin: 0 }}>
                さらなる機能を<br />開発中...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

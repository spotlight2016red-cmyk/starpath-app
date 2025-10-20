import { Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "田中 美咲",
    age: 28,
    type: "導き手",
    emoji: "🧭",
    content: "ゲームみたいに楽しいのに、ちゃんと自分が前に進んでる感がある。アバターがレベルアップするたびにワクワクします！",
    avatar: "TM",
  },
  {
    name: "佐々木 健太",
    age: 35,
    type: "探検者",
    emoji: "🗺️",
    content: "金比羅でチェックインしたらアバターが光った。現実とアプリがつながる感じが新しい。旅がもっと楽しくなりました！",
    avatar: "SK",
  },
  {
    name: "山本 リサ",
    age: 24,
    type: "癒し手",
    emoji: "🌸",
    content: "毎日の「祈りの一行」で気持ちが整う。自然と続けられるのが不思議。アバターの成長が励みになってます。",
    avatar: "YR",
  },
  {
    name: "中村 翔",
    age: 42,
    type: "変革者",
    emoji: "⚡",
    content: "バッジコレクションにハマってます（笑）。小さな達成感の積み重ねが、仕事にも良い影響を与えています。",
    avatar: "NS",
  },
  {
    name: "小林 あかり",
    age: 31,
    type: "調和者",
    emoji: "☯️",
    content: "友達と一緒に始めて、お互いのアバターを見せ合うのが楽しい！タイプが違うと進化の仕方も違って面白いです。",
    avatar: "KA",
  },
  {
    name: "高橋 大輔",
    age: 26,
    type: "探検者",
    emoji: "🗺️",
    content: "連続祈りカウントが途切れないよう、毎朝の習慣になりました。RPGみたいで、現実の一歩がクエストみたい。",
    avatar: "TD",
  },
];

export default function Testimonials() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonials.forEach((_, index) => {
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
        background: 'linear-gradient(to bottom, #f0f9ff, #ffffff, #dbeafe)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.2,
        pointerEvents: 'none'
      }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              color: '#93c5fd',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
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
            }}>Testimonials</span>
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
          }}>冒険を始めた仲間の声</h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            それぞれのタイプで、それぞれの成長を楽しんでいます
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleCards.includes(index);
            return (
              <div 
                key={index} 
                style={{
                  padding: '2rem',
                  border: '2px solid #bfdbfe',
                  borderRadius: '1rem',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.5s ease',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#93c5fd';
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
                  gap: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Quote style={{
                      height: '2rem',
                      width: '2rem',
                      color: '#93c5fd',
                      transition: 'color 0.3s ease'
                    }} />
                    <div style={{
                      fontSize: '1.875rem',
                      animation: `bounce 2s infinite`,
                      animationDelay: `${index * 0.1}s`
                    }}>
                      {testimonial.emoji}
                    </div>
                  </div>
                  <p style={{
                    color: '#374151',
                    lineHeight: '1.625',
                    margin: 0
                  }}>
                    {testimonial.content}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '2px solid #bfdbfe'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        height: '3rem',
                        width: '3rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        transition: 'transform 0.3s ease'
                      }}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div style={{
                          color: 'var(--color-neutral-gray-900)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontFamily: 'var(--font-family-sans)'
                        }}>{testimonial.name}</div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#6b7280'
                        }}>{testimonial.age}歳</div>
                      </div>
                    </div>
                    <span style={{
                      background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      border: 'none',
                      transition: 'box-shadow 0.3s ease'
                    }}>
                      {testimonial.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

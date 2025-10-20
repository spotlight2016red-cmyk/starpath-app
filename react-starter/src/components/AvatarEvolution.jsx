import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// タイプメタデータ
const TYPE_META = {
  explorer: {
    name: '探検者',
    icon: '🏹',
    gradient: 'from-amber-400 to-orange-500',
    seedWords: ['冒険', '発見', '挑戦', '未知']
  },
  guide: {
    name: '導き手',
    icon: '🔆',
    gradient: 'from-yellow-400 to-amber-500',
    seedWords: ['導く', '照らす', '勇気', '希望']
  },
  healer: {
    name: '癒し手',
    icon: '💧',
    gradient: 'from-blue-400 to-cyan-500',
    seedWords: ['癒し', '包容', '共感', '安らぎ']
  },
  reformer: {
    name: '変革者',
    icon: '⚡',
    gradient: 'from-purple-400 to-indigo-500',
    seedWords: ['変革', '革新', '自由', '創造']
  },
  harmonizer: {
    name: '調和者',
    icon: '⚖️',
    gradient: 'from-green-400 to-emerald-500',
    seedWords: ['調和', 'バランス', '平和', '調整']
  }
};

// Pill component
const Pill = ({ children }) => (
  <span className="px-2 py-0.5 rounded-full bg-black/5 text-xs font-medium">
    {children}
  </span>
);

export default function AvatarEvolution({ initialType = 'explorer', onExpChange }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('meguri-avatar@v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { type: initialType, totalExp: 0, streak: 0, badges: [] };
      }
    }
    return { type: initialType, totalExp: 0, streak: 0, badges: [] };
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('meguri-avatar@v1', JSON.stringify(state));
    if (onExpChange) {
      onExpChange(state.totalExp);
    }
  }, [state, onExpChange]);

  // Calculate level and stage
  const level = Math.floor(state.totalExp / 60) + 1;
  const stage = level <= 2 ? 1 : level <= 5 ? 2 : 3;
  const meta = TYPE_META[state.type];

  // Actions
  const pray = () => {
    setState(prev => ({
      ...prev,
      totalExp: prev.totalExp + 10,
      streak: prev.streak + 1
    }));
  };

  const deepTalk = () => {
    setState(prev => ({
      ...prev,
      totalExp: prev.totalExp + 30
    }));
  };

  const addBadge = (name) => {
    setState(prev => {
      if (prev.badges.includes(name)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, name],
        totalExp: prev.totalExp + 50
      };
    });
  };

  const resetAll = () => {
    if (confirm('全てをリセットしますか？')) {
      setState({ type: initialType, totalExp: 0, streak: 0, badges: [] });
    }
  };

  const cycleType = () => {
    const keys = Object.keys(TYPE_META);
    const idx = keys.indexOf(state.type);
    const next = keys[(idx + 1) % keys.length];
    setState(prev => ({ ...prev, type: next }));
  };

  // Visual演出値
  const auraOpacity = stage === 1 ? 0.25 : stage === 2 ? 0.45 : 0.65;
  const ringCount = stage === 1 ? 1 : stage === 2 ? 2 : 3;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-neutral-100 p-6">
      <div className="w-full max-w-xl rounded-2xl shadow-xl border border-black/5 bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
          <div className="flex items-center gap-2">
            <button
              onClick={cycleType}
              className="rounded-lg px-2 py-1 text-sm bg-black/5 hover:bg-black/10 active:scale-95 transition"
              title="タイプを順送り"
            >
              {meta.name}
            </button>
            <Pill>Lv.{level}</Pill>
            <Pill>連続 {state.streak} 日</Pill>
            <Pill>総EXP {state.totalExp}</Pill>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => addBadge('金比羅・奥社')} className="text-xs underline text-black/60 hover:text-black">
              +聖地スタンプ
            </button>
            <button onClick={resetAll} className="text-xs text-red-600 underline">リセット</button>
          </div>
        </div>

        {/* Avatar Stage */}
        <div className="relative p-8">
          <div className={`relative mx-auto h-56 w-56 rounded-full bg-gradient-to-br ${meta.gradient} shadow-inner shadow-black/10 flex items-center justify-center`}> 
            {/* Aura rings */}
            {[...Array(ringCount)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-white/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: auraOpacity, scale: 1 + i * 0.08 }}
                transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}

            {/* Core icon */}
            <motion.div
              key={stage}
              className="text-6xl select-none"
              initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
            >
              {meta.icon}
            </motion.div>

            {/* Stage ornament */}
            <AnimatePresence mode="wait">
              {stage >= 2 && (
                <motion.div
                  key="orn1"
                  className="absolute -inset-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.35 }}
                  exit={{ opacity: 0 }}
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <radialGradient id="g1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="100" cy="100" r="96" fill="url(#g1)" />
                  </svg>
                </motion.div>
              )}
              {stage >= 3 && (
                <motion.div
                  key="orn2"
                  className="absolute -inset-6"
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 0.35 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <g stroke="white" strokeOpacity="0.7" fill="none">
                      {[...Array(12)].map((_, i) => (
                        <circle key={i} cx="100" cy="100" r={30 + i * 6} opacity={0.15} />
                      ))}
                    </g>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Seed words */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {meta.seedWords.map((w) => (
              <span key={w} className="px-3 py-1 rounded-full bg-black/5 text-sm font-medium text-black/70">
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 border-t border-black/5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={pray}
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow hover:shadow-lg active:scale-95 transition"
            >
              祈りを記録 (+10 EXP)
            </button>
            <button
              onClick={deepTalk}
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow hover:shadow-lg active:scale-95 transition"
            >
              深い対話 (+30 EXP)
            </button>
          </div>
          
          {/* Badges */}
          {state.badges.length > 0 && (
            <div className="pt-3 border-t border-black/5">
              <div className="text-xs font-semibold text-black/60 mb-2">獲得バッジ</div>
              <div className="flex flex-wrap gap-2">
                {state.badges.map((b) => (
                  <span key={b} className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium shadow">
                    🏆 {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Level progress */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between text-xs text-black/60 mb-1">
            <span>Lv.{level}</span>
            <span>{state.totalExp % 60} / 60</span>
            <span>Lv.{level + 1}</span>
          </div>
          <div className="h-2 rounded-full bg-black/5 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${meta.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${(state.totalExp % 60) / 60 * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


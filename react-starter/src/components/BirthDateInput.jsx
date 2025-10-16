import React, { useState } from 'react';

export default function BirthDateInput({ onComplete }) {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [birthMinute, setBirthMinute] = useState('');
  const [birthPlace, setBirthPlace] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!birthYear || !birthMonth || !birthDay) {
      alert('生年月日を入力してください');
      return;
    }

    const birthDate = {
      year: parseInt(birthYear),
      month: parseInt(birthMonth),
      day: parseInt(birthDay),
      hour: birthHour ? parseInt(birthHour) : 12,
      minute: birthMinute ? parseInt(birthMinute) : 0,
      place: birthPlace || 'Tokyo'
    };

    // 生年月日を保存
    try {
      localStorage.setItem('starpath.birthDate', JSON.stringify(birthDate));
    } catch (e) {
      console.error('Failed to save birth date:', e);
    }

    onComplete(birthDate);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="birth-date-input">
      <h2 style={{ marginBottom: '1rem', color: 'var(--accent)', fontSize: '1.8rem' }}>
        🌟 あなたの生年月日を教えてください
      </h2>
      <p className="sub" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
        より精密な診断のために、生年月日を入力してください
      </p>

      <form onSubmit={handleSubmit}>
        {/* 生年月日 */}
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid var(--line)'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent)' }}>
            生年月日
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '100px' }}>
              <label className="sub" style={{ display: 'block', marginBottom: '0.5rem' }}>
                年
              </label>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="btn"
                style={{ width: '100%', padding: '0.8rem' }}
              >
                <option value="">選択</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '80px' }}>
              <label className="sub" style={{ display: 'block', marginBottom: '0.5rem' }}>
                月
              </label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="btn"
                style={{ width: '100%', padding: '0.8rem' }}
              >
                <option value="">選択</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '80px' }}>
              <label className="sub" style={{ display: 'block', marginBottom: '0.5rem' }}>
                日
              </label>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="btn"
                style={{ width: '100%', padding: '0.8rem' }}
              >
                <option value="">選択</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 出生時刻（任意） */}
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid var(--line)'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent)' }}>
            出生時刻（任意）
          </h3>
          <p className="sub" style={{ marginBottom: '1rem', fontSize: '1rem' }}>
            より精密な占星術のため、出生時刻がわかる場合は入力してください
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '100px' }}>
              <label className="sub" style={{ display: 'block', marginBottom: '0.5rem' }}>
                時
              </label>
              <select
                value={birthHour}
                onChange={(e) => setBirthHour(e.target.value)}
                className="btn"
                style={{ width: '100%', padding: '0.8rem' }}
              >
                <option value="">不明</option>
                {hours.map(hour => (
                  <option key={hour} value={hour}>{hour}時</option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '100px' }}>
              <label className="sub" style={{ display: 'block', marginBottom: '0.5rem' }}>
                分
              </label>
              <select
                value={birthMinute}
                onChange={(e) => setBirthMinute(e.target.value)}
                className="btn"
                style={{ width: '100%', padding: '0.8rem' }}
              >
                <option value="">不明</option>
                {minutes.map(minute => (
                  <option key={minute} value={minute}>{minute}分</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 出生場所（任意） */}
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(143, 211, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid var(--line)'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent)' }}>
            出生場所（任意）
          </h3>
          <p className="sub" style={{ marginBottom: '1rem', fontSize: '1rem' }}>
            より精密な占星術のため、出生場所がわかる場合は入力してください
          </p>
          <input
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            placeholder="例: 東京"
            className="btn"
            style={{ width: '100%', padding: '0.8rem' }}
          />
        </div>

        {/* 送信ボタン */}
        <button type="submit" className="btn" style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', fontWeight: '600' }}>
          次へ進む
        </button>
      </form>
    </div>
  );
}


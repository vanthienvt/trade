
import React from 'react';
import { View, MarketSignal, SignalType } from '../types';

interface Props {
  onNavigate: (view: View, signal?: MarketSignal) => void;
}

const SIGNALS: MarketSignal[] = [
  {
    id: 'eth',
    pair: 'ETH/USDT',
    exchange: 'Binance Perp',
    price: 2450.00,
    change24h: 3.2,
    type: SignalType.LONG,
    confidence: 92,
    timeframe: '1H',
    timestamp: 'Vừa xong',
    summary: 'Volume đột biến, phá vỡ cản trên.'
  },
  {
    id: 'ada',
    pair: 'ADA/USDT',
    exchange: 'Binance Perp',
    price: 0.455,
    change24h: -1.5,
    type: SignalType.SHORT,
    confidence: 85,
    timeframe: '4H',
    timestamp: '5m trước',
    summary: 'Mô hình nêm giảm, RSI phân kỳ.'
  },
  {
    id: 'sol',
    pair: 'SOL/USDT',
    exchange: 'Binance Perp',
    price: 145.20,
    change24h: 5.2,
    type: SignalType.LONG,
    confidence: 88,
    timeframe: '15m',
    timestamp: '12m trước',
    summary: 'Dòng tiền thông minh nhập cuộc.'
  },
  {
    id: 'xrp',
    pair: 'XRP/USDT',
    exchange: 'Binance Perp',
    price: 0.615,
    change24h: 0.8,
    type: SignalType.SHORT,
    confidence: 79,
    timeframe: '1D',
    timestamp: '25m trước',
    summary: 'Chạm kháng cự mạnh khung ngày.'
  }
];

const SignalList: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold">Tín Hiệu AI</h1>
          <p className="text-xs text-text-secondary font-medium">Cập nhật: Vừa xong</p>
        </div>
        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        {['Tất cả', 'Long (Mua)', 'Short (Bán)', 'Uy tín cao'].map((chip, i) => (
          <button 
            key={i} 
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${i === 0 ? 'bg-white text-background shadow-lg' : 'bg-surface text-text-secondary border border-white/5'}`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="px-4 py-2 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">Cơ hội mới nhất</h3>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-10">
        {SIGNALS.map((signal) => (
          <div 
            key={signal.id}
            onClick={() => onNavigate('setup', signal)}
            className="group relative flex flex-col gap-4 rounded-2xl bg-surface p-5 border border-white/5 transition-all active:scale-[0.98] cursor-pointer hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-[28px]">token</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold">{signal.pair}</h4>
                    <span className="rounded bg-background px-1.5 py-0.5 text-[10px] font-extrabold text-text-secondary border border-white/5">{signal.timeframe}</span>
                  </div>
                  <p className="text-xs font-medium text-text-secondary mt-0.5 tracking-tight">Entry: ${signal.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-black uppercase tracking-wider ${signal.type === SignalType.LONG ? 'bg-bullish/10 text-bullish' : 'bg-bearish/10 text-bearish'}`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {signal.type === SignalType.LONG ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                  {signal.type}
                </span>
                <span className="text-[11px] font-bold text-primary">{signal.confidence}% Uy tín</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 rounded-xl bg-background/50 px-3 py-2.5">
              <span className="material-symbols-outlined text-primary text-[18px]">tips_and_updates</span>
              <p className="truncate text-[11px] font-semibold text-text-secondary">{signal.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignalList;

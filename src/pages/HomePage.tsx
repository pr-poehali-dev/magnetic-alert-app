import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const KP_DATA = {
  current: 5.3,
  level: "moderate" as const,
  label: "Умеренная буря",
  next: { time: "через 6 ч", kp: 7.2, label: "Сильная буря" },
  updated: "сегодня в 14:30",
};

const LEVEL_CONFIG = {
  calm: { color: "#22c55e", glow: "glow-green", label: "Спокойно", text: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
  minor: { color: "#eab308", glow: "glow-yellow", label: "Слабая буря", text: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  moderate: { color: "#f97316", glow: "glow-orange", label: "Умеренная буря", text: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
  strong: { color: "#ef4444", glow: "glow-red", label: "Сильная буря", text: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  extreme: { color: "#a855f7", glow: "glow-purple", label: "Экстремальная", text: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
};

const QUICK_STATS = [
  { label: "Kp сейчас", value: "5.3", unit: "", icon: "Activity" },
  { label: "Макс. сегодня", value: "6.8", unit: "Kp", icon: "TrendingUp" },
  { label: "До бури", value: "6", unit: "ч", icon: "Clock" },
  { label: "Длительность", value: "12", unit: "ч", icon: "Timer" },
];

export default function HomePage() {
  const [animVal, setAnimVal] = useState(0);
  const cfg = LEVEL_CONFIG[KP_DATA.level];

  useEffect(() => {
    const t = setTimeout(() => setAnimVal(KP_DATA.current), 100);
    return () => clearTimeout(t);
  }, []);

  const angle = (animVal / 9) * 160 - 80;

  return (
    <div className="flex flex-col gap-5 pb-6 animate-fade-in">
      {/* Alert Banner */}
      <div className={`glass border rounded-2xl p-4 flex items-center gap-3 ${cfg.bg}`} style={{ animationDelay: "0.1s" }}>
        <div className="relative flex-shrink-0">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.color }} />
          <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ backgroundColor: cfg.color, opacity: 0.4 }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm ${cfg.text}`}>{cfg.label} — Kp {KP_DATA.current}</p>
          <p className="text-xs text-muted-foreground">Следующий пик: {KP_DATA.next.label} {KP_DATA.next.time}</p>
        </div>
        <Icon name="Bell" size={18} className={cfg.text} />
      </div>

      {/* Main Kp Gauge */}
      <div className="glass rounded-3xl p-6 flex flex-col items-center gap-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-20" style={{
          background: `radial-gradient(circle at 50% 80%, ${cfg.color}40 0%, transparent 60%)`
        }} />

        <p className="text-muted-foreground text-sm font-medium relative z-10">Индекс геомагнитной активности</p>

        {/* Gauge SVG */}
        <div className="relative z-10 animate-float" style={{ animationDuration: "5s" }}>
          <svg width="220" height="130" viewBox="0 0 220 130">
            {/* Background arc */}
            <path
              d="M 20 120 A 90 90 0 0 1 200 120"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Colored arc segments */}
            {[
              { color: "#22c55e", dasharray: "50 282" },
              { color: "#eab308", dasharray: "50 282", dashoffset: "-50" },
              { color: "#f97316", dasharray: "50 282", dashoffset: "-100" },
              { color: "#ef4444", dasharray: "50 282", dashoffset: "-150" },
              { color: "#a855f7", dasharray: "32 282", dashoffset: "-200" },
            ].map((seg, i) => (
              <path
                key={i}
                d="M 20 120 A 90 90 0 0 1 200 120"
                fill="none"
                stroke={seg.color}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={seg.dasharray}
                strokeDashoffset={seg.dashoffset || "0"}
                opacity={0.5}
              />
            ))}
            {/* Needle */}
            <g transform={`rotate(${angle}, 110, 120)`}>
              <line x1="110" y1="120" x2="110" y2="44" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity={0.9} />
              <circle cx="110" cy="120" r="6" fill="white" opacity={0.9} />
            </g>
            {/* Labels */}
            <text x="14" y="140" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle">0</text>
            <text x="110" y="20" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle">4.5</text>
            <text x="206" y="140" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle">9</text>
          </svg>
        </div>

        {/* Big Kp number */}
        <div className="text-center relative z-10 -mt-4">
          <div className="font-unbounded font-black text-6xl leading-none" style={{ color: cfg.color, textShadow: `0 0 30px ${cfg.color}80` }}>
            {KP_DATA.current}
          </div>
          <div className={`text-sm font-semibold mt-1 ${cfg.text}`}>{cfg.label}</div>
          <div className="text-xs text-muted-foreground mt-1">Обновлено {KP_DATA.updated}</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        {QUICK_STATS.map((stat, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-4 flex flex-col gap-2"
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className="flex items-center gap-2">
              <Icon name={stat.icon} size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="font-unbounded font-bold text-xl text-foreground">
              {stat.value}<span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Forecast strip */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-foreground">Прогноз на 24 часа</p>
          <span className="text-xs text-muted-foreground">по данным NOAA</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[2.1, 3.4, 5.3, 6.8, 7.2, 5.9, 4.1, 3.0, 2.5, 4.2, 6.1, 4.8].map((kp, i) => {
            const pct = (kp / 9) * 100;
            const color = kp < 3 ? "#22c55e" : kp < 5 ? "#eab308" : kp < 7 ? "#f97316" : "#ef4444";
            const isNow = i === 2;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-sm relative overflow-hidden" style={{ height: `${pct}%`, minHeight: 4, backgroundColor: color + "40", border: isNow ? `1px solid ${color}` : "none" }}>
                  <div className="absolute inset-0 rounded-sm animate-bar-grow" style={{ backgroundColor: color + "80" }} />
                  {isNow && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: color }} />}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">сейчас</span>
          <span className="text-xs text-muted-foreground">+24ч</span>
        </div>
      </div>

      {/* Status */}
      <div className="glass rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${cfg.color}20`, border: `1px solid ${cfg.color}40` }}>
          <Icon name="Shield" size={22} style={{ color: cfg.color }} />
        </div>
        <div>
          <p className="text-sm font-semibold">Рекомендация</p>
          <p className="text-xs text-muted-foreground mt-0.5">Людям с сердечно-сосудистыми заболеваниями следует ограничить физическую активность</p>
        </div>
      </div>
    </div>
  );
}
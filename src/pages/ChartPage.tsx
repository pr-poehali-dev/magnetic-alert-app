import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import Icon from "@/components/ui/icon";

const WEEK_DATA = [
  { day: "Пн", date: "28 апр", kp: 1.8, max: 2.3 },
  { day: "Вт", date: "29 апр", kp: 3.4, max: 4.1 },
  { day: "Ср", date: "30 апр", kp: 6.2, max: 7.8 },
  { day: "Чт", date: "1 мая", kp: 5.3, max: 6.8 },
  { day: "Пт", date: "2 мая", kp: 2.9, max: 3.5 },
  { day: "Сб", date: "3 мая", kp: 4.1, max: 5.0 },
  { day: "Вс", date: "4 мая", kp: 5.3, max: 5.3 },
];

const MONTH_DATA = [
  { day: "1", kp: 2.1 }, { day: "3", kp: 1.5 }, { day: "5", kp: 3.8 },
  { day: "7", kp: 5.2 }, { day: "9", kp: 4.1 }, { day: "11", kp: 6.7 },
  { day: "13", kp: 7.8 }, { day: "15", kp: 3.2 }, { day: "17", kp: 2.0 },
  { day: "19", kp: 1.8 }, { day: "21", kp: 4.5 }, { day: "23", kp: 6.1 },
  { day: "25", kp: 5.3 }, { day: "27", kp: 2.7 }, { day: "29", kp: 3.9 },
  { day: "1", kp: 5.3 },
];

const DAY_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  kp: [1.2, 1.0, 1.5, 2.0, 2.8, 3.1, 4.2, 4.8, 5.3, 5.9, 6.2, 6.8, 7.1, 6.5, 5.8, 5.3, 4.7, 4.1, 3.8, 3.5, 4.2, 5.1, 5.3, 5.3][i],
}));

const PERIODS = [
  { id: "day", label: "День", data: DAY_DATA, xKey: "hour" },
  { id: "week", label: "Неделя", data: WEEK_DATA, xKey: "day" },
  { id: "month", label: "Месяц", data: MONTH_DATA, xKey: "day" },
];

function getColor(kp: number) {
  if (kp < 3) return "#22c55e";
  if (kp < 5) return "#eab308";
  if (kp < 7) return "#f97316";
  if (kp < 8) return "#ef4444";
  return "#a855f7";
}

function getLevel(kp: number) {
  if (kp < 3) return { label: "Спокойно", text: "text-green-400" };
  if (kp < 5) return { label: "Слабая", text: "text-yellow-400" };
  if (kp < 7) return { label: "Умеренная", text: "text-orange-400" };
  if (kp < 8) return { label: "Сильная", text: "text-red-400" };
  return { label: "Экстремальная", text: "text-purple-400" };
}

interface TooltipProps { active?: boolean; payload?: Array<{ value: number }>; label?: string; }

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  const kp = payload[0]?.value;
  const color = getColor(kp);
  const level = getLevel(kp);
  return (
    <div className="glass-strong rounded-xl p-3 min-w-[120px]">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-unbounded font-bold text-lg" style={{ color }}>Kp {kp}</p>
      <p className={`text-xs font-medium ${level.text}`}>{level.label}</p>
    </div>
  );
};

const STATS = [
  { label: "Среднее", value: "4.1", unit: "Kp", icon: "BarChart2", color: "text-primary" },
  { label: "Максимум", value: "7.8", unit: "Kp", icon: "TrendingUp", color: "text-red-400" },
  { label: "Бурь", value: "3", unit: "за мес.", icon: "Zap", color: "text-orange-400" },
  { label: "Спокойных", value: "18", unit: "дней", icon: "CheckCircle", color: "text-green-400" },
];

export default function ChartPage() {
  const [period, setPeriod] = useState("week");
  const current = PERIODS.find(p => p.id === period)!;
  const maxKp = Math.max(...current.data.map((d) => (d as { kp: number }).kp));
  const avgKp = (current.data.reduce((s: number, d) => s + (d as { kp: number }).kp, 0) / current.data.length).toFixed(1);
  const gradId = `kp-grad-${period}`;

  return (
    <div className="flex flex-col gap-5 pb-6 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 30% 50%, #06b6d4 0%, transparent 60%)" }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-cyan-500/10 border border-cyan-500/30">
            <Icon name="BarChart2" size={24} className="text-cyan-400" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Геомагнитная активность</p>
            <p className="text-xs text-muted-foreground mt-0.5">Динамика индекса Kp</p>
          </div>
        </div>
      </div>

      {/* Period selector */}
      <div className="glass rounded-2xl p-1 flex gap-1">
        {PERIODS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              period === p.id
                ? "bg-primary text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chart card */}
      <div className="glass rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-8" style={{ background: "radial-gradient(circle at 50% 100%, #7c3aed20 0%, transparent 60%)" }} />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <p className="text-xs text-muted-foreground">Текущий / Средний</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-unbounded font-black text-3xl" style={{ color: getColor(5.3) }}>5.3</span>
              <span className="text-sm text-muted-foreground">/ ср. {avgKp} Kp</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Макс. период</p>
            <p className="font-unbounded font-bold text-xl text-red-400 mt-0.5">{maxKp}</p>
          </div>
        </div>

        <div className="h-44 relative z-10 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={current.data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey={current.xKey}
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={period === "day" ? 3 : 0}
              />
              <YAxis
                domain={[0, 9]}
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 3, 5, 7, 9]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
              <ReferenceLine y={5} stroke="#f97316" strokeDasharray="4 4" strokeOpacity={0.4} />
              <ReferenceLine y={7} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.4} />
              <Area
                type="monotone"
                dataKey="kp"
                stroke="url(#aurora-stroke)"
                strokeWidth={2.5}
                fill={`url(#${gradId})`}
                dot={false}
                activeDot={{ r: 5, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Reference lines legend */}
        <div className="flex gap-4 mt-3 relative z-10">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-px border-t border-dashed border-orange-500/60" />
            <span className="text-xs text-orange-400/70">Kp 5</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-px border-t border-dashed border-red-500/60" />
            <span className="text-xs text-red-400/70">Kp 7</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {STATS.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon name={s.icon} size={15} className={s.color} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div className="font-unbounded font-bold text-xl text-foreground">
              {s.value}<span className="text-sm font-normal text-muted-foreground ml-1">{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly calendar heatmap */}
      <div className="glass rounded-2xl p-4">
        <p className="text-sm font-semibold text-foreground mb-3">Последние 7 дней</p>
        <div className="flex gap-2">
          {WEEK_DATA.map((d, i) => {
            const color = getColor(d.max);
            const level = getLevel(d.max);
            const isToday = i === WEEK_DATA.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-xl flex flex-col items-center justify-end py-2 px-1 relative overflow-hidden transition-all duration-300"
                  style={{
                    height: 72,
                    background: `${color}18`,
                    border: `1px solid ${color}${isToday ? "60" : "25"}`,
                  }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-b-xl transition-all duration-700"
                    style={{
                      height: `${(d.kp / 9) * 100}%`,
                      background: `${color}30`,
                    }}
                  />
                  <span className="font-unbounded font-bold text-xs relative z-10" style={{ color }}>
                    {d.kp}
                  </span>
                </div>
                <span className={`text-xs font-medium ${isToday ? "text-foreground" : "text-muted-foreground"}`}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
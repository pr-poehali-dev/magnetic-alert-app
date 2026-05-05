import Icon from "@/components/ui/icon";
import { useState } from "react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "warning",
    title: "Умеренная буря через 6 часов",
    desc: "Прогнозируется усиление до Kp 7.2 — примите меры заблаговременно",
    time: "Сегодня, 14:30",
    kp: 7.2,
    level: "strong",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    title: "Началась магнитная буря",
    desc: "Текущий индекс Kp достиг 5.3 — умеренная геомагнитная активность",
    time: "Сегодня, 12:00",
    kp: 5.3,
    level: "moderate",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Активность снижается",
    desc: "Индекс Kp опустился до 3.1. Геомагнитная обстановка нормализуется",
    time: "Вчера, 22:15",
    kp: 3.1,
    level: "minor",
    read: true,
  },
  {
    id: 4,
    type: "alert",
    title: "Сильная буря завершилась",
    desc: "Буря продолжалась 14 часов. Максимальное значение Kp 7.8",
    time: "Вчера, 08:00",
    kp: 7.8,
    level: "strong",
    read: true,
  },
  {
    id: 5,
    type: "info",
    title: "Спокойный период",
    desc: "Геомагнитная активность минимальна. Kp ниже 2.0",
    time: "3 дня назад",
    kp: 1.8,
    level: "calm",
    read: true,
  },
];

const LEVEL_CFG = {
  calm: { color: "#22c55e", bg: "bg-green-500/10", border: "border-green-500/25", text: "text-green-400" },
  minor: { color: "#eab308", bg: "bg-yellow-500/10", border: "border-yellow-500/25", text: "text-yellow-400" },
  moderate: { color: "#f97316", bg: "bg-orange-500/10", border: "border-orange-500/25", text: "text-orange-400" },
  strong: { color: "#ef4444", bg: "bg-red-500/10", border: "border-red-500/25", text: "text-red-400" },
  extreme: { color: "#a855f7", bg: "bg-purple-500/10", border: "border-purple-500/25", text: "text-purple-400" },
};

type Level = keyof typeof LEVEL_CFG;

export default function NotificationsPage() {
  const [enabled, setEnabled] = useState(true);
  const [threshold, setThreshold] = useState(5);

  return (
    <div className="flex flex-col gap-5 pb-6 animate-fade-in">
      {/* Push settings card */}
      <div className="glass rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 50%, #7c3aed 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-foreground">Push-уведомления</p>
              <p className="text-xs text-muted-foreground mt-0.5">За 8 часов до начала бури</p>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${enabled ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${enabled ? "left-7" : "left-1"}`} />
            </button>
          </div>

          <div className="border-t border-white/5 pt-4">
            <p className="text-xs text-muted-foreground mb-3">Порог уведомления: Kp ≥ {threshold}</p>
            <div className="flex gap-2">
              {[3, 4, 5, 6, 7].map((val) => (
                <button
                  key={val}
                  onClick={() => setThreshold(val)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    threshold === val
                      ? "bg-primary text-white shadow-lg"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Unread count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-foreground">История</p>
        <span className="text-xs bg-primary/20 text-primary px-2.5 py-1 rounded-full font-medium">
          {NOTIFICATIONS.filter(n => !n.read).length} новых
        </span>
      </div>

      {/* Notification list */}
      <div className="flex flex-col gap-3">
        {NOTIFICATIONS.map((notif, i) => {
          const cfg = LEVEL_CFG[notif.level as Level];
          return (
            <div
              key={notif.id}
              className={`glass rounded-2xl p-4 border transition-all duration-200 ${cfg.border} ${!notif.read ? "border-opacity-60" : "border-opacity-20 opacity-70"}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${cfg.bg}`}>
                  <Icon
                    name={notif.type === "warning" ? "AlertTriangle" : notif.type === "alert" ? "Zap" : "Info"}
                    size={16}
                    style={{ color: cfg.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground leading-tight">{notif.title}</p>
                    {!notif.read && <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{notif.desc}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                    <span className={`text-xs font-semibold ${cfg.text}`}>Kp {notif.kp}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

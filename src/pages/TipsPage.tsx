import Icon from "@/components/ui/icon";
import { useState } from "react";

const LEVELS = [
  { id: "calm", label: "Спокойно", kp: "Kp 0–2", color: "#22c55e", bg: "bg-green-500/10", border: "border-green-500/30" },
  { id: "minor", label: "Слабая", kp: "Kp 3–4", color: "#eab308", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  { id: "moderate", label: "Умеренная", kp: "Kp 5–6", color: "#f97316", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  { id: "strong", label: "Сильная", kp: "Kp 7–8", color: "#ef4444", bg: "bg-red-500/10", border: "border-red-500/30" },
  { id: "extreme", label: "Сильнейшая", kp: "Kp 9", color: "#a855f7", bg: "bg-purple-500/10", border: "border-purple-500/30" },
];

const TIPS = {
  calm: [
    { icon: "Heart", title: "Нормальный режим", body: "Геомагнитная активность минимальна. Все обычные дела в порядке." },
    { icon: "Sun", title: "Отличное время", body: "Хороший момент для важных встреч, сложных задач и физической активности." },
    { icon: "Star", title: "Отдых и сон", body: "Сон будет глубоким и восстанавливающим. Используйте период для отдыха." },
  ],
  minor: [
    { icon: "Activity", title: "Слабое влияние", body: "Большинство людей не почувствует изменений. Чувствительные люди могут заметить лёгкую усталость." },
    { icon: "Droplets", title: "Больше воды", body: "Увеличьте потребление воды до 2–2.5 литров в день." },
    { icon: "Wind", title: "Свежий воздух", body: "Короткие прогулки на свежем воздухе помогут поддержать тонус." },
  ],
  moderate: [
    { icon: "AlertCircle", title: "Группы риска", body: "Гипертоники и сердечники — измеряйте давление 2 раза в день, имейте лекарства при себе." },
    { icon: "Minus", title: "Снизьте нагрузки", body: "Отложите интенсивные тренировки. Замените на лёгкую растяжку или прогулку." },
    { icon: "Moon", title: "Режим сна", body: "Ложитесь не позже 23:00. Перед сном проветрите комнату." },
    { icon: "Coffee", title: "Меньше кофеина", body: "Ограничьте кофе и крепкий чай — они повышают нагрузку на сосуды." },
  ],
  strong: [
    { icon: "Zap", title: "Высокий риск", body: "Людям с сердечно-сосудистыми заболеваниями — строгий постельный режим при необходимости." },
    { icon: "Phone", title: "Будьте на связи", body: "Пожилые родственники должны быть под наблюдением. Проверьте их самочувствие." },
    { icon: "Shield", title: "Отложите решения", body: "Не принимайте важных финансовых решений — концентрация снижена." },
    { icon: "Car", title: "Осторожно на дороге", body: "Замедленная реакция водителей увеличивает аварийность. Соблюдайте дистанцию." },
    { icon: "Pill", title: "Профилактика", body: "При наличии назначений врача — примите профилактические препараты." },
  ],
  extreme: [
    { icon: "AlertTriangle", title: "Экстремальная буря", body: "Максимальный уровень опасности. Минимизируйте активность весь день." },
    { icon: "Home", title: "Оставайтесь дома", body: "Если возможно — проведите день дома. Избегайте физических и эмоциональных нагрузок." },
    { icon: "Wifi", title: "Техника может сбоить", body: "Возможны сбои навигации, связи, электроники. Сохраните важные данные." },
    { icon: "Heart", title: "Вызов врача", body: "При ухудшении самочувствия — немедленно обратитесь за медицинской помощью." },
    { icon: "Eye", title: "Наблюдение", body: "Люди с эпилепсией, мигренями и психическими расстройствами — усиленный контроль состояния." },
  ],
};

type LevelId = keyof typeof TIPS;

export default function TipsPage() {
  const [active, setActive] = useState<LevelId>("moderate");
  const cfg = LEVELS.find(l => l.id === active)!;
  const tips = TIPS[active];

  return (
    <div className="flex flex-col gap-5 pb-6 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 20% 50%, ${cfg.color} 0%, transparent 60%)` }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.bg} border ${cfg.border}`}>
            <Icon name="BookOpen" size={24} style={{ color: cfg.color }} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Советы и рекомендации</p>
            <p className="text-xs text-muted-foreground mt-0.5">Выберите уровень активности</p>
          </div>
        </div>
      </div>

      {/* Level selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {LEVELS.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setActive(lvl.id as LevelId)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
              active === lvl.id
                ? `${lvl.bg} ${lvl.border}`
                : "glass border-white/5 text-muted-foreground hover:text-foreground"
            }`}
            style={{ color: active === lvl.id ? lvl.color : undefined }}
          >
            <span>{lvl.label}</span>
            <span className="block text-xs opacity-60">{lvl.kp}</span>
          </button>
        ))}
      </div>

      {/* Active level badge */}
      <div className={`rounded-2xl p-3 px-4 flex items-center gap-3 ${cfg.bg} border ${cfg.border}`}>
        <div className="w-2 h-2 rounded-full animate-pulse-dot flex-shrink-0" style={{ backgroundColor: cfg.color }} />
        <p className="text-sm font-semibold" style={{ color: cfg.color }}>
          {cfg.label} буря — {cfg.kp}
        </p>
        <span className="ml-auto text-xs text-muted-foreground">{tips.length} советов</span>
      </div>

      {/* Tips */}
      <div className="flex flex-col gap-3">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-4 flex gap-3 items-start animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg} border ${cfg.border}`}>
              <Icon name={tip.icon} size={18} style={{ color: cfg.color }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">{tip.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="glass rounded-xl p-3 flex gap-2 items-start opacity-60">
        <Icon name="Info" size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Рекомендации носят информационный характер. При наличии хронических заболеваний — консультируйтесь с врачом.
        </p>
      </div>
    </div>
  );
}

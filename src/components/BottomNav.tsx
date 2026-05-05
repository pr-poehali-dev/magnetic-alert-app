import { useLocation, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { path: "/", icon: "Home", label: "Главная" },
  { path: "/notifications", icon: "Bell", label: "Уведомления" },
  { path: "/tips", icon: "BookOpen", label: "Советы" },
  { path: "/chart", icon: "BarChart2", label: "График" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
      <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-around max-w-md mx-auto" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${active ? "nav-active" : ""}`}
            >
              <Icon
                name={item.icon}
                size={22}
                className={active ? "text-primary" : "text-muted-foreground"}
              />
              <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

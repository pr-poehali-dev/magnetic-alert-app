import { ReactNode } from "react";
import BottomNav from "@/components/BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-cosmic">
      {/* Stars bg */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() > 0.8 ? 2 : 1,
              height: Math.random() > 0.8 ? 2 : 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `pulse-dot ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 px-4 pt-safe-top">
        <div className="flex items-center justify-between py-4 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl aurora-gradient flex items-center justify-center">
              <span className="text-white text-xs font-black">Kp</span>
            </div>
            <span className="font-golos font-bold text-base text-foreground tracking-tight">{title}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
            <span className="text-xs text-muted-foreground">NOAA Live</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 max-w-md mx-auto pb-32">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}

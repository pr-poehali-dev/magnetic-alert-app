import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import HomePage from "./pages/HomePage";
import NotificationsPage from "./pages/NotificationsPage";
import TipsPage from "./pages/TipsPage";
import ChartPage from "./pages/ChartPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PAGE_TITLES: Record<string, string> = {
  "/": "MagStorm",
  "/notifications": "Уведомления",
  "/tips": "Советы",
  "/chart": "График",
};

function AppRoutes() {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? "MagStorm";

  return (
    <AppLayout title={title}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

<div className="flex items-center justify-between p-4">
  <div className="flex items-center gap-3">
    <img src="/club-logo.png" alt="شعار النادي" className="h-12 w-auto object-contain" />
    <img src="/event-logo.png" alt="شعار الفعالية" className="h-12 w-auto object-contain" />
  </div>

  <h1 className="text-xl font-bold text-slate-800">زكاة العلم نشره</h1>
</div>

export default App;

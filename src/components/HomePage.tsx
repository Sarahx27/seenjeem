import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Sparkles } from 'lucide-react';

const HomePage = () => {
  const { setCurrentScreen } = useGame();

  return (
    <div className="min-h-screen gradient-primary flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-7xl font-black tracking-tight mb-4 animate-scale-in">
            سين جيم
          </h1>
          <p className="text-xl text-foreground/80">
            لعبة الأسئلة التقنية التنافسية
          </p>
        </div>

        <div className="w-full h-1 bg-gradient-accent rounded-full shadow-glow"></div>

        <Button
          onClick={() => setCurrentScreen('category-selection')}
          size="lg"
          className="text-xl px-12 py-8 bg-accent hover:bg-accent/90 shadow-glow animate-pulse-glow font-bold"
        >
          <Sparkles className="ml-2 w-6 h-6" />
          ابدأ اللعبة
        </Button>

        <p className="text-sm text-foreground/60 mt-8">
          زكاة العلم نشره
        </p>
      </div>
    </div>
  );
};

<div className="bg-white/80 backdrop-blur-md shadow-sm rounded-xl border border-slate-200 flex items-center justify-between p-4">
  <div className="flex items-center gap-3">
    <img src="/club-logo.png" alt="شعار النادي" className="h-12 w-auto object-contain" />
    <img src="/event-logo.png" alt="شعار الفعالية" className="h-12 w-auto object-contain" />
  </div>

  <h1 className="text-xl font-bold text-slate-800">زكاة العلم نشره</h1>
</div>


export default HomePage;

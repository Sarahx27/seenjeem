import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw } from 'lucide-react';

const WinnerScreen = () => {
  const { teams, resetGame } = useGame();

  const winner = teams.reduce((prev, current) => 
    current.score > prev.score ? current : prev
  );

  const winnerIndex = teams.indexOf(winner);

  return (
    <div className="min-h-screen gradient-primary flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="text-center space-y-8 max-w-2xl">
        <Trophy className="w-32 h-32 mx-auto animate-pulse-glow" style={{ color: winnerIndex === 0 ? 'hsl(var(--team1))' : 'hsl(var(--team2))' }} />
        
        <div className="space-y-4">
          <h1 className="text-6xl font-black animate-scale-in">
            🎉 مبروك! 🎉
          </h1>
          <h2 className="text-4xl font-bold" style={{ color: winnerIndex === 0 ? 'hsl(var(--team1))' : 'hsl(var(--team2))' }}>
            {winner.name}
          </h2>
          <p className="text-3xl">فاز باللعبة!</p>
        </div>

        <div className="bg-card rounded-lg p-8 space-y-4">
          <h3 className="text-2xl font-bold">النتيجة النهائية</h3>
          <div className="grid grid-cols-2 gap-4">
            {teams.map((team, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted">
                <div className="font-bold mb-2" style={{ color: index === 0 ? 'hsl(var(--team1))' : 'hsl(var(--team2))' }}>
                  {team.name}
                </div>
                <div className="text-3xl font-black">{team.score}</div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={resetGame}
          size="lg"
          className="text-xl px-12 py-8 bg-accent hover:bg-accent/90 shadow-glow font-bold"
        >
          <RotateCcw className="ml-2 w-6 h-6" />
          العب مرة أخرى
        </Button>
      </div>
    </div>
  );
};

export default WinnerScreen;

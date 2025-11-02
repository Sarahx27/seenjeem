import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';
import { Category } from '@/data/gameData';
import { Check } from 'lucide-react';

const CategorySelection = () => {
  const { allCategories, setSelectedCategories, setCurrentScreen, teams, setTeams } = useGame();
  const [selected, setSelected] = useState<number[]>([]);
  const [teamNames, setTeamNames] = useState({ team1: teams[0].name, team2: teams[1].name });

  const toggleCategory = (categoryId: number) => {
    if (selected.includes(categoryId)) {
      setSelected(selected.filter(id => id !== categoryId));
    } else if (selected.length < 6) {
      setSelected([...selected, categoryId]);
    }
  };

  const handleStart = () => {
    const selectedCats = allCategories.filter(cat => selected.includes(cat.id));
    setSelectedCategories(selectedCats);
    
    const newTeams = [...teams];
    newTeams[0] = { ...newTeams[0], name: teamNames.team1 };
    newTeams[1] = { ...newTeams[1], name: teamNames.team2 };
    setTeams(newTeams);
    
    setCurrentScreen('game-board');
  };

  return (
    <div className="min-h-screen gradient-primary p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-center mb-8">اختر 6 فئات للعبة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {allCategories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              disabled={!selected.includes(category.id) && selected.length >= 6}
              className={`
                relative p-6 rounded-lg font-bold text-lg transition-all duration-300
                ${selected.includes(category.id)
                  ? 'bg-accent text-foreground shadow-glow scale-105'
                  : 'bg-card hover:bg-card/80 text-foreground/80'}
                ${!selected.includes(category.id) && selected.length >= 6 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {selected.includes(category.id) && (
                <div className="absolute top-2 left-2 w-6 h-6 bg-foreground rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </div>
              )}
              {category.name}
            </button>
          ))}
        </div>

        <div className="bg-card rounded-lg p-6 space-y-4">
          <h3 className="text-2xl font-bold mb-4">أسماء الفرق</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-foreground/80">الفريق الأول</label>
              <Input
                value={teamNames.team1}
                onChange={(e) => setTeamNames({ ...teamNames, team1: e.target.value })}
                className="text-right"
                placeholder="اسم الفريق الأول"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-foreground/80">الفريق الثاني</label>
              <Input
                value={teamNames.team2}
                onChange={(e) => setTeamNames({ ...teamNames, team2: e.target.value })}
                className="text-right"
                placeholder="اسم الفريق الثاني"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleStart}
            disabled={selected.length !== 6 || !teamNames.team1.trim() || !teamNames.team2.trim()}
            size="lg"
            className="px-12 py-6 text-xl font-bold bg-accent hover:bg-accent/90 shadow-glow disabled:opacity-50"
          >
            ابدأ اللعب ({selected.length}/6)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;

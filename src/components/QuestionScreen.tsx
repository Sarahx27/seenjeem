import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pause, Play, Eye } from 'lucide-react';

const QuestionScreen = () => {
  const {
    currentQuestion,
    setCurrentScreen,
    timerValue,
    setTimerValue,
    timerRunning,
    setTimerRunning,
    teams,
    updateTeamScore,
    doublePointsActive,
    setDoublePointsActive,
    markQuestionUsed,
    selectedCategories,
  } = useGame();

  const [showAnswer, setShowAnswer] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);

  useEffect(() => {
    setTimerValue(30);
    setTimerRunning(true);
    setShowAnswer(false);
    return () => {
      setTimerRunning(false);
    };
  }, [setTimerValue, setTimerRunning]);

  useEffect(() => {
    if (timerRunning && timerValue > 0) {
      const interval = setInterval(() => {
        setTimerValue(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timerValue === 0) {
      setShowAnswer(true);
      setTimerRunning(false);
    }
  }, [timerRunning, timerValue, setTimerValue, setTimerRunning]);

  const handleTeamWin = (teamIndex: number) => {
    if (!currentQuestion) return;
    
    const points = doublePointsActive ? currentQuestion.value * 2 : currentQuestion.value;
    updateTeamScore(teamIndex, points);
    
    const category = selectedCategories.find(cat =>
      cat.questions.some(q => q.id === currentQuestion.id)
    );
    if (category) {
      markQuestionUsed(category.id, currentQuestion.id);
    }

    if (doublePointsActive) {
      setDoublePointsActive(false);
    }

    setShowResultDialog(false);
    setCurrentScreen('game-board');

    // Check for winner
    if (teams[teamIndex].score + points >= 3000) {
      setTimeout(() => setCurrentScreen('winner'), 500);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen gradient-primary p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Timer and Question Info */}
        <div className="bg-card rounded-lg p-6 flex items-center justify-between">
          <div className="text-xl font-bold">
            {currentQuestion.value} نقطة {doublePointsActive && '(×2)'}
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-black ${timerValue <= 5 ? 'text-destructive animate-pulse' : ''}`}>
              {timerValue}
            </div>
            <div className="flex gap-2">
              {timerRunning ? (
                <Button onClick={() => setTimerRunning(false)} size="sm" variant="outline">
                  <Pause className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={() => setTimerRunning(true)} size="sm" variant="outline" disabled={timerValue === 0}>
                  <Play className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-card rounded-lg p-12 text-center">
          <p className="text-3xl font-bold leading-relaxed">
            {currentQuestion.text}
          </p>
        </div>

        {/* Answer Section */}
        {showAnswer && (
          <div className="bg-accent/20 border-2 border-accent rounded-lg p-8 text-center animate-scale-in">
            <p className="text-2xl font-bold mb-4">الإجابة:</p>
            <p className="text-xl">{currentQuestion.answer}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {!showAnswer && (
            <Button
              onClick={() => setShowAnswer(true)}
              size="lg"
              className="bg-accent hover:bg-accent/90 px-8"
            >
              <Eye className="ml-2 w-5 h-5" />
              عرض الإجابة
            </Button>
          )}
          {showAnswer && (
            <Button
              onClick={() => setShowResultDialog(true)}
              size="lg"
              className="bg-accent hover:bg-accent/90 px-8"
            >
              تحديد النتيجة
            </Button>
          )}
        </div>

        {/* Teams Display */}
        <div className="grid grid-cols-2 gap-6">
          {teams.map((team, index) => (
            <div key={index} className="bg-card rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2" style={{ color: index === 0 ? 'hsl(var(--team1))' : 'hsl(var(--team2))' }}>
                {team.name}
              </h3>
              <div className="text-3xl font-black">{team.score}</div>
              <div className="mt-4 flex gap-2 justify-center text-xs">
                {!team.helps.mute.available && <span className="opacity-50">🔇</span>}
                {!team.helps.double.available && <span className="opacity-50">⚡</span>}
                {!team.helps.friend.available && <span className="opacity-50">📞</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">من أجاب بشكل صحيح؟</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {teams.map((team, index) => (
              <Button
                key={index}
                onClick={() => handleTeamWin(index)}
                size="lg"
                style={{ backgroundColor: index === 0 ? 'hsl(var(--team1))' : 'hsl(var(--team2))' }}
                className="text-white font-bold"
              >
                {team.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionScreen;

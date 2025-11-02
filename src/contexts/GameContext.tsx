import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Team, Question, initialCategories } from '@/data/gameData';

interface GameContextType {
  currentScreen: 'start' | 'category-selection' | 'game-board' | 'question' | 'winner';
  setCurrentScreen: (screen: 'start' | 'category-selection' | 'game-board' | 'question' | 'winner') => void;
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  currentQuestion: Question | null;
  setCurrentQuestion: (question: Question | null) => void;
  timerValue: number;
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
  timerRunning: boolean;
  setTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  doublePointsActive: boolean;
  setDoublePointsActive: (active: boolean) => void;
  allCategories: Category[];
  setAllCategories: (categories: Category[]) => void;
  updateTeamScore: (teamIndex: number, points: number) => void;
  useHelp: (teamIndex: number, helpType: 'mute' | 'double' | 'friend') => void;
  markQuestionUsed: (categoryId: number, questionId: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

const initialTeams: Team[] = [
  {
    name: 'الفريق الأول',
    score: 0,
    helps: {
      mute: { available: true, active: false },
      double: { available: true, active: false },
      friend: { available: true, active: false },
    },
  },
  {
    name: 'الفريق الثاني',
    score: 0,
    helps: {
      mute: { available: true, active: false },
      double: { available: true, active: false },
      friend: { available: true, active: false },
    },
  },
];

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'category-selection' | 'game-board' | 'question' | 'winner'>('start');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timerValue, setTimerValue] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [doublePointsActive, setDoublePointsActive] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>(initialCategories);

  const updateTeamScore = (teamIndex: number, points: number) => {
    setTeams(prev => {
      const newTeams = [...prev];
      newTeams[teamIndex] = {
        ...newTeams[teamIndex],
        score: newTeams[teamIndex].score + points,
      };
      return newTeams;
    });
  };

  const useHelp = (teamIndex: number, helpType: 'mute' | 'double' | 'friend') => {
    setTeams(prev => {
      const newTeams = [...prev];
      newTeams[teamIndex].helps[helpType].available = false;
      newTeams[teamIndex].helps[helpType].active = true;
      return newTeams;
    });

    if (helpType === 'double') {
      setDoublePointsActive(true);
    }
  };

  const markQuestionUsed = (categoryId: number, questionId: number) => {
    setSelectedCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map(q =>
                q.id === questionId ? { ...q, used: true } : q
              ),
            }
          : cat
      )
    );
  };

  const resetGame = () => {
    setCurrentScreen('start');
    setSelectedCategories([]);
    setTeams(initialTeams);
    setCurrentQuestion(null);
    setTimerValue(30);
    setTimerRunning(false);
    setDoublePointsActive(false);
    setAllCategories(initialCategories);
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedCategories,
        setSelectedCategories,
        teams,
        setTeams,
        currentQuestion,
        setCurrentQuestion,
        timerValue,
        setTimerValue,
        timerRunning,
        setTimerRunning,
        doublePointsActive,
        setDoublePointsActive,
        allCategories,
        setAllCategories,
        updateTeamScore,
        useHelp,
        markQuestionUsed,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

import { useState } from "react";
import { GameProvider, useGame } from "@/contexts/GameContext";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import CategorySelection from "@/components/CategorySelection";
import GameBoard from "@/components/GameBoard";
import QuestionScreen from "@/components/QuestionScreen";
import WinnerScreen from "@/components/WinnerScreen";
import AdminPanel from "@/components/AdminPanel";

const GameContent = () => {
  const { currentScreen } = useGame();
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* الهيدر */}
      {currentScreen !== "start" && <Header />}

      {/* زر لوحة التحكم (يظهر دائمًا ما عدا في شاشة البداية) */}
      {currentScreen !== "start" && (
        <div className="absolute top-4 right-6 z-40">
          <button
            onClick={() => setShowAdmin(true)}
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-700 shadow-md"
          >
            لوحة التحكم
          </button>
        </div>
      )}

      {/* محتوى اللعبة */}
      {currentScreen === "start" && <HomePage />}
      {currentScreen === "category-selection" && <CategorySelection />}
      {currentScreen === "game-board" && <GameBoard />}
      {currentScreen === "question" && <QuestionScreen />}
      {currentScreen === "winner" && <WinnerScreen />}

      {/* لوحة التحكم */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
};

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;

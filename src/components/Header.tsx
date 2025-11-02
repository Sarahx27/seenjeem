import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 py-3 px-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-slate-900">PTI</h1>
          <p className="text-sm text-slate-500">لأن زكاة العلم نشره !</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
            <img src="/club-logo.png" alt="شعار النادي" className="h-full w-full object-contain" />
          </div>
          <div className="h-16 w-16rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
            <img src="/event-logo.png" alt="شعار الفعالية" className="h-full w-full object-contain" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/dashboard/SearchBar';

const Learning = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleLogout = async () => {
    console.log("Terminating Employee Session...");
    try {
      // Logic: Hits the logout path defined in Django urlpatterns
      await fetch('http://127.0.0.1:8000/api/users/logout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.log("Mock Logout: Backend offline, clearing local state.");
    } finally {
      // State Management: Clears global userRole to trigger App.jsx Route Guards
      if (typeof setUserRole === 'function') {
        setUserRole(null);
      }
      navigate('/');
    }
  };

  const quizData = {
    question: "The AI detected a 40% increase in customer pitch. What is the correct de-escalation step?",
    options: [
      "Maintain eye contact and lower your own voice volume.",
      "Call for immediate security intervention.",
      "Ask the customer to leave the premises immediately.",
      "Ignore the tone and continue processing the transaction."
    ],
    correctIndex: 0,
    reasoning: "Lowering your volume encourages the 'mirroring effect,' helping the customer calm down naturally."
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      
      {/* 1. Sidebar - Course Progress & Session Control */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col p-6 shadow-2xl z-10">
        <button 
          onClick={() => navigate('/manager')}
          className="text-[10px] font-black tracking-widest text-cyan-500 mb-8 flex items-center gap-2 hover:text-cyan-400 transition-colors uppercase"
        >
          ← BACK TO OPS CENTER
        </button>
        
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
           <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
           Assigned Modules
        </h2>
        
        <div className="space-y-3">
          {['De-escalation 101', 'Handling Aggression', 'Medical Emergency'].map((module, i) => (
            <div key={i} className={`p-4 rounded-xl border text-[11px] font-bold transition-all ${i === 0 ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-900/10' : 'border-slate-800 bg-slate-900/50 text-slate-500'}`}>
              {module}
            </div>
          ))}
        </div>

        {/* Updated Footer with Logout */}
        <div className="mt-auto space-y-6">
           <div className="pt-6 border-t border-slate-800">
              <div className="flex justify-between text-[10px] text-slate-500 uppercase font-black mb-2 tracking-tighter">
                <span>Progress</span>
                <span>33%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              </div>
           </div>

           <button 
             onClick={handleLogout}
             className="w-full bg-red-600/10 hover:bg-red-600 border border-red-600/50 text-red-500 hover:text-white py-4 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest shadow-lg shadow-red-900/5"
           >
             Terminate Session
           </button>
        </div>
      </aside>

      {/* 2. Main Content - Video & Interaction */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-4xl mx-auto w-full">
          <header className="mb-10">
            <div className="mb-6">
              <SearchBar placeholder="Search assigned clips..." />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Scenario Review: <span className="text-slate-500 font-mono italic">#BC-402</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Analyze the AI-flagged vocal markers and select the required de-escalation protocol.</p>
          </header>

          {/* Video Placeholder */}
          <div className="aspect-video bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden mb-10 group">
            <div className="absolute inset-0 flex items-center justify-center z-10">
               <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all cursor-pointer">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-cyan-500 border-b-[12px] border-b-transparent ml-2"></div>
               </div>
            </div>
            
            {/* AI Tension Overlay [cite: 27] */}
            <div className="absolute top-8 right-8 bg-red-600/20 border border-red-500/50 px-5 py-2.5 rounded-xl backdrop-blur-md z-20">
               <span className="text-[10px] font-black text-red-500 animate-pulse tracking-[0.2em]">TENSION SPIKE DETECTED [82%]</span>
            </div>
            
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          {/* Interaction Area  */}
          <section className="bg-slate-900/50 border border-slate-800 p-10 rounded-[2rem] shadow-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-6">
              {quizData.question}
            </h3>
            
            <div className="grid gap-4">
              {quizData.options.map((option, idx) => (
                <button 
                  key={idx}
                  onClick={() => { setSelectedAnswer(idx); setShowFeedback(true); }}
                  disabled={showFeedback}
                  className={`w-full text-left p-5 rounded-2xl border transition-all text-sm font-bold ${
                    showFeedback && idx === quizData.correctIndex 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                    : showFeedback && idx === selectedAnswer 
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-600 hover:bg-slate-950'
                  }`}
                >
                  <span className="mr-4 opacity-30 font-mono">0{idx + 1}</span>
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="mt-8 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-xs text-cyan-400 leading-relaxed font-medium">
                  <span className="font-black uppercase mr-3 px-2 py-1 bg-cyan-500/20 rounded-md tracking-widest text-[9px]">AI Reasoning</span> 
                  {quizData.reasoning}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Learning;
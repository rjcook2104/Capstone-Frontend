import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/dashboard/SearchBar';

const Learning = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

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
      
      {/* 1. Sidebar - Course Progress */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col p-6">
        <button 
          onClick={() => navigate('/manager')}
          className="text-xs font-bold text-cyan-500 mb-8 flex items-center gap-2 hover:text-cyan-400"
        >
          ← BACK TO OPS CENTER
        </button>
        
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Assigned Modules</h2>
        <div className="space-y-3">
          {['De-escalation 101', 'Handling Aggression', 'Medical Emergency'].map((module, i) => (
            <div key={i} className={`p-3 rounded-lg border text-xs font-medium ${i === 0 ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' : 'border-slate-800 bg-slate-900/50 text-slate-500'}`}>
              {module}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
           <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Your Progress</div>
           <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-cyan-500"></div>
           </div>
        </div>
      </aside>

      {/* 2. Main Content - Video & Interaction */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full">
          <header className="mb-8">
            {/* NEW: SEARCH BAR FOR EMPLOYEES */}
            <SearchBar placeholder="Search assigned clips..." />
            <h1 className="text-2xl font-bold text-white">Scenario Review: <span className="text-slate-400 italic">Incident #BC-402</span></h1>
            <p className="text-slate-500 text-sm mt-1">Review the AI-flagged tension spike and select the best response.</p>
          </header>

          {/* Video Placeholder */}
          <div className="aspect-video bg-black rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden mb-8 group">
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
               </div>
            </div>
            {/* AI Tension Overlay */}
            <div className="absolute top-6 right-6 bg-red-600/20 border border-red-500/50 px-4 py-2 rounded-lg backdrop-blur-md">
               <span className="text-xs font-black text-red-500 animate-pulse">TENSION SPIKE DETECTED [82%]</span>
            </div>
          </div>

          {/* Interaction Area */}
          <section className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 italic">"{quizData.question}"</h3>
            
            <div className="space-y-3">
              {quizData.options.map((option, idx) => (
                <button 
                  key={idx}
                  onClick={() => { setSelectedAnswer(idx); setShowFeedback(true); }}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                    showFeedback && idx === quizData.correctIndex 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                    : showFeedback && idx === selectedAnswer 
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-xs text-cyan-400 leading-relaxed">
                  <span className="font-black uppercase mr-2">AI Reasoning:</span> {quizData.reasoning}
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
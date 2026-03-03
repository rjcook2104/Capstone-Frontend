import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceStatus from '../components/dashboard/DeviceStatus';
import SearchBar from '../components/dashboard/SearchBar';

const Manager = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('feeds'); 
  // NEW: State to track which camera is focused/enlarged
  const [focusedCam, setFocusedCam] = useState(null);

  // Updated alerts to include a specific camId for the "Focus" logic
  const [alerts] = useState([
    { id: 1, camId: 1, employee: "John Doe", dept: "Electronics", level: "High", time: "2 mins ago", msg: "Verbal aggression detected" },
    { id: 2, camId: 4, employee: "Sarah Smith", dept: "Customer Service", level: "Medium", time: "5 mins ago", msg: "Elevated voice volume" },
  ]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      
      {/* 1. SIDEBAR: NAVIGATION & ALERTS */}
      <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl z-10">
        
        <div className="p-4 bg-slate-950/50 border-b border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-600 text-white font-bold text-[10px] tracking-widest uppercase shadow-lg shadow-cyan-900/20 transition-all cursor-default">
            <span className="text-base">🛡️</span> Ops Center
          </button>
          
          <button 
            onClick={() => navigate('/learning')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-[10px] tracking-widest uppercase transition-all"
          >
            <span className="text-base">🎓</span> Training Portal
          </button>
        </div>

        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Real-Time Tension Alerts
          </h2>
          {/* Reset button if a camera is focused */}
          {focusedCam && (
            <button 
              onClick={() => setFocusedCam(null)}
              className="text-[10px] text-cyan-500 hover:text-cyan-400 font-bold uppercase underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-xl border transition-all ${alert.level === 'High' ? 'border-red-500/30 bg-red-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-white">{alert.employee}</span>
                <span className="text-[10px] text-slate-500 font-mono">{alert.time}</span>
              </div>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">{alert.msg}</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setActiveTab('feeds');
                    setFocusedCam(alert.camId); // TRIGGER ENLARGE
                  }}
                  className="flex-1 text-[9px] font-black py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all uppercase tracking-widest"
                >
                  Focus Cam
                </button>
                <button 
                  onClick={() => navigate('/learning')}
                  className="flex-1 text-[9px] font-black py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all uppercase tracking-widest border border-slate-700"
                >
                  Training
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/40 backdrop-blur-md">
          <div className="flex gap-10 h-full">
            <button 
              onClick={() => setActiveTab('feeds')}
              className={`text-[11px] font-black tracking-[0.2em] transition-all border-b-2 h-full px-1 ${activeTab === 'feeds' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
              SMART MATRIX
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`text-[11px] font-black tracking-[0.2em] transition-all border-b-2 h-full px-1 ${activeTab === 'inventory' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
              HARDWARE STATUS
            </button>
          </div>

          {/* NEW: SEARCH BAR IN CENTER/RIGHT */}
          <div className="flex-1 flex justify-center px-4">
            <SearchBar placeholder="Search flagged clips by ID, Employee, or Date..." />
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden lg:flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">System Nominal</span>
             </div>
             <button className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold py-2 px-4 rounded-lg border border-slate-700 transition-all uppercase tracking-widest">
                Export Shift Log
             </button>
          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1">
          {activeTab === 'feeds' ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              {/* DYNAMIC GRID LAYOUT */}
              <div className={`grid gap-6 transition-all duration-500 ${focusedCam ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
                {[1, 2, 3, 4, 5, 6].map((i) => {
                  // If a cam is focused, hide the others, or style them differently
                  if (focusedCam && focusedCam !== i) return null;

                  return (
                    <div 
                      key={i} 
                      className={`bg-slate-900/80 rounded-2xl border flex flex-col items-center justify-center relative group overflow-hidden shadow-lg transition-all duration-700
                        ${focusedCam === i ? 'h-[60vh] border-cyan-500 shadow-cyan-500/20' : 'aspect-video border-slate-800 hover:border-cyan-500/50'}`}
                    >
                      <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                        <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] ${focusedCam === i ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                          CAM_0{i} // {focusedCam === i ? 'PRIORITY OVERRIDE' : `Employee_${i+10}`}
                        </span>
                      </div>

                      <span className={`text-slate-800 font-black tracking-tighter select-none transition-all ${focusedCam === i ? 'text-9xl opacity-20' : 'text-5xl'}`}>
                        {focusedCam === i ? "ENLARGED" : "LIVE FEED"}
                      </span>

                      {focusedCam === i && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setFocusedCam(null); }}
                          className="absolute bottom-6 right-6 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold py-2 px-4 rounded-lg border border-slate-700 z-20"
                        >
                          Minimize
                        </button>
                      )}
                      
                      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4 fade-in duration-500">
               <DeviceStatus />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Manager;
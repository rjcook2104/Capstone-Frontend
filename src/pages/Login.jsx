import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [idValue, setIdValue] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const idValue = e.target[0].value;

    if (idValue.toUpperCase().includes('MANAGER')) {
      setUserRole('manager');
      navigate('/manager');
    } else {
      setUserRole('employee');
      navigate('/learning');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
             <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <span className="text-slate-950 font-black text-xl">S2</span>
             </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Security Driven AI</h1>
          <p className="text-slate-500 text-sm mt-1">Division Operations Portal</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Employee ID</label>
            <input 
              type="text" 
              required
              value={idValue}
              onChange={(e) => setIdValue(e.target.value)}
              placeholder="e.g. EMP12345 or MANAGER_JANE"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Security PIN</label>
            <input 
              type="password" 
              placeholder="••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/20 transition-all active:scale-[0.98]"
          >
            Access Command Center
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-600 uppercase font-bold tracking-widest">
          <span>Encrypted Session</span>
          <span>v1.0.4-Alpha</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
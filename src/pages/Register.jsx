import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'employee',
    password: '' 
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering user:", formData);
    alert("Registration submitted for Manager approval.");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
             <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-950 font-black text-lg">S2</span>
             </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">JOIN SUPERSECURE AI</h1>
          <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-widest font-black">Employee Onboarding</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">Access Role</label>
            <div className="relative">
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-sm appearance-none cursor-pointer"
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="employee">Store Associate</option>
                <option value="manager">Division Manager</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                ▼
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">First Name</label>
            <input 
              type="text" 
              required
              placeholder="John"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-sm"
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">Last Name</label>
            <input 
              type="text" 
              required
              placeholder="Doe"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-sm"
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">Email</label>
            <input 
              type="email" 
              required
              placeholder="john.doe@supersecure.ai"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-sm"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">Phone Number</label>
            <input 
              type="tel" 
              required
              placeholder="(123) 456-7890"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-sm"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          {/* NEW: PASSWORD FIELD */}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">Security PIN / Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-sm"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs mt-4 shadow-lg shadow-cyan-900/20"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs">Already have an account?</p>
          <Link to="/" className="text-cyan-500 font-bold text-xs hover:underline mt-1 block uppercase tracking-tighter">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
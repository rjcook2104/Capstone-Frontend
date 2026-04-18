import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceStatus from '../components/dashboard/DeviceStatus';
import SearchBar from '../components/dashboard/SearchBar';

// SUB-COMPONENT: The Live Feed Handler
const WebcamFeed = ({ isFocused, camId }) => {
  const videoRef = useRef(null);
  const [useLocal, setUseLocal] = useState(false);

  useEffect(() => {
    if (useLocal) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Local camera failed:", err));
    }
  }, [useLocal]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden rounded-xl">
      {!useLocal ? (
        <img 
          src={`http://localhost:8000/api/video_feed/`} 
          alt="AI Stream"
          className="w-full h-full object-cover"
          onError={() => setUseLocal(true)} 
        />
      ) : (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover scale-x-[-1]" 
        />
      )}
      
      {camId === 1 && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-red-600/20 border border-red-500/50 px-3 py-1.5 rounded-lg backdrop-blur-md">
            <span className="text-[10px] font-black text-red-500 animate-pulse tracking-widest uppercase">
              Tension: 82%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const Manager = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feeds');
  const [focusedCam, setFocusedCam] = useState(null);

  const [feeds, setFeeds] = useState([
    { id: 1, name: "CAM_01", employee: "John Doe" },
    { id: 2, name: "CAM_02", employee: "Jane Doe" },
    { id: 3, name: "CAM_03", employee: "Sarah Smith" },
  ]);

  // UPDATED: Alerts now include event_id to match Edge Pipeline UUIDs
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Connect to the Django Channels WebSocket
    const socket = new WebSocket('ws://localhost:8000/ws/alerts/');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // If the backend sends an 'incident_start' packet
      if (data.packet_type === "incident_start") {
        const newAlert = {
          event_id: data.event_id, // From edge_pipeline
          camId: data.camera_id,
          employee: data.employee_name || "Unknown",
          msg: data.trigger_reason, // e.g., "Shout detected"
          time: "Just now",
          level: "High"
        };

        // Add the new alert to the sidebar automatically
        setAlerts(prev => [newAlert, ...prev]);
      }
    };

    return () => socket.close();
  }, []);

  // Inside the Manager component
  const triggerTestAlert = () => {
    const testEventId = `TEST-${Math.floor(Math.random() * 1000)}`;
    
    const mockEdgeAlert = {
      id: Date.now(),
      event_id: testEventId, // Simulating uuid4() from edge_pipeline
      camId: 1,
      employee: "John Doe (TEST)",
      msg: "SIMULATED: Shout detected (confidence=0.92)", // trigger_reason format
      time: "Just now",
      level: "High"
    };

    // Prepend the alert so it appears at the top of the sidebar
    setAlerts(prev => [mockEdgeAlert, ...prev]);
  };

  const addFeed = () => {
    const newId = feeds.length > 0 ? Math.max(...feeds.map(f => f.id)) + 1 : 1;
    setFeeds([...feeds, { id: newId, name: `CAM_0${newId}`, employee: `New_Hire_${newId}` }]);
  };

  const deleteFeed = (id) => {
    setFeeds(feeds.filter(feed => feed.id !== id));
    if (focusedCam === id) setFocusedCam(null);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/logout/', { 
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`Logout failed: ${response.status}`);
      setUserRole(null);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // UPDATED: handleResolveAlert now sends event_id so the Edge Pipeline can clear
  const handleResolveAlert = async (eventId, camId) => {
    console.log(`Resolving incident ${eventId} on CAM_0${camId}...`);
    try {
      const response = await fetch(`http://localhost:8000/api/recordings/stop/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event_id: eventId, // Critical for edge_pipeline status poll
          camera_id: camId,
          reason: "manager_clear"
        })
      });
      
      if (response.ok) {
        // UI Logic: Remove alert from sidebar
        setAlerts(prev => prev.filter(a => a.event_id !== eventId));
        alert(`Incident ${eventId} resolved. Edge pipeline finalizing tail recording.`);
      }
    } catch (error) {
      console.error("Backend failed to stop recording.");
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      
      {/* 1. SIDEBAR */}
      <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl z-10">
        <div className="p-4 bg-slate-950/50 border-b border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-600 text-white font-bold text-[10px] tracking-widest uppercase shadow-lg shadow-cyan-900/20">
            <span className="text-base">🛡️</span> Ops Center
          </button>
          <button onClick={() => navigate('/learning')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-[10px] tracking-widest uppercase transition-all">
            <span className="text-base">🎓</span> Training Portal
          </button>
        </div>

        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Tension Alerts
          </h2>
          {focusedCam && (
            <button onClick={() => setFocusedCam(null)} className="text-[10px] text-cyan-500 hover:text-cyan-400 font-bold uppercase underline">
              Reset Matrix
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {alerts.map(alert => (
            <div key={alert.event_id} className={`p-4 rounded-xl border transition-all ${alert.level === 'High' ? 'border-red-500/30 bg-red-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-white">{alert.employee}</span>
                <span className="text-[10px] text-slate-500 font-mono">{alert.time}</span>
              </div>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">{alert.msg}</p>
              <div className="flex gap-2">
                <button onClick={() => { setActiveTab('feeds'); setFocusedCam(alert.camId); }} className="flex-1 text-[9px] font-black py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white uppercase tracking-widest">
                  Focus Cam
                </button>
                <button 
                  onClick={() => handleResolveAlert(alert.event_id, alert.camId)}
                  className="flex-1 text-[9px] font-black py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white uppercase"
                >
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/40 backdrop-blur-md">
          <div className="flex gap-10 h-full">
            <button onClick={() => setActiveTab('feeds')} className={`text-[11px] font-black tracking-[0.2em] transition-all border-b-2 h-full px-1 ${activeTab === 'feeds' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500'}`}>
              SMART MATRIX
            </button>
            <button onClick={() => setActiveTab('inventory')} className={`text-[11px] font-black tracking-[0.2em] transition-all border-b-2 h-full px-1 ${activeTab === 'inventory' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500'}`}>
              HARDWARE
            </button>
          </div>

          <div className="flex-1 flex justify-center px-4">
            <SearchBar placeholder="Search clips..." />
          </div>

          <div className="flex items-center gap-4">
              <button 
                onClick={triggerTestAlert}
                className="hidden lg:block bg-amber-600/20 hover:bg-amber-600 border border-amber-600/50 text-amber-500 hover:text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
              >
                ⚡ Test Alert
              </button>
              <button onClick={addFeed} className="bg-cyan-600/20 hover:bg-cyan-600 border border-cyan-600/50 text-cyan-400 hover:text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">
                + Add Feed
              </button>
              <button onClick={handleLogout} className="bg-red-600/20 hover:bg-red-600 border border-red-600/50 text-red-500 hover:text-white px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                Logout
              </button>
          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1">
          {activeTab === 'feeds' ? (
            <div className={`grid gap-6 transition-all duration-500 ${focusedCam ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
              {feeds.map((feed) => {
                if (focusedCam && focusedCam !== feed.id) return null;
                return (
                  <div 
                    key={feed.id} 
                    className={`bg-slate-900/80 rounded-2xl border flex flex-col items-center justify-center relative group overflow-hidden shadow-lg transition-all duration-700
                      ${focusedCam === feed.id ? 'h-[60vh] border-cyan-500' : 'aspect-video border-slate-800 hover:border-cyan-500/50'}`}
                  >
                    <WebcamFeed isFocused={focusedCam === feed.id} camId={feed.id} />
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                      <span className={`w-2 h-2 rounded-full ${focusedCam === feed.id ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                        {feed.name} // {feed.employee}
                      </span>
                    </div>

                    {!focusedCam && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteFeed(feed.id); }}
                        className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 bg-red-600 text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter"
                      >
                        Decommission
                      </button>
                    )}

                    {focusedCam === feed.id && (
                      <button onClick={(e) => { e.stopPropagation(); setFocusedCam(null); }} className="absolute bottom-6 right-6 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold py-2 px-4 rounded-lg border border-slate-700 z-20">
                        Minimize
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
               <DeviceStatus />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Manager;
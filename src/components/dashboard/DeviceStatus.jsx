import { useState } from "react";

const DeviceStatus = () => {
  const [devices, setDevices] = useState([
    { id: "BC-101", employee: "Marcus Thorne", battery: 88, status: "Active" },
    { id: "BC-102", employee: "Elena Rodriguez", battery: 42, status: "Active" },
    { id: "BC-103", employee: "Unassigned", battery: 12, status: "Charging" },
    { id: "BC-104", employee: "James Wilson", battery: 95, status: "Active" },
  ]);

  // NEW: Logic to add a new hardware unit to the fleet
  const handleAddDevice = () => {
    const newId = prompt("Enter New Device ID (e.g., BC-105):");
    if (newId) {
      // Check if ID already exists
      if (devices.find(d => d.id === newId)) {
        alert("Device ID already exists in inventory.");
        return;
      }

      const newDevice = {
        id: newId,
        employee: "Unassigned",
        battery: 100, // New devices start fully charged for the demo
        status: "Charging"
      };
      
      setDevices(prev => [...prev, newDevice]);
    }
  };

  const handleAssign = (id) => {
    const name = prompt("Enter Employee Name for " + id);
    if (name) {
      setDevices(prev => prev.map(device => 
        device.id === id ? { ...device, employee: name, status: "Active" } : device
      ));
    }
  };

  const handleRemove = (id) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, employee: "Unassigned", status: "Charging" } : device
    ));
  };

  return (
    <div className="mt-8 bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400">
          Hardware Inventory & Assignments
        </h3>
        {/* UPDATED BUTTON: Now triggers the handleAddDevice logic */}
        <button 
          onClick={handleAddDevice}
          className="text-[10px] bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg transition-all uppercase font-black tracking-widest shadow-lg shadow-cyan-900/20 active:scale-95"
        >
          + Add New Device
        </button>
      </div>
      
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-slate-500 border-b border-slate-800">
            <th className="p-4 font-semibold uppercase tracking-tighter">Device ID</th>
            <th className="p-4 font-semibold uppercase tracking-tighter">Assigned To</th>
            <th className="p-4 font-semibold uppercase tracking-tighter">Battery</th>
            <th className="p-4 font-semibold uppercase tracking-tighter">Status</th>
            <th className="p-4 font-semibold uppercase tracking-tighter text-right pr-8">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {devices.map((device) => (
            <tr key={device.id} className="hover:bg-slate-800/20 transition-colors group">
              <td className="p-4 font-mono text-cyan-500">{device.id}</td>
              <td className="p-4">
                <span className={device.employee === "Unassigned" ? "text-slate-600 italic" : "text-slate-200"}>
                  {device.employee}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className={`h-full ${device.battery < 20 ? 'bg-red-500' : 'bg-green-500'}`} 
                      style={{ width: `${device.battery}%` }}
                    ></div>
                  </div>
                  <span className={device.battery < 20 ? 'text-red-400 font-bold' : 'text-slate-400'}>
                    {device.battery}%
                  </span>
                </div>
              </td>
              <td className="p-4">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                  device.employee === "Unassigned" 
                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                    : 'bg-green-500/10 text-green-500 border-green-500/20'
                }`}>
                  {device.employee === "Unassigned" ? "⚡ Charging" : "● Active"}
                </span>
              </td>
              <td className="p-4 text-right pr-4">
                {device.employee === "Unassigned" ? (
                  <button 
                    onClick={() => handleAssign(device.id)}
                    className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase hover:bg-cyan-500 hover:text-white transition-all"
                  >
                    Assign
                  </button>
                ) : (
                  <button 
                    onClick={() => handleRemove(device.id)}
                    className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceStatus;
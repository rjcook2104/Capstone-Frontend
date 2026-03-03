import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Manager from './pages/Manager';
import Learning from './pages/Learning';

function App() {
  // Simulate user role: null, 'manager', or 'employee'
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Pass the setter to Login so we can "sign in" as different people */}
        <Route path="/" element={<Login setUserRole={setUserRole} />} />

        {/* PROTECTED: Only Managers can see this */}
        <Route 
          path="/manager" 
          element={userRole === 'manager' ? <Manager /> : <Navigate to="/" />} 
        />

        {/* SHARED: Both can see this, but we can change the UI based on role */}
        <Route 
          path="/learning" 
          element={userRole ? <Learning userRole={userRole} /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./paths/Login";
import Profile from "./paths/Profile";
import { LoginContext } from "./Context/LoginContext";

function App() {
  const [token, setToken] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <div className="App">
      <LoginContext.Provider value={{ token, setToken, userName, setUserName }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App;

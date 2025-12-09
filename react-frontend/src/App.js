// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import TasksPage from "./pages/TasksPage";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

import Navbar from "./components/navbar";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tf_user")) || null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) localStorage.setItem("tf_user", JSON.stringify(user));
    else localStorage.removeItem("tf_user");
  }, [user]);

  const signOut = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="app-root">
      <Navbar user={user} onSignOut={signOut} />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route
            path="/signin"
            element={<SignIn onSignedIn={(u) => setUser(u)} />}
          />
          {/* protect tasks routes — if no user, redirect to signin inside pages */}
          <Route path="/tasks" element={<TasksPage user={user} />} />
          <Route path="/new" element={<CreateTask user={user} />} />
          <Route path="/edit/:id" element={<EditTask user={user} />} />
          <Route path="*" element={<HomePage user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

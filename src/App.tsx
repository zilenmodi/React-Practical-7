import { useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/reduxHooks";
import HomePage from "./layouts/HomePage/HomePage";
import LoginPage from "./layouts/LoginPage/LoginPage";
import SignupPage from "./layouts/SignupPage/SignupPage";

function App() {
  const { isLogin } = useAppSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={isLogin ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={
              isLogin === false ? <LoginPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/signup"
            element={
              isLogin === false ? <SignupPage /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

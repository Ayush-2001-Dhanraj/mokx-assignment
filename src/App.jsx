import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashScreen from "./screens/SplashScreen";
import AuthScreen from "./screens/AuthScreen";
import MainScreen from "./screens/MainScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import NotFound from "./screens/NotFound";
import "./App.css";

const routes = [
  { path: "/", component: <SplashScreen /> },
  { path: "/onboarding", component: <OnboardingScreen /> },
  { path: "/auth", component: <AuthScreen /> },
  { path: "/main", component: <MainScreen /> },
];

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="mobile-section">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles/theme.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import { RecipesProvider } from './context/RecipesContext';

/**
 * Root application with routing and layout shell that follows the Ocean Professional theme.
 * Provides theme toggling and responsive layout with header, sidebar, and main content area.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const sidebarKey = useMemo(() => `${theme}-sidebar`, [theme]);

  return (
    <RecipesProvider>
      <Router>
        <div className="app-shell">
          <Header theme={theme} onToggleTheme={toggleTheme} />
          <div className="content-area">
            <aside key={sidebarKey} className="sidebar">
              <Sidebar />
            </aside>
            <main className="main">
              <Routes>
                <Route path="/" element={<Navigate to="/recipes" replace />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="*" element={<div className="empty-state">Page not found</div>} />
              </Routes>
            </main>
          </div>
          <footer className="footer">
            <div className="footer-inner">
              <span>© {new Date().getFullYear()} Recipe Explorer</span>
              <span className="dot">•</span>
              <span>Ocean Professional Theme</span>
            </div>
          </footer>
        </div>
      </Router>
    </RecipesProvider>
  );
}

export default App;

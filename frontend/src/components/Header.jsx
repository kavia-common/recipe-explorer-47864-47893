import React from 'react';
import { useRecipes } from '../context/RecipesContext';

/**
 * PUBLIC_INTERFACE
 * App header with branding, search bar, and theme toggle.
 */
export default function Header({ theme, onToggleTheme }) {
  const { search, setSearch, usingMock } = useRecipes();

  return (
    <header className="header">
      <div className="header-inner container">
        <div className="brand">
          <div className="brand-mark">
            <span className="brand-dot" />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Recipe Explorer</h1>
            <p className="brand-subtitle">Discover • Cook • Enjoy</p>
          </div>
          {usingMock && (
            <span className="chip" title="Using mock data. Configure REACT_APP_API_BASE to enable live API.">
              Mock mode
            </span>
          )}
        </div>

        <div className="header-actions">
          <div className="searchbar">
            <input
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes, e.g., pasta, chicken..."
              aria-label="Search recipes"
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: saturate(180%) blur(8px);
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75));
          border-bottom: 1px solid rgba(37,99,235,0.12);
        }
        [data-theme="dark"] .header {
          background: linear-gradient(180deg, rgba(17,24,39,0.85), rgba(17,24,39,0.7));
          border-color: rgba(59,130,246,0.25);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: .8rem 1rem;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: .8rem;
        }
        .brand-mark {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: radial-gradient(120% 120% at 10% 10%, rgba(37,99,235,.25), rgba(37,99,235,.1) 45%, rgba(245,158,11,.15));
          border: 1px solid rgba(17,24,39,0.08);
          display: grid;
          place-items: center;
          box-shadow: 0 6px 16px rgba(37,99,235,0.2);
        }
        .brand-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #2563EB, #60A5FA);
          box-shadow: 0 0 0 4px rgba(37,99,235,0.18);
          display: inline-block;
        }
        .brand-text {
          line-height: 1;
        }
        .brand-title {
          margin: 0;
          font-size: 1.15rem;
          letter-spacing: .2px;
        }
        .brand-subtitle {
          margin: .15rem 0 0;
          font-size: .85rem;
          color: var(--ocean-muted);
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: .75rem;
          min-width: 320px;
        }
        .searchbar {
          flex: 1 1 420px;
          min-width: 240px;
        }
        @media (max-width: 720px) {
          .header-inner {
            flex-direction: column;
            align-items: stretch;
          }
          .header-actions {
            min-width: 100%;
          }
          .searchbar {
            flex: 1 1 auto;
          }
        }
      `}</style>
    </header>
  );
}

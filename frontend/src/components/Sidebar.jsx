import React from 'react';
import { useRecipes } from '../context/RecipesContext';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegetarian', 'Vegan'];

/**
 * PUBLIC_INTERFACE
 * Sidebar with category filters and quick actions.
 */
export default function Sidebar() {
  const { category, setCategory } = useRecipes();

  return (
    <div className="sidebar-inner">
      <h2 className="sidebar-title">Categories</h2>
      <div className="category-list">
        <button
          className={`chip ${category === '' ? 'active' : ''}`}
          onClick={() => setCategory('')}
          type="button"
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
            type="button"
          >
            {c}
          </button>
        ))}
      </div>

      <div className="tip card" role="note" aria-label="Tip">
        <div className="tip-inner">
          <strong>Pro tip</strong>
          <p>Use the search bar to quickly find ingredients or dish names.</p>
        </div>
      </div>

      <style>{`
        .sidebar-inner {
          display: grid;
          gap: 1rem;
        }
        .sidebar-title {
          font-size: 1rem;
          margin: .2rem 0 .1rem;
          color: var(--ocean-muted);
          letter-spacing: .3px;
        }
        .category-list {
          display: flex;
          flex-wrap: wrap;
          gap: .5rem;
        }
        .chip.active {
          background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(37,99,235,0.10));
          color: #1D4ED8;
          border-color: rgba(37,99,235,0.25);
          box-shadow: 0 6px 16px rgba(37,99,235,0.13);
        }
        .tip {
          padding: .75rem;
          border-radius: var(--ocean-radius);
          border: 1px dashed rgba(37,99,235,0.25);
          background: linear-gradient(180deg, rgba(37,99,235,0.05), rgba(255,255,255,0.5));
        }
        [data-theme="dark"] .tip {
          background: linear-gradient(180deg, rgba(17,24,39,0.5), rgba(17,24,39,0.7));
        }
        .tip-inner {
          display: grid;
          gap: .4rem;
          color: var(--ocean-muted);
        }
      `}</style>
    </div>
  );
}

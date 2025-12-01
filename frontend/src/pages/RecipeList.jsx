import React from 'react';
import { useRecipes } from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';

/**
 * PUBLIC_INTERFACE
 * Displays a filterable grid of recipe cards.
 */
export default function RecipeList() {
  const { recipes, loading, error, search, category } = useRecipes();

  return (
    <section className="container">
      <div className="list-header">
        <h2 className="title">Explore Recipes</h2>
        {(search || category) && (
          <p className="subtitle">
            Showing results for {search ? `"${search}"` : ''} {category ? `in ${category}` : ''}
          </p>
        )}
      </div>

      {loading && <div className="skeleton-grid" aria-busy="true" aria-live="polite">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-card card" />
        ))}
      </div>}

      {!loading && error && (
        <div className="empty-state card">
          <div style={{ padding: '1rem' }}>
            <strong>We hit a snag.</strong>
            <p style={{ color: 'var(--ocean-muted)' }}>{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <div className="empty-state card">
          <div style={{ padding: '1rem' }}>
            <strong>No recipes found</strong>
            <p style={{ color: 'var(--ocean-muted)' }}>Try adjusting filters or search.</p>
          </div>
        </div>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div className="recipes-grid">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}

      <style>{`
        .list-header {
          margin: .5rem 0 1rem;
        }
        .title {
          margin: 0;
          font-size: 1.4rem;
        }
        .subtitle {
          margin: .35rem 0 0;
          color: var(--ocean-muted);
        }
        .recipes-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        @media (max-width: 980px) {
          .recipes-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .recipes-grid {
            grid-template-columns: 1fr;
          }
        }
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        @media (max-width: 980px) {
          .skeleton-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .skeleton-grid {
            grid-template-columns: 1fr;
          }
        }
        .skeleton-card {
          height: 240px;
          background: linear-gradient(90deg, rgba(17,24,39,0.08), rgba(17,24,39,0.06), rgba(17,24,39,0.08));
          background-size: 300% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .empty-state {
          border-radius: var(--ocean-radius);
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

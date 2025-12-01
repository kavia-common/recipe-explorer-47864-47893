import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchRecipeById } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Displays a single recipe details with ingredients and steps.
 */
export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        setStatus({ loading: true, error: null });
        const data = await fetchRecipeById(id);
        if (alive) setRecipe(data);
      } catch (e) {
        if (alive) setStatus({ loading: false, error: e.message || 'Failed to load recipe' });
      } finally {
        if (alive) setStatus(s => ({ ...s, loading: false }));
      }
    }
    run();
    return () => { alive = false; };
  }, [id]);

  if (status.loading) {
    return (
      <section className="container">
        <div className="card" style={{ padding: '1.2rem' }}>
          Loading...
        </div>
      </section>
    );
  }

  if (status.error) {
    return (
      <section className="container">
        <div className="card" style={{ padding: '1.2rem' }}>
          <strong>Error:</strong> {status.error}
        </div>
      </section>
    );
  }

  if (!recipe) return null;

  return (
    <section className="container">
      <div className="detail-header">
        <button className="btn" onClick={() => navigate(-1)} type="button">← Back</button>
        <Link className="btn btn-primary" to="/recipes">Browse all</Link>
      </div>

      <article className="detail card">
        <div className="detail-media">
          <img src={recipe.image} alt={recipe.title} />
          <span className="chip">{recipe.category}</span>
        </div>
        <div className="detail-body">
          <h1 className="detail-title">{recipe.title}</h1>
          <div className="detail-meta">
            <span>⏱ {recipe.time} min</span>
            <span>•</span>
            <span>{recipe.difficulty}</span>
            <span>•</span>
            <span>{recipe.calories} kcal</span>
          </div>
          <p className="detail-desc">{recipe.description}</p>

          <div className="detail-grid">
            <section className="detail-section">
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </section>
            <section className="detail-section">
              <h3>Steps</h3>
              <ol>
                {recipe.steps?.map((st, i) => <li key={i}>{st}</li>)}
              </ol>
            </section>
          </div>
        </div>
      </article>

      <style>{`
        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: .25rem 0 1rem;
        }
        .detail {
          overflow: hidden;
        }
        .detail-media {
          position: relative;
          aspect-ratio: 16 / 6.5;
          background: #e5e7eb;
        }
        .detail-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .detail-body {
          padding: 1.2rem 1.2rem 1.4rem;
        }
        .detail-title {
          margin: .2rem 0 .4rem;
          font-size: 1.6rem;
        }
        .detail-meta {
          display: flex;
          gap: .6rem;
          align-items: center;
          color: var(--ocean-muted);
        }
        .detail-desc {
          margin: .8rem 0 1.2rem;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 1rem;
        }
        @media (max-width: 860px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
        .detail-section {
          background: var(--ocean-surface);
          border: 1px solid rgba(17,24,39,0.08);
          border-radius: var(--ocean-radius-sm);
          padding: 1rem;
        }
        .detail-section h3 {
          margin: 0 0 .6rem;
          font-size: 1.1rem;
        }
        .detail-section ul, .detail-section ol {
          margin: 0;
          padding-left: 1.1rem;
          line-height: 1.7;
        }
      `}</style>
    </section>
  );
}

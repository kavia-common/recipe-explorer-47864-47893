import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Compact recipe card with image, meta info and quick link to details.
 */
export default function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card card">
      <Link to={`/recipes/${recipe.id}`} className="card-link" aria-label={`Open ${recipe.title}`}>
        <div className="card-media">
          <img src={recipe.image} alt={recipe.title} loading="lazy" />
          <span className="badge">{recipe.category}</span>
        </div>
        <div className="card-body">
          <h3 className="card-title">{recipe.title}</h3>
          <div className="card-meta">
            <span>⏱ {recipe.time}m</span>
            <span>•</span>
            <span>{recipe.difficulty}</span>
            <span>•</span>
            <span>{recipe.calories} kcal</span>
          </div>
        </div>
      </Link>
      <style>{`
        .recipe-card {
          overflow: hidden;
          transition: transform .12s ease, box-shadow .2s ease;
        }
        .recipe-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(17,24,39,.12);
        }
        .card-link {
          color: inherit;
          text-decoration: none;
          display: grid;
        }
        .card-media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #e5e7eb;
        }
        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .6s ease;
        }
        .recipe-card:hover .card-media img {
          transform: scale(1.04);
        }
        .badge {
          position: absolute;
          top: .75rem;
          left: .75rem;
          background: linear-gradient(135deg, #F59E0B, #fbbf24);
          color: #111827;
          font-weight: 600;
          border-radius: 999px;
          padding: .35rem .6rem;
          font-size: .78rem;
          border: 1px solid rgba(17,24,39,0.12);
          box-shadow: 0 10px 16px rgba(0,0,0,.12);
        }
        .card-body {
          padding: .85rem .9rem 1rem;
          display: grid;
          gap: .4rem;
        }
        .card-title {
          margin: 0;
          font-size: 1.05rem;
          letter-spacing: .2px;
          line-height: 1.25;
        }
        .card-meta {
          display: flex;
          gap: .5rem;
          align-items: center;
          color: var(--ocean-muted);
          font-size: .92rem;
        }
      `}</style>
    </article>
  );
}

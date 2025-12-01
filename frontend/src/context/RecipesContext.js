import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchRecipes, isUsingMock } from '../services/api';

const RecipesContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Provides recipe data, search text, and selected category across the app.
 */
export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(isUsingMock());
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        setLoading(true);
        const data = await fetchRecipes({ search, category });
        if (alive) {
          setRecipes(data);
          setError(null);
        }
      } catch (e) {
        if (alive) setError(e.message || 'Failed to load recipes');
      } finally {
        if (alive) setLoading(false);
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, [search, category]);

  const value = useMemo(
    () => ({
      recipes,
      search,
      setSearch,
      category,
      setCategory,
      loading,
      error,
      usingMock,
    }),
    [recipes, search, category, loading, error, usingMock]
  );

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useRecipes() {
  /** Access recipe state, filters, and helpers from context. */
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes must be used within RecipesProvider');
  return ctx;
}

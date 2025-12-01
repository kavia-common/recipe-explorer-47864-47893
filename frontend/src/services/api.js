const BASE = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL;

/**
 * Determine if we should use mock data. If no API base is provided, mock is enabled.
 */
const USE_MOCK = !BASE || `${BASE}`.trim() === '';

/**
 * In-memory mock dataset for recipes, used when API base URL is not configured.
 */
const MOCK_RECIPES = [
  {
    id: '1',
    title: 'Lemon Herb Chicken',
    image: 'https://images.unsplash.com/photo-1615937691194-97dbd3f3e8ee?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinner',
    time: 35,
    difficulty: 'Easy',
    calories: 420,
    description: 'A bright and zesty baked chicken with fragrant herbs.',
    ingredients: [
      '4 chicken thighs',
      '2 tbsp olive oil',
      '1 lemon (zest and juice)',
      '2 cloves garlic (minced)',
      'Fresh thyme & rosemary',
      'Salt & pepper',
    ],
    steps: [
      'Preheat oven to 400°F (200°C).',
      'Mix oil, lemon zest/juice, garlic, herbs, salt, and pepper.',
      'Coat chicken and marinate 15 minutes.',
      'Bake 25–30 minutes until internal temp reaches 165°F.',
    ],
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
    category: 'Lunch',
    time: 25,
    difficulty: 'Medium',
    calories: 560,
    description: 'Silky pasta tossed in a rich mushroom cream sauce.',
    ingredients: [
      '200g pasta',
      '200g mushrooms (sliced)',
      '1 tbsp butter',
      '1 clove garlic',
      '150ml cream',
      'Parmesan, salt, pepper',
    ],
    steps: [
      'Cook pasta until al dente; reserve some pasta water.',
      'Sauté mushrooms in butter, add garlic.',
      'Pour in cream and simmer; season to taste.',
      'Toss pasta with sauce, adding pasta water if needed; top with parmesan.',
    ],
  },
  {
    id: '3',
    title: 'Avocado Toast with Egg',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    time: 10,
    difficulty: 'Easy',
    calories: 310,
    description: 'Crispy toast topped with smashed avocado and a soft egg.',
    ingredients: [
      '2 slices sourdough',
      '1 ripe avocado',
      '1 egg',
      'Chili flakes, lemon, salt',
    ],
    steps: [
      'Toast bread; mash avocado with lemon and salt.',
      'Fry or poach egg to preference.',
      'Spread avocado on toast, top with egg and chili flakes.',
    ],
  },
];

/**
 * Get base URL for API requests. Not used when USE_MOCK is true.
 */
function getBase() {
  return BASE?.replace(/\/+$/, '') || '';
}

/**
 * Low-level fetch wrapper
 */
async function request(path) {
  const url = `${getBase()}${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchRecipes(params = {}) {
  /** Fetch a list of recipes. If no API base URL is configured, returns mock data filtered locally. */
  if (USE_MOCK) {
    const { search = '', category = '' } = params;
    const s = search.toLowerCase();
    return MOCK_RECIPES.filter(r => {
      const matchesSearch =
        !s ||
        r.title.toLowerCase().includes(s) ||
        r.description.toLowerCase().includes(s);
      const matchesCategory = !category || r.category === category;
      return matchesSearch && matchesCategory;
    });
  }
  const qs = new URLSearchParams(params);
  return request(`/recipes?${qs.toString()}`);
}

// PUBLIC_INTERFACE
export async function fetchRecipeById(id) {
  /** Fetch a single recipe detail by id. If no API base URL is configured, returns from mock dataset. */
  if (USE_MOCK) {
    const found = MOCK_RECIPES.find(r => r.id === String(id));
    if (!found) throw new Error('Not found');
    return found;
  }
  return request(`/recipes/${id}`);
}

// PUBLIC_INTERFACE
export function isUsingMock() {
  /** Returns true if the API layer is using mock data fallback (no env base URL configured). */
  return USE_MOCK;
}

import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;
  // Filtreleme ve sıralama state'leri
const [dietFilter, setDietFilter] = useState('all');
const [sortBy, setSortBy] = useState('none');

// Filtrelenmiş tarifler
const filteredRecipes = recipes.filter(recipe => {
  if (dietFilter === 'vegan') return recipe.healthLabels.includes('Vegan');
  if (dietFilter === 'gluten-free') return recipe.healthLabels.includes('Gluten-Free');
  return true;
});

// Sıralama işlemi
const sortedRecipes = [...filteredRecipes].sort((a, b) => {
  if (sortBy === 'calories-asc') return a.calories - b.calories;
  if (sortBy === 'calories-desc') return b.calories - a.calories;
  return 0;
});

// JSX içinde filtreleme UI
<div className="filters">
  <select onChange={(e) => setDietFilter(e.target.value)}>
    <option value="all">Tüm Tarifler</option>
    <option value="vegan">Vegan</option>
    <option value="gluten-free">Glutensiz</option>
  </select>
  
  <select onChange={(e) => setSortBy(e.target.value)}>
    <option value="none">Sıralama</option>
    <option value="calories-asc">Kalori (Artan)</option>
    <option value="calories-desc">Kalori (Azalan)</option>
  </select>
</div>


  const searchRecipes = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      setRecipes(response.data.hits);
    } catch (error) {
      alert("Tarif bulunamadı!");
    }
  };

  return (
    <div className="App">
      <h1>🍳 Yemek Tarifleri</h1>
      <form onSubmit={searchRecipes}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Örn: Tavuk, Makarna..."
        />
        <button type="submit">Ara</button>
      </form>

      <div className="recipes">
        {recipes.map(({ recipe }, index) => (
          <div key={index} className="recipe">
            <img src={recipe.image} alt={recipe.label} />
            <h3>{recipe.label}</h3>
            <div className="details">
              <p>⏱️ {recipe.totalTime || 20} dakika</p>
              <p>🔥 {Math.round(recipe.calories)} Kalori</p>
            </div>
            <ul>
              {recipe.ingredientLines.map((ingredient, i) => (
                <li key={i}>✔️ {ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

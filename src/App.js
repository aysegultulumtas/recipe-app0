import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [dietFilter, setDietFilter] = useState('all');
  const [sortBy, setSortBy] = useState('none');

  const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;

  // Filtreleme ve Sıralama
  const filteredRecipes = recipes.filter(recipe => {
    if (dietFilter === 'vegan') return recipe.recipe.healthLabels.includes('Vegan');
    if (dietFilter === 'gluten-free') return recipe.recipe.healthLabels.includes('Gluten-Free');
    return true;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'calories-asc') return a.recipe.calories - b.recipe.calories;
    if (sortBy === 'calories-desc') return b.recipe.calories - a.recipe.calories;
    return 0;
  });

  // Tarif Arama
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
    <Router>
      <Navbar />
      <div className="App">
       
        <form onSubmit={searchRecipes}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Örn: Tavuk, Makarna..."
          />
          <button type="submit">Ara</button>
        </form>

        {/* Filtreleme UI */}
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

        {/* Ana İçerik */}
        <Routes>
          <Route path="/" element={
            <div className="recipes">
              {sortedRecipes.map(({ recipe }, index) => (
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
          }/>
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
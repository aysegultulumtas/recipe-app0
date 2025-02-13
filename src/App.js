import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;


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

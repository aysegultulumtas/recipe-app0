import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('chicken');

  const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setRecipes(response.data.hits);
      } catch (error) {
        console.error('Tarifler yüklenemedi:', error);
      }
    };
    fetchRecipes();
  }, [query]);

  return (
    <div className="container">
      <h1>Tarif Ara: <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      /></h1>
      <div className="recipe-grid">
        {recipes.map(({ recipe }, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
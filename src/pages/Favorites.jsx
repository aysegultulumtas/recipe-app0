import { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (uri) => {
    const updatedFavorites = favorites.filter(fav => fav.uri !== uri);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1>⭐ Favori Tarifleriniz</h1>
      {favorites.length === 0 ? (
        <p>Henüz favori tarifiniz yok. 🤷‍♂️</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((recipe, index) => (
            <div key={index} className="favorite-recipe">
              <img src={recipe.image} alt={recipe.label} />
              <h3>{recipe.label}</h3>
              <button onClick={() => removeFavorite(recipe.uri)}>🗑️ Kaldır</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
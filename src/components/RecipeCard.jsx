
const RecipeCard = ({ recipe }) => {
    const addToFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.some(fav => fav.uri === recipe.uri)) {
        const newFavorites = [...favorites, recipe];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        alert('Favorilere eklendi! 🎉');
      }
    };
  
    return (
      <div className="recipe-card">
        <h3>{recipe.label}</h3>
        <img src={recipe.image} alt={recipe.label} />
        <button onClick={addToFavorites}>❤️ Favorilere Ekle</button>
      </div>
    );
  };


  export default RecipeCard; 
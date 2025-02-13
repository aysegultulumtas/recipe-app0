
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css'; 

const RecipeCard = ({ recipe }) => {

  if (!recipe) {
    return null;
  }

  return (
    <div className="recipe-card">
      <img 
        src={recipe.image} 
        alt={recipe.label} 
        className="recipe-image"
      />
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.label}</h3>
        <p className="recipe-time">
          ⏱️ {recipe.totalTime || 20} dakika
        </p>
        <div className="recipe-actions">
          <Link 
            to={`/recipe/${recipe.uri.split('_')[1]}`} 
            className="detail-button"
          >
            Detaylar
          </Link>
          <button className="favorite-button">
            ❤️ Favorilere Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  // recipe prop'unun undefined gelme ihtimaline karşı koruma
  if (!recipe) return null;

  return (
    <div className="recipe-card">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="recipe-image"
      />
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.strMeal}</h3>
        <p className="recipe-category">{recipe.strCategory}</p>
        <Link 
          to={`/recipe/${recipe.idMeal}`} 
          className="detail-button"
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
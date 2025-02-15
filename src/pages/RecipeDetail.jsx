import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(response.data.meals[0]); // API yanıtı "meals" dizisi içinde gelir
      } catch (error) {
        console.error("Tarif yüklenemedi:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Tarif yükleniyor... 🍳</div>;

  // Malzemeleri dinamik olarak çekmek için:
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>Malzemeler</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Talimatlar</h3>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;
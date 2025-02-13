import React from 'react';
import RecipeCard from '../components/RecipeCard';
import AddRecipeForm from '../components/AddRecipeForm';



const Home = () => {
  return (
    <div className="home-page">
      <h1>Tüm Tarifler</h1>
      <div className="recipe-grid">
      <div>
      <h1>Ana Sayfa</h1>
      <AddRecipeForm />
    </div>
        {/* API'dan gelen verileri RecipeCard'a map'le */}
        <RecipeCard title="Tavuk Sote" calories={350} />
        <RecipeCard title="Mantarlı Makarna" calories={420} />
      </div>
    </div>
  );
};

export default Home;
import { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); // Arama yapıldı mı?
  const [error, setError] = useState(null); // Hata mesajı için state

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://www.themealdb.com/api/json/v1/1/";

  // ENTER ile arama yapma
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = async () => {
    if (!query.trim()) {
      setError("Lütfen bir arama sorgusu girin."); // Boş arama sorgusu hatası
      return;
    }

    setIsLoading(true);
    setSearchPerformed(true);
    setError(null); // Hata mesajını sıfırla

    try {
      const response = await axios.get(
        `${API_BASE_URL}search.php?s=${encodeURIComponent(query)}`
      );
      console.log('API Yanıtı:', response.data); // API yanıtını konsola yazdır

      if (response.data && response.data.meals) {
        setRecipes(response.data.meals);
      } else {
        setRecipes([]); // Eğer tarif yoksa boş dizi ayarla
        setError(`"${query}" ile eşleşen tarif bulunamadı. 🥺`); // Tarif bulunamadı hatası
      }
    } catch (error) {
      console.error('Tarifler yüklenemedi:', error);
      setError("Tarifler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."); // API hatası
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Sıralama
  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'name-asc') return a.strMeal.localeCompare(b.strMeal);
    if (sortBy === 'name-desc') return b.strMeal.localeCompare(a.strMeal);
    return 0;
  });

  return (
    <div className="home-page">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="🔍 Tarif ara"
        />
        <button onClick={performSearch} className="search-button">
          Ara
        </button>
      </div>

      {/* Sıralama Seçimi */}
      <div className="filters">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">Sıralama Seçin</option>
          <option value="name-asc">A'dan Z'ye</option>
          <option value="name-desc">Z'den A'ya</option>
        </select>
      </div>

      {/* Hata Mesajı */}
      {error && <p className="error-message">{error}</p>}

      {/* Sonuçlar */}
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Tarifler aranıyor...</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {searchPerformed && sortedRecipes.length === 0 && !error ? (
            <p className="no-results">
              "{query}" ile eşleşen tarif bulunamadı. 🥺
            </p>
          ) : (
            sortedRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
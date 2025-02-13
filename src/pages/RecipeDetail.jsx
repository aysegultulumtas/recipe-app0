import React from 'react';
import { useParams } from 'react-router-dom'; 
import CommentSection from '../components/CommentSection';

const RecipeDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Tarif Detayı: {id}</h2>
      <CommentSection />
    </div>
  );
};

export default RecipeDetail;
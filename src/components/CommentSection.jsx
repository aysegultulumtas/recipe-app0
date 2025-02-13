import { useState } from 'react';

const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (newComment.trim() && rating > 0) {
      setComments([...comments, {
        text: newComment,
        rating: rating,
        date: new Date().toLocaleString()
      }]);
      setNewComment('');
      setRating(0);
    }
  };

  return (
    <div className="comment-section">
      <h3>Yorumlar ({comments.length})</h3>
      
      <div className="rating">
        {[...Array(5)].map((_, index) => (
          <span 
            key={index} 
            onClick={() => setRating(index + 1)}
            style={{ color: index < rating ? '#ffd700' : '#ddd' }}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Yorumunuz..."
      />
      <button onClick={handleSubmit}>Gönder</button>

      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-rating">
            {[...Array(comment.rating)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <p>{comment.text}</p>
          <small>{comment.date}</small>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, updateDoc } from './firebase'; 
import { Heart } from 'lucide-react';
import '../styles/Components/LikeButton.css'; 

const LikeButton = () => {
  const [likes, setLikes] = useState(0); 
  const [liked, setLiked] = useState(false);  
  const [showLiked, setShowLiked] = useState(false); 
  const [animating, setAnimating] = useState(false);  

  // Fetch the current like count from Firestore
  useEffect(() => {
    const fetchLikes = async () => {
      const docRef = doc(db, 'websiteLikes', 'globalLikes');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLikes(docSnap.data().count); 
      } else {
        console.log("No such document!");
      }
    };

    fetchLikes();

    // Check if the user has already liked the page in this session
    const likedSession = sessionStorage.getItem('liked');
    if (likedSession) {
      setLiked(true); 
    }
  }, []);

  // Handle the like button click and update the like count in Firestore
  const handleLike = async () => {
    if (liked || animating) return; 

    setLiked(true);  
    sessionStorage.setItem('liked', 'true'); 
    setShowLiked(true);  
    setAnimating(true);  

    const newLikes = likes + 1; 
    console.log(`Updating like count to: ${newLikes}`); 

    try {
      const docRef = doc(db, 'websiteLikes', 'globalLikes');
      await updateDoc(docRef, { count: newLikes });  
      console.log('Successfully updated the count in Firestore');
      setLikes(newLikes); 
    } catch (error) {
      console.error('Error updating the like count in Firestore:', error);
    }

    // Set animation timeout for after the animation completes
    setTimeout(() => {
      setShowLiked(false); 
      setAnimating(false);  
    }, 500);  // Duration of the animation
  };

  return (
    <div className="like-button-container">
      <button
        onClick={handleLike}
        className={`likeButton ${liked ? 'liked' : ''}`}
        disabled={liked || animating} // Disable the button while animating or liked
      >
        {/* Heart icon */}
        <span role="img" aria-label="heart" className={`heart-icon ${liked ? 'liked' : ''}`}>
        <Heart style={{ fill: liked ? '#e0245e' : 'none' }} />
        </span>
        <span className="like-count">
          {showLiked ? "Liked" : likes} 
        </span>
      </button>
    </div>
  );
};

export default LikeButton;

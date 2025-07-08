import React, { useState } from 'react';
import { Heart, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import '../styles/Components/PostPopup.css'; // Make sure to style your components properly

const PostPopup = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleTouchStart = () => {
    // Handle touch start event for mobile interaction if needed
    console.log("Touch start detected");
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    );
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setLikes(likes + 1); // Increment likes when liked
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 1000); // Reset heart animation after 1 second
    } else {
      setLikes(likes - 1); // Decrement likes when unliked
    }
  };

  return (
    <div id="post" onTouchStart={handleTouchStart}>
        <div>
            <div className="post-header">
                <div className="profileContainer">
                <img src={post.userImage} alt="Profile" className="profilePic" />
                <div className="username">{post.username}</div>
                </div>
                <button
                className="seepost"
                onClick={() => window.open(post.postLink, '_blank')}
                >
                {post.images[currentImageIndex].includes('projects') ? (post.images[currentImageIndex].includes('jobquest')? 'Live Site' : 'GitHub') : 'Click Link '}
                </button>
            </div>

            <div className="slideShow">
                <button className="prev" onClick={prevImage}>
                <CircleChevronLeft />
                </button>

                <img
                src={post.images[currentImageIndex]}
                alt="post"
                className="post-image"
                />

                <button className="next" onClick={nextImage}>
                <CircleChevronRight />
                </button>
            </div>
        </div>
     

      <div className="post-footer">
        <div className="actions">
          <div className="likecontainer">
            <button
              className={`like-button ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              <Heart fill={liked ? 'red' : 'none'} />
              {showHeartAnimation && <span className="heart-jump" />}
            </button>
            <div className="likes">{likes}</div>
          </div>
        </div>

        <div className="captions">
          <span className="capusername">{post.username}</span> {post.caption}
        </div>
        <div className="Date">
          <p>{post.datePosted}</p>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;

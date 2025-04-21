import React from 'react';
import '../styles/Pages/Feed.css';

const Feed = () => {


  const posts = [
    {
      id: 1,
      username: 'john_doe',
      imageUrl: '/assets/profile.jpg',
      caption: 'Just a cool sunset!',
      likes: 125,
    },
    {
      id: 2,
      username: 'jane_doe',
      imageUrl: '/assets/profile.jpg',
      caption: 'Had a blast at the beach 🏖️',
      likes: 200,
    },
    {
      id: 3,
      username: 'sam_smith',
      imageUrl: '/assets/profile.jpg',
      caption: 'Weekend getaway vibes 🌄',
      likes: 150,
    },
  ];


  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <img
              src="https://via.placeholder.com/40"
              alt={`${post.username} profile`}
              className="profile-pic"
            />
            <span className="username">{post.username}</span>
          </div>
          <img src={post.imageUrl} alt="post" className="post-image" />
          <div className="post-footer">
            <div className="actions">
                <div className='likecontainer'>
                    <button className="like-button">❤️</button>
                    <div className="likes">{post.likes}</div>
                </div>

                <button
              className="see-post-button">
              See Post
                </button>
            </div>

            <div className="caption">
              <span className="username">{post.username}</span> {post.caption}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;

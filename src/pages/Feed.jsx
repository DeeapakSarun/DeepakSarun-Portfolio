import React from 'react';
import '../styles/Pages/Feed.css';

const Feed = () => {


  const posts = [
    {
      id: 1,
      username: 'john_doe',
      imageUrl: '/assets/deepak.png',
      caption: 'Just a cool sunset!',
      likes: 125,
    },
    {
      id: 2,
      username: 'jane_doe',
      imageUrl: '/assets/deepak.png',
      caption: 'Had a blast at the beach 🏖️',
      likes: 200,
    },
    {
      id: 3,
      username: 'sam_smith',
      imageUrl: '/assets/deepak.png',
      caption: 'Weekend getaway vibes 🌄',
      likes: 150,
    },
  ];


  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <div className="profileContainer">
                <img
                        src="/assets/profile.jpg" // Using image from public/assets folder
                        alt="Profile"
                        className="profilePic"
                    />


                <div className="username">{post.username}</div>
            </div>
            <button className="seepost" alt="see original post">see post</button>
          </div>
          <img src={post.imageUrl} alt="post" className="post-image" />
          <div className="post-footer">
            <div className="actions">
                <div className='likecontainer'>
                    <button className="like-button">❤️</button>
                    <div className="likes">{post.likes}</div>
                </div>


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

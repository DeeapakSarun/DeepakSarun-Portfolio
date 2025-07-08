import React, { useState } from 'react';
import '../styles/Pages/Feed.css';
import { Heart, CircleChevronLeft, CircleChevronRight } from 'lucide-react';

const Feed = () => {
  const posts = [
    {
      id: 7,
      username: 'deepaksaruny',
      userImage: '/assets/posts/featured/interco/userPic/user.JPG',
      images: [
        '/assets/posts/featured/interco/postPic/postpic1.png',
      ],
      caption: "🚀 Excited to share that I’ve started a new chapter as a Software Developer Intern at Interco! Looking forward to learning, growing, and contributing to some amazing projects with the team.",
      postLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7341079105594933248/', // Replace with actual link if available
      likes: 100,
      datePosted: "June 10, 2025",
    },
    {
      id: 6,
      username: 'deepaksaruny',
      userImage: '/assets/posts/featured/masters/userPic/user.JPG',
      images: [
        '/assets/posts/featured/masters/postPic/postpic1.png',
      ],
      caption: "🔥🎯 The grind was real. So is the degree. 🎓✨\n\nProud to share that I’ve earned my Master’s in Computer Science from Saint Louis University – School of Science and Engineering!\nEndless late nights, lines of code, and lessons learned — grateful for everyone who supported me on this journey.\nHere’s to new beginnings and bigger challenges ahead! 🥂",
      postLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7337568279583969281/', // Replace with actual link if available
      likes: 300,
      datePosted: "May 15, 2025",
    },
    {
      id: 5,
      username: 'hackslu',
      userImage: '/assets/posts/featured/hackslu/userPic/user.png',
      images: ['/assets/posts/featured/hackslu/postPic/postpic1.jpg', '/assets/posts/featured/hackslu/postPic/postpic2.jpeg','/assets/posts/featured/hackslu/postPic/postpic3.png','/assets/posts/featured/hackslu/postPic/postpic4.jpeg'],
      caption: 'Day 1 of HACKSLU 2025 was a blast! 🚀',
      postLink: 'https://www.instagram.com/p/DHiKxZ6MHVz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      likes: 125,
      datePosted: "March 23, 2025",
    },
    {
      id: 4,
      username: 'eHacks_2025',
      userImage: '/assets/posts/featured/ehacks/userPic/user.jpeg',
      images: ['/assets/posts/featured/ehacks/postPic/postpic1.jpeg', '/assets/posts/featured/ehacks/postPic/postpic2.jpeg','/assets/posts/featured/ehacks/postPic/postpic3.gif','/assets/posts/featured/ehacks/postPic/postpic4.JPG','/assets/posts/featured/ehacks/postPic/postpic5.JPG','/assets/posts/featured/ehacks/postPic/postpic6.jpeg',],
      caption: 'We secured 3rd Place at eHacks 2025! 🎉',
      postLink: 'https://www.linkedin.com/posts/deepaksaruny_ehacks2025-hackathon-nosleepjustcode-ugcPost-7304681541794766850-5bkW?utm_source=share&utm_medium=member_desktop&rcm=ACoAACtye20B2YJe-6lQV658ORAftm-fjw_Ko3M',
      likes: 125,
      datePosted: "March 10, 2025",
    },
    {
      id: 3,
      username: 'SLU_CareerServices',
      userImage: '/assets/posts/featured/GlobalGradCertification/userPic/user.png',
      images: ['/assets/posts/featured/GlobalGradCertification/postPic/postpic1.jpg', '/assets/posts/featured/GlobalGradCertification/postPic/postpic2.jpg'],
      caption: 'we hosted a certificate ceremony and luncheon to honor our Global Scholars. These students completed their Career Readiness Program and/or a non-profit project.',
      postLink: 'https://www.linkedin.com/posts/careerservicesslu_last-week-we-hosted-a-certificate-ceremony-activity-7141154213966802944-EwWA?utm_source=share&utm_medium=member_desktop&rcm=ACoAACtye20B2YJe-6lQV658ORAftm-fjw_Ko3M',
      likes: 200,
      datePosted: "june 20, 2024",
    },
    {
      id: 2,
      username: 'globalgrad_slu',
      userImage: '/assets/posts/featured/SLUHackathon/userPic/user.png',
      images: ['/assets/posts/featured/SLUHackathon/postPic/postpic1.jpeg', '/assets/posts/featured/SLUHackathon/postPic/postpic2.jpeg'],
      caption: "I'm proud to have organized the first-ever hackathon hosted by Saint Louis University's Global Grad initiative. It was a great learning opportunity to organize my first tech event, starting from finalizing a problem statement to validating the submissions.",
      postLink: 'https://www.instagram.com/p/C0r1PZ7Rs3_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      likes: 150,
      datePosted: "December 10, 2023",
    },

  ];
  return (
    <div className="feed-container">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const Post = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    );
  };

  const handleLike = () => {
    if (!liked) {
      setLikes((prev) => prev + 1);
      setLiked(true);
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 1000);
    } else {
      setLikes((prev) => prev - 1);
      setLiked(false);
    }
  };

  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX;
    const handleTouchMove = (e) => {
      const touchEnd = e.touches[0].clientX;
      if (touchStart - touchEnd > 50) {
        nextImage();
      } else if (touchEnd - touchStart > 50) {
        prevImage();
      }
      e.target.removeEventListener('touchmove', handleTouchMove);
    };
    e.target.addEventListener('touchmove', handleTouchMove);
  };

  return (
    <div className="post" onTouchStart={handleTouchStart}>
      <div className="post-header">
        <div className="profileContainer">
          <img src={post.userImage} alt="Profile" className="profilePic" />
          <div className="username">{post.username}</div>
        </div>
        <button
          className="seepost"
          onClick={() => window.open(post.postLink, '_blank')}
        >
          See Post
        </button>
      </div>

      <div className="slideshow">
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

        <div className="caption">
          <span className="username">{post.username}</span> {post.caption}
        </div>
        <div className="Date">
          <p>{post.datePosted}</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
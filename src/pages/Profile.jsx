import React from 'react';
import Slider from 'react-slick'; // Import slick slider
import '../styles/Pages/Profile.css'; // Import the CSS file

// Skills for Carousel
const skills = [
  { name: "Java", logo: "/assets/java.png" },
  { name: "Python", logo: "/assets/python.png" },
  { name: "React", logo: "/assets/react.png" },
  { name: "MySQL", logo: "/assets/sql.png" },
  { name: "JavaScript", logo: "/assets/js.png" },
  { name: "HTML", logo: "/assets/html.png" },
  { name: "CSS", logo: "/assets/css.png" },
  { name: "Node.js", logo: "/assets/node.png" }
];

// Sample Posts for Feed
const posts = [
  { id: 1, image: "/assets/profile.jpg" },
  { id: 2, image: "/assets/deepak.png" },
  { id: 3, image: "/assets/profile.jpg" },
  { id: 4, image: "/assets/deepak.png" },
  { id: 5, image: "/assets/profile.jpg" },
  { id: 6, image: "/assets/deepak.png" },
];

const Profile = () => {
  // Settings for the carousel
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: skills.length*3,
    speed: 20000,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false, // No arrows
    dots: true,    // Dots for navigation
    cssEase: 'linear', // Smooth easing effect
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src="/assets/profile.jpg"  // Using image from public/assets folder
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          <h1>@yourusername</h1>
          <p>DEEPAK SARUN</p>
          <p>Web Developer | Tech Enthusiast</p>
          <div className="profile-stats">
            <span>25 posts</span>
            <span>368 followers</span>
            <span>528 following</span>
          </div>
        </div>
      </div>

      {/* Skills Carousel (Story Highlights) */}
      <div className="skills-carousel">
        <Slider {...settings}>
          {skills.map((skill, index) => (
            <div key={index} className="highlight">
              <div className="highlight-icon">
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
                <p>{skill.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Post Grid */}
      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <img src={post.image} alt={`Post ${post.id}`} className="post-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

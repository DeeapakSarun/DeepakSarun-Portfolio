import React from 'react';
import Slider from 'react-slick'; // Import slick slider
import '../styles/Pages/Profile.css'; // Import the CSS file

// Skills for Carousel
const skills = [
  { name: "Java", logo: "/assets/skill/java.png" },
  { name: "Python", logo: "/assets/skill/python.png" },
  { name: "React", logo: "/assets/skill/react.png" },
  { name: "MySQL", logo: "/assets/skill/sql.png" },
  { name: "JavaScript", logo: "/assets/skill/js.png" },
  { name: "HTML", logo: "/assets/skill/html.png" },
  { name: "CSS", logo: "/assets/skill/css.png" },
  { name: "Node.js", logo: "/assets/skill/node.png" }
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
    slidesToScroll: 1,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false, // No arrows
    dots: false, // No dots
    pauseOnHover: false, // No pause on hover
    cssEase: 'ease-in-out', // Smooth easing effect
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src="/assets/profile.jpg"  // Using image from public/assets folder
            alt="Profile"
            className="profile-photo"
          />
          <div className="profile-info">
            <h1 className='username'>
            <a 
              className="usernamelink" 
              href="https://www.instagram.com/_deeksaru__/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              @_deeksaru__
            </a>
            </h1>
            <p>DEEPAK SARUN</p>
            <p>Web Developer | Tech Enthusiast</p>
            <div className="profile-stats">
            <p>3   <span>Hacks</span></p>
            <p>5+  <span>Projects</span></p>
            <p>5+  <span>Certifications</span></p>
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
            <img src={post.image} alt={`Post ${post.id}`} className="post-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

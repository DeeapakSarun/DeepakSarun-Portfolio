import React, { useState } from 'react';
import Slider from 'react-slick'; // Import slick slider
// Removed unused imports
import PostPopup from '../components/PostPopup'; // Import the PostPopup component
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


const projects = [
    {
    id: 6,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/projects/jobquest/postpic1.png'],
    caption: 'Job Quest: Corporate Tower Edition is a satirical 2D platformer inspired by the job hunt experience. Players dodge rejection emails, navigate fake job listings, and scale 25 floors of corporate chaos, all in pixel art with procedural sound. Built to capture the humor and frustration of job searching.',
    postLink: 'https://jobquestgame.netlify.app/',
    likes: 100,
    datePosted: "June 10, 2025",
  },
  {
    id: 5,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/projects/upliftxp/postpic1.png'],
    caption: 'UpliftXP! 💡 Over an intense and rewarding hackathon weekend, we built UpliftXP, a cross-platform mobile app designed to promote both mental wellness and physical activity. 📱 Key Features: Apple Health Integration – fetches daily step counts to track physical activity, ✅ Daily Task List – includes mindfulness and fitness tasks to encourage healthy habits, 🌟 XP Tracking System – users earn XP by completing tasks, 🏆 Global Leaderboard – friendly competition to stay motivated, 📈 Habit Tracking & Streaks – visualize consistency over time, 🔔 Push Notifications – smart reminders to keep users on track. 🛠️ Tech Stack: Frontend: React Native (Expo), Backend: Firebase (Authentication, Firestore), State Management: React Context API, UI Library: React Native Paper. 💬 This was an incredible opportunity to blend health tech and gamification in a way that makes self-care more engaging. 🌟',
    postLink: 'https://github.com/DeeapakSarun/team-ichi',
    likes: 200,
    datePosted: "May 1, 2025",
  },  
  {
    id: 4,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/projects/detalk/postpic1.png'],
    caption: '🌍 DeTalk is an accessible communication platform designed to bridge the gap for individuals with visual, speech, or hearing impairments. 🦾 It integrates real-time sign language recognition using AI, providing up to 90% accuracy in translation. The app features a user-friendly Jinja-based UI with screen reader support, ensuring enhanced accessibility. This project was completed in just 36 hours as part of the eHacks 2025 hackathon! 🚀',
    postLink: 'https://github.com/VennapusalaCharitha/Team_uno',
    likes: 125,
    datePosted: "March 25, 2025",
  },
  {
    id: 3,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/projects/spaceinvaders/postpic1.png'],
    caption: '👾 Space Invaders brings the classic arcade game to life using Java and Swing. 🎮 As the team lead, I helped implement design patterns such as Factory and Singleton, which reduced memory usage by 35%. The game runs at a smooth 60 FPS, ensuring an optimized gaming experience that is just as addictive as the original. 🏆',
    postLink: 'https://github.com/DeeapakSarun/SpaceInvaders.git',
    likes: 150,
    datePosted: "February 15, 2025",
  },
  {
    id: 2,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/projects/oceankatamari/postpic1.png', '/assets/projects/oceankatamari/postPic/postpic2.jpg'],
    caption: '🌊 Ocean Katamari is a recreation of the Katamari Roll game using Three.js and WebGL. 💫 I developed interactive 3D models and animations to create a dynamic, immersive environment with 20+ moving elements. The game runs smoothly at 50 FPS, offering an engaging experience for players as they roll their katamari through vibrant 3D worlds. 🌟',
    postLink: 'https://github.com/VennapusalaCharitha/Ocean_katamari.git',
    likes: 175,
    datePosted: "January 5, 2025",
  },
  {
    id: 1,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/projects/AirView/postPic1.png', '/assets/posts/projects/AirView/postPic2.gif'],
    caption: '🌐 AirView – Airport Operations Web Application, developed between May ’24 – Jun ’24. This application is designed to streamline airport operations, improving both user experience and operational efficiency. 🛫 Built with Python Flask, HTML, CSS, and JavaScript, it offers robust flight management, supporting up to 200 flight entries and 100+ bookings. 🔐 The app features secure user authentication with role-based access, managing over 100+ user accounts. 🚀 CI/CD was integrated using Docker and CircleCI, achieving 95% deployment efficiency. The project was recognized for exceptional leadership and execution, earning a 98% project grade. 🎓',
    postLink: 'https://github.com/BaloneyBoy97/PSD-TEAM',
    likes: 200,
    datePosted: "June 30, 2024",
  },

];  


const education = [

  {
    id: 2,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/education/slu/postpic1.jpeg'],
    caption: 'Masters in Computer Science @ Saint Louis University.',
    postLink: 'https://www.linkedin.com/school/saint-louis-university/posts/?feedView=all',
    likes: 175,
    datePosted: "May 17, 2025",
  },
  {
    id: 1,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/education/srm/postpic1.webp'],
    caption: 'Bachelors in Mechanical Engineering @ SRM university.',
    postLink: 'https://www.linkedin.com/company/srm-ist-ramapuram/posts/?feedView=all',
    likes: 200,
    datePosted: "March 20, 2022",
  },

]; 

const experience = [
  {
    id: 2,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/experience/interco/postpic1.png'],
    caption: `Software Developer @ Interco (Internship)
              Jun 2025 - Present · 2 mos
              St Louis, Missouri, United States · On-site`,
    postLink: 'https://www.linkedin.com/company/intercotrading/posts/?feedView=all',
    likes: 50,
    datePosted: "June 2025",
  },
  {
    id: 1,
    username: '_deeksaru__',
    userImage: '/assets/profile.jpg',
    images: ['/assets/posts/experience/scef/postpic1.webp'],
    caption: `Volunteer @ Santos Creations Educational Foundation (Freelance)
              Jul 2024 - Sep 2024 · 3 mos
              Surulere, Lagos State, Nigeria · Remote`,
    postLink: 'https://www.linkedin.com/company/santos-creations-educational-foundation/posts/',
    likes: 30,
    datePosted: "July 2024",
  },
];

const Profile = () => {
  const [selectedPost, setSelectedPost] = useState(null); // State for the selected post
  const [posts, setPosts] = useState(projects); // State for posts, defaulting to projects

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set selected post when clicked
  };

  const handleCloseOverlay = () => {
    setSelectedPost(null); // Close the overlay
  };

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
      {/* Conditionally render the overlay only when a post is selected */}
      {selectedPost && (
        <div className='overlay'>
          <PostPopup post={selectedPost} onClose={handleCloseOverlay}>

          </PostPopup>
          <button className="close-button" onClick={handleCloseOverlay}>
              close
          </button>
        </div>
      )}

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
          <p>Software Developer | Tech Enthusiast</p>
          <p>Ms Computer Science @ SLU</p>
          <div className="profile-stats">
            <p>4   <span>Hacks</span></p>
            <p>{projects.length}+  <span>Projects</span></p>
            <p>2+  <span>Experience</span></p>
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

        <div id="SectionHeader">
          <p 
            onClick={() => setPosts(experience)} 
            className={posts === experience ? "visited" : ""}
          >
            experience
          </p>
                    <p 
            onClick={() => setPosts(projects)}
            className={posts === projects ? "visited" : ""}
          >
            projects
          </p>
          <p onClick={() => setPosts(education)}
            className={posts === education ? "visited" : ""}
          >
              education
          </p>
        </div>

        {/* Post Grid */}
      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-item" onClick={() => handlePostClick(post)}>
            <img src={post.images[0]} alt={`Post ${post.id}`} className="post-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

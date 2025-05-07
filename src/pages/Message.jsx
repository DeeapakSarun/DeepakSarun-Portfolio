import React from 'react';
import instagramIcon from '/assets/dm/instagram.gif';
import linkedinIcon from '/assets/dm/linkedin.gif';
import githubIcon from '/assets/dm/github.gif';
import emailIcon from '/assets/dm/email.gif';
import devpostIcon from '/assets/dm/devpost.png';
import '../styles/Pages/Message.css'; 

const socialAccounts = [
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/_deeksaru__/',
    icon: instagramIcon,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/deepaksaruny/',
    icon: linkedinIcon,
  },
  {
    name: 'GitHub',
    link: 'https://github.com/DeeapakSarun',
    icon: githubIcon,
  },
  {
    name: 'Email',
    link: 'mailto:reddydeepak771@email.com',
    icon: emailIcon,
  },
  {
    name: 'Devpost',
    link: 'https://devpost.com/DeeapakSarun',
    icon: devpostIcon,
  },
];

const Message = () => {
  return (
    <div className="message-container">

      <div>
        {socialAccounts.map((account, idx) => (
          <a
            key={idx}
            href={account.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
          >
            <div className="icon-wrapper">
              <img
                src={account.icon}
                alt={account.name}
                className="social-icon"
              />
            </div>
            <div>
              <p className="social-name">{account.name}</p>
              <p className="social-subtext">Click to message</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Message;

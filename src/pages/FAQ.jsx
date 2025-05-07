import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/Pages/FAQ.css'; // import the CSS file

const faqs = [
  {
    question: "Who am I?",
    answer:
      "I'm Deepak Sarun Yuvachandran, a passionate frontend developer and software engineer based in St. Louis, Missouri. I'm currently pursuing my Master's in Computer Science at Saint Louis University.",
  },
  {
    question: "What inspired Instafolio?",
    answer:
      "I wanted a portfolio that breaks the mold — something visually familiar but functionally unique. Inspired by Instagram's UI, Instafolio lets me present my work as if you're scrolling through a feed.",
  },
  {
    question: "Why frontend development?",
    answer:
      "I love crafting interactive, accessible, and aesthetic web experiences. Frontend is where design meets logic — a space where creativity and code collide.",
  },
  {
    question: "What is Instafolio?",
    answer:
      "Instafolio is a portfolio inspired by Instagram’s design language. It showcases my work, skills, and experience in an interactive, scrollable format.",
  },
  {
    question: "What are your core frontend skills?",
    answer:
      "I specialize in React.js, Next.js, Tailwind CSS, and Three.js. I focus on creating user-friendly interfaces with attention to accessibility and performance.",
  },
  {
    question: "What hackathons have you participated in?",
    answer:
      "I’ve participated in 3 hackathons and secured 3rd place in one. You can explore my hackathon projects on my Devpost: https://devpost.com/software/detalk-bridging-communication-for-all",
  },
  {
    question: "Which project are you most proud of?",
    answer:
      "DeTalk — an accessibility-first communication platform built in 36 hours. It helps individuals with speech, visual, or hearing impairments connect in real time.",
  },
  {
    question: "Can I view your resume?",
    answer:
      "Yes, you can view or download my resume on the Resume page or visit deepaksarun.me.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "Reach out via the Contact page, email me at reddydeepak771@gmail.com, or connect on LinkedIn and GitHub.",
  },
  {
    question: "What’s next for Instafolio?",
    answer:
      "I'm working on adding interactive stories, project walkthroughs, and a personal blog to share tips, challenges, and insights from my dev journey.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Help & FAQ</h1>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="faq-item">
            <div className="faq-question-row" onClick={() => toggleAnswer(index)}>
              <h2 className={`faq-question ${isOpen ? 'open' : ''}`}>
                {faq.question}
              </h2>
              {isOpen ? (
                <ChevronUp size={20} color="#e1306c" />
              ) : (
                <ChevronDown size={20} color="#888" />
              )}
            </div>
            <div
              className={`faq-answer-wrapper ${isOpen ? 'show' : ''}`}
            >
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;

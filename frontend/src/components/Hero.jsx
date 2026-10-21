import React, { useState, useEffect } from 'react';
import './Hero.css';

function Hero({ heroContent = {} }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [fragments, setFragments] = useState([]);

  const content = {
    title: 'Siva Pavani',
    subtitle: 'General Stores · Darsi',
    tagline: 'Fresh Quality Products at Best Prices',
    description: 'Experience the convenience of online shopping\nfor all your daily grocery needs',
    features: [
      { icon: '✓', text: 'Fresh Products' },
      { icon: '✓', text: 'Best Prices' },
      { icon: '✓', text: 'Fast Delivery' },
    ],
    ...heroContent,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        setIsClicked(false);
        setFragments([]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    const newFragments = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 80 + Math.random() * 40;
      return {
        id: i,
        delay: i * 0.05,
        duration: 0.8 + Math.random() * 0.4,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360,
      };
    });
    setFragments(newFragments);

    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className={`hero ${!isVisible ? 'hidden' : ''}`}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-gradient"></div>
      </div>

      <div className="hero-content">
        <div className="hero-logo-animate" onClick={handleLogoClick} style={{ cursor: 'pointer', position: 'relative' }}>
          <div className={`hero-logo ${isClicked ? 'break' : ''}`}>
            {!isClicked ? 'SP' : ''}
          </div>
          {isClicked && fragments.map((frag) => (
            <div
              key={frag.id}
              className="logo-fragment"
              style={{
                '--fragment-delay': `${frag.delay}s`,
                '--fragment-duration': `${frag.duration}s`,
                '--fragment-x': `${frag.x}px`,
                '--fragment-y': `${frag.y}px`,
                '--fragment-rotation': `${frag.rotation}deg`,
              }}
            />
          ))}
        </div>

        <h1 className="hero-title">{content.title}</h1>
        <p className="hero-subtitle">{content.subtitle}</p>

        <p className="hero-tagline">
          {content.tagline}
        </p>

        <p className="hero-description">
          {content.description}
        </p>

        <div className="hero-features">
          {content.features && content.features.map((feature, idx) => (
            <div key={idx} className="feature-item">
              <span className="feature-icon">{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll">
        <p>Scroll down</p>
        <div className="scroll-indicator">
          <span className="scroll-dot"></span>
          <span className="scroll-dot"></span>
          <span className="scroll-dot"></span>
        </div>
      </div>
    </div>
  );
}

export default Hero;

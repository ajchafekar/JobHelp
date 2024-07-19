import React from 'react';
import '../styles/herosection.css'; // Ensure the CSS file is linked
import bannerVideo from '../assets/banner2.mp4';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src= {bannerVideo} autoPlay loop muted />
      <div className='hero-text'>
        <h1>Upload Your Resume, Let Us Do the Job Hunting</h1>
        <p>We'll Connect You with the Best Part-Time Jobs No More Door-to-Door Searches</p>
        <button className='get-started-btn'>Get Started</button>
      </div>
    </div>
  );
}

export default HeroSection;

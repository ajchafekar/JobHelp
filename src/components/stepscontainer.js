import React from 'react';
import '../styles/stepscontainer.css'; // Ensure the CSS file is linked
import bannerVideo from '../assets/banner2.mp4';

// Import your PNG icons
import icon1 from '../assets/login.png';
import icon2 from '../assets/upload.png';
import icon3 from '../assets/verify.png';


function StepsContainer() {
  return (
    <div className='steps-container'>
      <div className='step'>
        <img src={icon1} alt="Step 1" className='icon' />
        <div className='line'>Sign Up with JobAmi</div>
      </div>
      <div className='step'>
        <img src={icon2} alt="Step 2" className='icon' />
        <div className='line'>Upload Your Resume Effortlessly</div>
      </div>
      <div className='step'>
        <img src={icon3} alt="Step 3" className='icon' />
        <div className='line'>Verify Your Information</div>
      </div>
    </div>
  );
}

export default StepsContainer;

import React from 'react';
import '../styles/casestudy.css'; // Ensure the CSS file is linked


// Import your PNG icons
import icon1 from '../assets/case1.jpg';
import icon2 from '../assets/case2.jpg';
import icon3 from '../assets/case3.jpg';


function CaseStudy() {
  return (
    <div className='case-study-container'>
      <div className='case-study-section' id='what'>
        <div className='case-study-content'>
          <h2>The Challenge</h2>
          <p>The Problem: When arriving in Canada, students often face the cumbersome task of printing multiple copies of their resumes and visiting various stores to find job opportunities. This process is not only time-consuming but also inefficient.</p>
        </div>
      </div>
      <div className='case-study-section' id='how'>
        <div className='case-study-content'>
          <h2>Our Solution</h2>
          <p>Our Solution: Instead of having students go door-to-door, our platform simplifies the process. By uploading their resume to our system, students allow our team to handle the job search on their behalf. We personally visit stores and match students with the best job opportunities suited to their qualifications and preferences.</p>
        </div>
      </div>
      <div className='case-study-section' id='why'>
        <div className='case-study-content'>
          <h2>The Impact</h2>
          <p>The Benefit: This approach saves students valuable time and effort. Rather than spending days searching for jobs, students can focus on their studies and other priorities while we manage the job search and provide tailored recommendations.</p>
        </div>
      </div>
    </div>
  );
}

export default CaseStudy;

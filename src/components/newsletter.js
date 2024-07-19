import React from 'react'
import '../styles/newsletter.css';

function NewsLetter() {
  return (
    <div className='news-container'>
        <div className='card-container'>
            <h3>Don't Miss Out!</h3>
            <h1>Subscribe to Our Newsletter</h1>
            <p>Get the Latest Employment Updates and Job Alerts by Subscribing to Our Newsletter.</p>
            <div className="newsletter-input">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
            </div>
        </div>
    </div>
    
  )
}

export default NewsLetter

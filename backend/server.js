const express = require('express');
const connection = require('./db');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: 'jobamiservice@gmail.com', // Your email address
      pass: 'cwrt xdkp jjwk vyat'   // Your email password (or app-specific password)
    }
  });



app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from this origin
  }));
// Middleware to parse JSON bodies
app.use(express.json());


// Route to handle newsletter subscription
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const query = 'INSERT INTO subscribers (email) VALUES (?)';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Email already subscribed' });
            }
            return res.status(500).json({ message: 'Error subscribing to newsletter', error: err });
        }
        
        const mailOptions = {
            from: 'your-email@gmail.com', // Your email address
            to: email,
            subject: 'Welcome to JobAmi! 🎉',
            text: `Hello and welcome to JobAmi! 🌟\n\nWe’re thrilled you’ve joined our community. Your journey towards finding the perfect job just got easier! Our passionate team is already hard at work to match you with exciting opportunities that fit your unique skills and preferences.\n\nStay tuned for updates and get ready to explore a world of job possibilities tailored just for you. We’re here to support you every step of the way.\n\nThank you for subscribing and for placing your trust in JobAmi. We can’t wait to help you discover your next great career move!\n\nWarm regards,\nThe JobAmi Team 🚀`
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Email error:', error);
              return res.status(500).json({ message: 'Subscription successful, but failed to send confirmation email' });
            }
            res.status(201).json({ message: 'Subscribed successfully and confirmation email sent' });
          });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
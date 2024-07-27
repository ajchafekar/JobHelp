const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const cors = require('cors'); // Add this line
const nodemailer = require('nodemailer');
const connection = require('./db');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5001; // or any port you prefer
const secretKey = 'a2xG3bR7tD9yH0kN1mL6oV5pW8uXzQ4rS7eF1gJ3kL9nM2oC6vR0tA1xY8zaod';
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: 'jobamiservice@gmail.com', // Your email address
      pass: 'cwrt xdkp jjwk vyat'   // Your email password (or app-specific password)
    },
});


// used configuration file for db details MySQL connection setup
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'newsletter'
// });

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(cors()); // Add this line
app.use(bodyParser.json());

// Signup and Login Endpoint
app.post('/api/auth', async (req, res) => {
  const { name, email, password, action } = req.body;

  if (action === 'signup') {
    // Check if user already exists
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Database error' });
      }
      if (results.length > 0) {
        return res.status(400).send({ message: 'Email already registered' });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a JWT token
      const token = jwt.sign({ email ,name, hashedPassword }, secretKey, { expiresIn: '1h' });

      // Create magic link
      const magicLink = `http://localhost:5001/verify?token=${token}`;

      const mailOptions = {
        from: 'jobamiservice@gmail.com',
        to: email,
        subject: '🌟 Your Signup Awaits! Confirm Your Email Here 🌟',
        text: `Hello there!\n\nYou're just one step away from joining us! Click the link below to finalize your signup
         and start exploring all the great features we have in store for you.\n\n👉 ${magicLink} 👈\n\nWe’re excited to 
         have you on board and can’t wait for you to dive in. If you have any questions or need assistance, just let us know.
         \n\nWelcome to the community!\n\nBest regards,\nThe JobAmi Team`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send(error.toString());
      res.status(200).send('Signup email sent');
  });


      // // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);

      // // Insert new user into the database
      // db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      //   [name, email, hashedPassword], (err, results) => {
      //     if (err) {
      //       return res.status(500).send({ message: 'Database error' });
      //     }
      //     res.status(200).send({ message: 'User signed up successfully' });
      //   });


    });
  } else if (action === 'login') {
    // Check if email is present
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(400).send({ message: 'Email not registered. Please sign up.' });
      }

      const user = results[0];

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).send({ message: 'Login successful' });
      } else {
        res.status(400).send({ message: 'Incorrect password' });
      }
    });
  } else {
    res.status(400).send({ message: 'Invalid action' });
  }
});

app.get('/verify',async(req, res) =>{
  const { token } = req.query;
  try{
    const decoded = jwt.verify(token, secretKey);
    const { email, name, hashedPassword } = decoded;
    connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
       [name, email, hashedPassword], (err, results) => {
      if (err) return res.status(500).send('Database insertion error');

      // Create a session token
      const sessionToken = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
       // Redirect to homepage with session token
       //res.redirect(`http://localhost:3000/home?token=${sessionToken}`);
       res.json({
        message: 'Signup successful',
        user: { name, email }, // Include user data in the response
        token: sessionToken
      });
    });
  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

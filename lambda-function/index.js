import mysql from 'mysql2';

// Set up database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'newsletter'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  
  // Your subscription logic here
  const email = JSON.parse(event.body).email;

  // Example of inserting into database (adjust according to your logic)
  const query = 'INSERT INTO subscribers (email) VALUES (?)';
  return new Promise((resolve, reject) => {
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error subscribing to newsletter:', err);
        return reject({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error subscribing to newsletter' }),
        });
      }
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: 'Subscribed successfully!' }),
      });
    });
  });
};

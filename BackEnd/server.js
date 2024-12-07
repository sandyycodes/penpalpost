// Import the required modules
const express = require('express');
const nodemailer = require('nodemailer');

// Initialize the Express app
const app = express();

// Set the port for the server to listen on
const port = 3000;

// Create a transporter object using SMTP (email sending service)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other email services like Yahoo, Outlook, etc.
  auth: {
    user: 'your-email@gmail.com',  // Your email
    pass: 'your-email-password',   // Your email password (or app-specific password if 2FA enabled)
  },
});

// Set up a route to send an email
app.get('/send-email', (req, res) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'Pen Pal Letter',
    text: 'Hello, you have a new letter waiting for you at Pen Pal Post!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send('Error: ' + error.message);
    }
    res.send('Email sent: ' + info.response);
  });
});

// Set up a simple route
app.get('/', (req, res) => {
  res.send('Hello, welcome to your Express server!');
});

// Make the server listen for requests
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

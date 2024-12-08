const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Import axios for making API requests
const cors = require('cors'); // For handling CORS
const path = require('path'); // To resolve the path for serving the index.html file

const app = express();
const port = 3000;

// Use bodyParser to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Serve static files like CSS, JS, and the index.html
app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Serve the index.html when visiting the root URL (http://localhost:3000/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Google Maps Distance Matrix API setup
const googleMapsApiKey = 'AIzaSyD9lpBtU1XK3TCTgEsBqL70XCKRrCBcnEA'; // Replace with your actual Google Maps API Key

// Endpoint to handle distance calculation and form submission
app.post('/get-distance', async (req, res) => {
    const { senderZip, recipientZip } = req.body; // Get the zip codes from the frontend
    console.log('Received data:', req.body); // Log the received zip codes for debugging

    // Google Maps Distance Matrix API URL
    const googleMapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${senderZip}&destinations=${recipientZip}&key=${googleMapsApiKey}`;
    console.log('Google Maps URL:', googleMapsUrl); // Log the URL being requested

    try {
        // Fetch the distance information from Google Maps API
        const response = await axios.get(googleMapsUrl);
        console.log('Google Maps response:', response.data); // Log the full response from Google Maps

        // Check if the response contains valid distance data
        if (response.data && response.data.rows && response.data.rows[0].elements && response.data.rows[0].elements[0].distance) {
            const distance = response.data.rows[0].elements[0].distance.text;
            console.log('Calculated distance:', distance); // Log the calculated distance

            // Send the calculated distance back to the frontend
            res.json({ distance });
        } else {
            // Handle the case where the distance data is missing
            console.error('Error: Missing distance data in response.');
            res.status(500).json({ error: 'Distance data not available from API response' });
        }
    } catch (error) {
        console.error('Error fetching distance from Google Maps:', error); // Log the error details
        res.status(500).send('Error calculating distance'); // Send a 500 error response if something goes wrong
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

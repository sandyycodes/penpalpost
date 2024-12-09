const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb'); // Import MongoDB client

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb+srv://sandytan615:yuXi0RqhJJN0c4xI@penpal-post.0qsxr.mongodb.net/?retryWrites=true&w=majority&appName=Penpal-Post'; // Use your MongoDB URI here
const client = new MongoClient(uri);
let collection;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Google Maps API key
const googleMapsApiKey = 'AIzaSyD9lpBtU1XK3TCTgEsBqL70XCKRrCBcnEA'; // Replace with your actual API key

// Initialize MongoDB connection and set up collection
async function initializeDatabase() {
    try {
        await client.connect();
        const database = client.db('letterDB');
        collection = database.collection('letters');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

// Call the initialize function
initializeDatabase();

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// Serve the send-letter.html file
app.get('/send-letter', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'send-letter.html'));
});

// Endpoint to calculate distance and estimated time
app.post('/get-distance', async (req, res) => {
    const { senderZip, recipientZip } = req.body;
    console.log('Received data:', req.body);

    const googleMapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${senderZip}&destinations=${recipientZip}&key=${googleMapsApiKey}`;
    console.log('Google Maps URL:', googleMapsUrl);

    try {
        const response = await axios.get(googleMapsUrl);
        console.log('Google Maps response:', response.data);

        if (
            response.data &&
            response.data.rows &&
            response.data.rows[0].elements &&
            response.data.rows[0].elements[0].distance
        ) {
            const distanceText = response.data.rows[0].elements[0].distance.text;
            const distanceValue = response.data.rows[0].elements[0].distance.value; // Distance in meters
            const distanceMiles = (distanceValue / 1609.34).toFixed(2); // Convert to miles

            let estimatedTime;

            if (distanceMiles >= 400) {
                // If distance is greater than 400 miles, generate a random estimated time between 10 and 14 days
                const randomDays = Math.floor(Math.random() * (14 - 10 + 1)) + 10;
                estimatedTime = `${randomDays} day(s)`;
            } else {
                // Calculate estimated time normally
                const averageMailSpeed = 40; // Average speed of postal mail in miles per day
                const estimatedDays = Math.ceil(distanceMiles / averageMailSpeed);
                estimatedTime = `${estimatedDays} day(s)`;
            }

            console.log(`Calculated distance: ${distanceText}, Estimated Time: ${estimatedTime}`);
            res.json({ distance: distanceText, estimatedTime });
        } else {
            console.error('Error: Missing distance data in response.');
            res.status(500).json({ error: 'Distance data not available from API response' });
        }
    } catch (error) {
        console.error('Error fetching distance from Google Maps:', error.message);
        res.status(500).json({ error: 'Error calculating distance' });
    }
});

// POST route for submitting the letter data to MongoDB
// app.post('/save-letter', async (req, res) => {
//     try {
//         const letterData = req.body;
//         const result = await db.collection('letters').insertOne(letterData);
//         console.log('Letter saved:', result);
//         res.status(200).json({ message: 'Letter saved successfully' });
//     } catch (error) {
//         console.error('Error saving letter to database:', error);
//         res.status(500).json({ message: 'Error saving letter to database' });
//     }
// });

app.post('/save-letter', async (req, res) => {
    try {
        const letterData = req.body;
        const result = await collection.insertOne(letterData); // Use 'collection' here
        console.log('Letter saved:', result);
        res.status(200).json({ message: 'Letter saved successfully' });
    } catch (error) {
        console.error('Error saving letter to database:', error);
        res.status(500).json({ message: 'Error saving letter to database' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'FrontEnd')));

// const googleMapsApiKey = 'AIzaSyD9lpBtU1XK3TCTgEsBqL70XCKRrCBcnEA'; // Replace with your actual API key

// // Serve the index.html file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
// });

// // Serve the send-letter.html file
// app.get('/send-letter', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Frontend', 'send-letter.html'));
// });

// // Endpoint to calculate distance and estimated time
// app.post('/get-distance', async (req, res) => {
//     const { senderZip, recipientZip } = req.body;
//     console.log('Received data:', req.body);

//     const googleMapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${senderZip}&destinations=${recipientZip}&key=${googleMapsApiKey}`;
//     console.log('Google Maps URL:', googleMapsUrl);

//     try {
//         const response = await axios.get(googleMapsUrl);
//         console.log('Google Maps response:', response.data);

//         if (
//             response.data &&
//             response.data.rows &&
//             response.data.rows[0].elements &&
//             response.data.rows[0].elements[0].distance
//         ) {
//             const distanceText = response.data.rows[0].elements[0].distance.text;
//             const distanceValue = response.data.rows[0].elements[0].distance.value; // Distance in meters
//             const distanceMiles = (distanceValue / 1609.34).toFixed(2); // Convert to miles

//             let estimatedTime;

//             if (distanceMiles >= 400) {
//                 // If distance is greater than 400 miles, generate a random estimated time between 10 and 14 days
//                 const randomDays = Math.floor(Math.random() * (14 - 10 + 1)) + 10;
//                 estimatedTime = `${randomDays} day(s)`;
//             } else {
//                 // Calculate estimated time normally
//                 const averageMailSpeed = 40; // Average speed of postal mail in miles per day
//                 const estimatedDays = Math.ceil(distanceMiles / averageMailSpeed);
//                 estimatedTime = `${estimatedDays} day(s)`;
//             }

//             console.log(`Calculated distance: ${distanceText}, Estimated Time: ${estimatedTime}`);
//             res.json({ distance: distanceText, estimatedTime });
//         } else {
//             console.error('Error: Missing distance data in response.');
//             res.status(500).json({ error: 'Distance data not available from API response' });
//         }
//     } catch (error) {
//         console.error('Error fetching distance from Google Maps:', error.message);
//         res.status(500).json({ error: 'Error calculating distance' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'FrontEnd')));

const googleMapsApiKey = 'AIzaSyD9lpBtU1XK3TCTgEsBqL70XCKRrCBcnEA'; // Replace with your actual API key

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

        // Check if the response contains valid distance data
        if (
            response.data &&
            response.data.rows &&
            response.data.rows[0] &&
            response.data.rows[0].elements &&
            response.data.rows[0].elements[0] &&
            response.data.rows[0].elements[0].distance
        ) {
            const distanceText = response.data.rows[0].elements[0].distance.text;
            const distanceValue = response.data.rows[0].elements[0].distance.value; // Distance in meters
            const distanceMiles = (distanceValue / 1609.34).toFixed(2); // Convert to miles

            let estimatedTime;

            // If distance value exceeds 4667 km or 2900 miles, use a random time between 10 and 14 days
            if (distanceValue > 4667) {
                const randomDays = Math.floor(Math.random() * (14 - 10 + 1)) + 10;
                estimatedTime = `${randomDays} day(s)`;
            } else {
                // Calculate estimated time for mail delivery
                const averageMailSpeed = 40; // Average speed of postal mail in miles per day
                const estimatedDays = Math.ceil(distanceMiles / averageMailSpeed);
                estimatedTime = `${estimatedDays} day(s)`;
            }

            console.log(`Calculated distance: ${distanceText}, Estimated Time: ${estimatedTime}`);
            res.json({ distance: distanceText, estimatedTime });
        } else {
            // Handle missing distance data or empty destination
            console.error('Error: Missing distance data in response or invalid destination.');
            res.status(400).json({ error: 'Invalid destination zip code or no data available from the API response.' });
        }
    } catch (error) {
        // Handle errors in fetching data
        console.error('Error fetching distance from Google Maps:', error.message);
        res.status(500).json({ error: 'Error calculating distance' });
    }
});

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

//             // Calculate estimated time for mail delivery
//             const averageMailSpeed = 40; // Average speed of postal mail in miles per day
//             const estimatedDays = Math.ceil(distanceMiles / averageMailSpeed);
//             const estimatedTime = `${estimatedDays} day(s)`;

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



// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const axios = require('axios');
// // const cors = require('cors');
// // const path = require('path');

// // const app = express();
// // const port = 3000;

// // app.use(bodyParser.json());
// // app.use(cors());
// // app.use(express.static(path.join(__dirname, 'FrontEnd')));

// // const googleMapsApiKey = 'AIzaSyD9lpBtU1XK3TCTgEsBqL70XCKRrCBcnEA';

// // // Serve the index.html file
// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'index.html'));
// // });

// // app.post('/get-distance', async (req, res) => {
// //     const { senderZip, recipientZip } = req.body;
// //     console.log('Received data:', req.body);

// //     const googleMapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${senderZip}&destinations=${recipientZip}&key=${googleMapsApiKey}`;
// //     console.log('Google Maps URL:', googleMapsUrl);

// //     try {
// //         const response = await axios.get(googleMapsUrl);
// //         console.log('Google Maps response:', response.data);

// //         if (response.data && response.data.rows && response.data.rows[0].elements && response.data.rows[0].elements[0].distance) {
// //             const distanceText = response.data.rows[0].elements[0].distance.text; // Example: "145 mi"
// //             const distanceValue = response.data.rows[0].elements[0].distance.value; // Distance in meters
// //             const distanceMiles = (distanceValue / 1609.34).toFixed(2); // Convert meters to miles

// //             // Calculate estimated time for mail delivery
// //             const averageMailSpeed = 40; // Average speed of postal mail in miles per day
// //             const estimatedDays = Math.ceil(distanceMiles / averageMailSpeed);
// //             const estimatedTime = `${estimatedDays} day(s)`;

// //             console.log(`Calculated distance: ${distanceText}, Estimated Time: ${estimatedTime}`);
// //             res.json({ distance: distanceText, estimatedTime });
// //         } else {
// //             console.error('Error: Missing distance data in response.');
// //             res.status(500).json({ error: 'Distance data not available from API response' });
// //         }
// //     } catch (error) {
// //         console.error('Error fetching distance from Google Maps:', error);
// //         res.status(500).send('Error calculating distance');
// //     }
// // });

// // app.listen(port, () => {
// //     console.log(`Server is running on http://localhost:${port}`);
// // });

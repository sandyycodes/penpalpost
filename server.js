const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();  

const app = express();
const port = 3000;

// MongoDB connection URI from .env file
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let collection;
let usersCollection;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Google Maps API key from .env file
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

// Initialize MongoDB connection and set up collections
async function initializeDatabase() {
    try {
        await client.connect();
        const database = client.db('letterDB');
        collection = database.collection('letters');
        usersCollection = database.collection('users');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

initializeDatabase();

// Serve static files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/send-letter', (req, res) => res.sendFile(path.join(__dirname, 'public', 'send-letter.html')));
app.get('/mailbox', (req, res) => res.sendFile(path.join(__dirname, 'public', 'mailbox.html')));

// Calculate distance and estimated time
app.post('/get-distance', async (req, res) => {
    const { senderZip, recipientZip } = req.body;
    const googleMapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${senderZip}&destinations=${recipientZip}&key=${googleMapsApiKey}`;

    try {
        const response = await axios.get(googleMapsUrl);
        const data = response.data?.rows?.[0]?.elements?.[0];

        if (!data || !data.distance) throw new Error('Invalid API response');

        const distanceMiles = (data.distance.value / 1609.34).toFixed(2);
        const estimatedTime = distanceMiles >= 400
            ? `${Math.floor(Math.random() * (14 - 10 + 1)) + 10} day(s)`
            : `${Math.ceil(distanceMiles / 40)} day(s)`;

        res.json({ distance: data.distance.text, estimatedTime });
    } catch (error) {
        res.status(500).json({ error: 'Error calculating distance' });
    }
});

// UUID handling
async function checkOrCreateUUID(email) {
    const user = await usersCollection.findOne({ email });
    if (user) return user.uuid;

    const newUUID = uuidv4();
    await usersCollection.insertOne({ email, uuid: newUUID });
    return newUUID;
}

app.post('/check-or-create-uuid', async (req, res) => {
    const { recipientEmail } = req.body;
    if (!recipientEmail) return res.status(400).json({ error: 'Email is required' });

    try {
        const uuid = await checkOrCreateUUID(recipientEmail);
        res.status(200).json({ uuid });
    } catch {
        res.status(500).json({ error: 'Error generating UUID' });
    }
});

// Save letter
app.post('/save-letter', async (req, res) => {
    const letterData = req.body;

    if (!letterData.senderName || !letterData.recipientName || !letterData.letterContent || !letterData.recipientEmail) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const recipientUUID = await checkOrCreateUUID(letterData.recipientEmail);
        await collection.insertOne({ ...letterData, recipientUUID });
        res.status(200).json({ message: 'Letter saved successfully' });
    } catch {
        res.status(500).json({ message: 'Error saving letter' });
    }
});

// Fetch letters
const { ObjectId } = require('mongodb'); 

// Fetch letters for a user by UUID (for mailbox view)
app.get('/fetch-letters-by-uuid', async (req, res) => {
    const { uuid } = req.query;

    if (!uuid) {
        return res.status(400).json({ error: 'UUID is required' });
    }

    try {
        // Fetch all letters for this recipient UUID
        const letters = await collection.find({ recipientUUID: uuid }).toArray();

        if (!letters.length) {
            return res.status(404).json({ error: 'No letters found for this UUID' });
        }

        // Return the list of letters
        res.status(200).json(letters);
    } catch (error) {
        console.error('Error fetching letters:', error);
        res.status(500).json({ error: 'Error fetching letters' });
    }
});

// Fetch a single letter by ObjectId (for view-letter page)
app.get('/fetch-letter-by-id', async (req, res) => {
    const { id } = req.query;  

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        // Convert string to ObjectId
        const letterId = new ObjectId(id);

        // Find the letter by its _id
        const letter = await collection.findOne({ _id: letterId });

        if (!letter) {
            return res.status(404).json({ error: 'Letter not found' });
        }

        // Return the letter details
        res.status(200).json(letter);
    } catch (error) {
        console.error('Error fetching letter:', error);
        res.status(500).json({ error: 'Error fetching letter' });
    }
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

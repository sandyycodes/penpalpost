const { MongoClient } = require('mongodb');

// Replace the placeholder with your actual MongoDB connection string
const uri = "mongodb+srv://sandytan615:yuXi0RqhJJN0c4xI@penpal-post.0qsxr.mongodb.net/?retryWrites=true&w=majority&appName=Penpal-Post";

async function main() {
    // Create a new MongoClient
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        console.log("Connected to MongoDB Atlas");

        // Access your database and collection
        const database = client.db('letterDB');  // Your database name
        const collection = database.collection('letters');  // Your collection name

        // You can now perform database operations, like inserting a document
        const newLetter = {
            name: "John Doe",
            email: "john@example.com",
            subject: "Test Letter",
            message: "This is a test message.",
            time: 120,
            distance: 50
        };

        // Insert the letter document into the collection
        const result = await collection.insertOne(newLetter);
        console.log(`New letter inserted with the following id: ${result.insertedId}`);
    } finally {
        // Ensure to close the connection after the operations are complete
        await client.close();
    }
}

main().catch(console.error);

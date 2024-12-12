const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://sandytan615:yuXi0RqhJJN0c4xI@penpal-post.0qsxr.mongodb.net/?retryWrites=true&w=majority&appName=Penpal-Post";

async function main() {
  
    const client = new MongoClient(uri);

    try {
    
        await client.connect();

        console.log("Connected to MongoDB Atlas");

    
        const database = client.db('letterDB');  
        const collection = database.collection('letters');  

 
        const newLetter = {
            name: "John Doe",
            email: "john@example.com",
            subject: "Test Letter",
            message: "This is a test message.",
            time: 120,
            distance: 50
        };

   
        const result = await collection.insertOne(newLetter);
        console.log(`New letter inserted with the following id: ${result.insertedId}`);
    } finally {
   
        await client.close();
    }
}

main().catch(console.error);

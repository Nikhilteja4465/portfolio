const http = require('http');
const path = require('path')
const fs = require('fs');
const mongodb = require('mongodb');
const server = http.createServer((req, res) => {


    console.log(req.url);



    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });

    }
    else if (req.url == '/about.html') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
    else if (req.url === "/api") {
        var input;

        //import { MongoClient } from 'mongodb';
        const { MongoClient } = require('mongodb');

        main(processData);
        async function main(callback) {

            const uri = "mongodb+srv://nikhilteja:Nikhil@cluster0.5kvscgg.mongodb.net/?retryWrites=true&w=majority";

            // Create a MongoClient with a MongoClientOptions object to set the Stable API version
            const client = new MongoClient(uri, { useUnifiedTopology: true });
            try {
                //Import the MongoClient class from the mongodb package:


                // Connect to MongoDB Atlas cluster
                await client.connect();
                console.log('Connected to MongoDB Atlas cluster');

                const LaptopCollection = client.db('Laptops').collection('Laptop');

                const collectionData = {

                    LaptopDetails: await LaptopCollection.find().toArray()
                };

                console.log(collectionData);


                input = collectionData;
                console.log('My data from Mongo Db');
                console.log(input);



                callback(input);

            } catch (err) {
                console.error(err);
            } finally {

                await client.close();
                console.log('Disconnected from MongoDB Atlas cluster');
            }

        }

        function processData(data) {

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(data));
        }



    }


    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>404 not found</h1>")

    }


})

server.listen(5950, () => console.log("Our server is running"));
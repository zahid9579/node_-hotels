const mongoose =  require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL // Replace 'mydatabase' with your database name
const mongoURL = process.env.MONGODB_URL; 

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Define event listeners for database connection..
db.on('connected', () =>{
    console.log('Connected to MongoDB server');
})

db.on('error', (err) =>{
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
});


// Export the database connection..
module.exports = db;
const { MongoClient } = require('mongodb');
const dns = require('node:dns');
require('dotenv').config();


try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch {

}

const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectDB() {
  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in your .env file!');
    console.error('   Please check that your .env file has: MONGODB_URI=mongodb+srv://<username>:<password>@...');
    process.exit(1);
  }

  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    await client.connect();
    db = client.db(process.env.DB_NAME || 'datapollex-lms');
    console.log('✅ Connected successfully to MongoDB Native Driver');
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(error.message);
    console.error('\n💡 Troubleshooting:');
    if (uri && uri.includes('localhost')) {
      console.error('   • Local MongoDB is not running on port 27017.');
      console.error('   • If using MongoDB Atlas, replace MONGODB_URI in .env with your cloud cluster URI.');
      console.error('   • If using local MongoDB, ensure MongoDB service is installed and started.');
    } else {
      console.error('   • Check your internet connection.');
      console.error('   • Make sure your IP address is whitelisted in MongoDB Atlas (Network Access -> Add IP -> 0.0.0.0/0).');
      console.error('   • Verify your database username & password in .env.');
    }
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized! Call connectDB first.');
  }
  return db;
}

module.exports = { connectDB, getDB };


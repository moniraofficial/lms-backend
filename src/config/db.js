const { MongoClient } = require('mongodb');
const dns = require('node:dns');
require('dotenv').config();

// Fix for Node.js on Windows resolving MongoDB Atlas SRV records locally
// Do not override DNS on Linux/Vercel (AWS Lambda)
if (process.platform === 'win32') {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch {
    // Ignore if custom DNS cannot be set
  }
}

let cachedClient = null;
let cachedDb = null;

async function connectDB() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    const errorMsg = '❌ MONGODB_URI is not defined in environment variables! Please add it in your .env file or Vercel Environment Variables.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    await cachedClient.connect();
    cachedDb = cachedClient.db(process.env.DB_NAME || 'datapollex-lms');
    console.log('✅ Connected successfully to MongoDB Native Driver');
    return cachedDb;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
}

function getDB() {
  if (!cachedDb) {
    throw new Error('Database not initialized! Call connectDB first.');
  }
  return cachedDb;
}

module.exports = { connectDB, getDB };

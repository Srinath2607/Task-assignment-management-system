const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-management';

console.log('Testing MongoDB connection...');
console.log(`URI: ${uri}`);

mongoose.connect(uri)
    .then(() => {
        console.log('✅ MongoDB connection successful!');
        console.log('You are ready to run the application.');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:');
        console.error(err.message);
        console.log('\nTroubleshooting:');
        console.log('1. Make sure MongoDB is installed');
        console.log('2. Make sure the "mongod" service is running');
        console.log('3. Check if port 27017 is available');
        process.exit(1);
    });

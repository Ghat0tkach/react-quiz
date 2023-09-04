// connect.js

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

async function connect() {
    try {
        await mongoose.connect(process.env.ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

module.exports = {
    connect: connect,
};

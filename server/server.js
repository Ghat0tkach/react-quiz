const express = require('express');
const cors = require('cors');
 // Assuming the JSON file is in the same directory as server.js
const morgan = require('morgan');
const questionsRouter = require('./router/route.js');
const { connect } = require('./database/connections.js');


const app = express();
connect();
app.use(cors({
  origin: "http://localhost:3000/", 
}));
require('dotenv').config();
app.use(express.json())
app.use('/api',questionsRouter)


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

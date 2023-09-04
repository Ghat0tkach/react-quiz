const express = require('express');
const cors = require('cors');
const questionsRouter = require('./router/route.js');
const { connect } = require('./database/connections.js');

const allowedOrigins = ['https://react-quiz-jlug.netlify.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
const app = express();
app.use(cors(corsOptions));

connect();
require('dotenv').config();
app.use(express.json())
app.use('/api',questionsRouter)


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

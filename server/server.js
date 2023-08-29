const express = require('express');
const cors = require('cors');
const questionsData = require('../data/question.json'); // Assuming the JSON file is in the same directory as server.js

const app = express();

app.use(cors());

app.get('/questions', (req, res) => {
  res.json(questionsData.questions);
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

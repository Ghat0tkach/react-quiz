const { Question } = require("../models/questionSchema.js");
const { Leaderboard } = require("../models/LeaderboardSchema.js");
const { question } = require('../database/data.js');

async function getQuestions(req, res) {
    try {
        const q = await Question.find();
        res.json(q);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching questions', message: error.message });
    }
}

async function insertQuestions(req, res) {
    try {
        // Insert questions from 'data.js' into the database
        await Question.insertMany(question);
        res.json({ msg: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error inserting questions', message: error.message });
    }
}

async function deleteQuestions(req, res) {
    try {
        await Question.deleteMany();
        res.json({ msg: 'Questions Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting questions', message: error.message });
    }
}
async function saveLeaderboardEntry(req, res) {
    try{
        const {username,points,time}= req.body;
        if(!username && !points) throw new Error("Data not Provided;")
 
        await Leaderboard.create({username,points,time})
        res.json({ msg: 'Result saved successfully'});
     }
     catch(error){
        res.json(error)
    }
  }
  async function getLeaderboard(req, res) {
    try {
      const leaderboard = await Leaderboard.find().sort({ points: -1 }); // Sort by points in descending order
      res.json(leaderboard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve leaderboard entries" });
    }
  }
  
  async function deleteLeaderboardEntry(req, res) {
    try {
        await Leaderboard.deleteMany();
        res.json({ success: true, message: "Leaderboard entry deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete leaderboard entry" });
    }
  }
module.exports = { getQuestions, insertQuestions, deleteQuestions, getLeaderboard,
    deleteLeaderboardEntry,saveLeaderboardEntry, };

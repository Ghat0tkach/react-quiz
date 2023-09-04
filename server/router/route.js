const { Router } = require("express");

const { getQuestions } = require("../controller/controller");
const controller = require("../controller/controller");
/**question routes */
const router=Router();


// router.get('/questions', controller.getQuestions);
// router.post('/questions',controller.insertQuestions)


router.route('/questions')
.get(controller.getQuestions)
.post(controller.insertQuestions)
.delete(controller.deleteQuestions)


router.route("/leaderboard")
  .get(controller.getLeaderboard) // GET leaderboard entries
  .post(controller.saveLeaderboardEntry) // POST leaderboard entry
  .delete(controller.deleteLeaderboardEntry); // DELETE leaderboard entry

// router.route('/result')
// .get(controller.getResult)
// .post(controller.postResult)
// .delete(controller.deleteResult)
// CommonJS module syntax
module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const questController = require("../controllers/questController");
const charactorController = require("../controllers/charactorController");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// http://localhost:3000/users/register
router.post("/register", userController.register);

// http://localhost:3000/users/login
router.post("/login", userController.login);

// // http://localhost:3000/quest
// router.get("/quest", questController.getAllQuest);
// // http://localhost:3000/quest/random
// router.get("/quest/random", questController.getRandomQuest);
// router.post("/quest", questController.createQuest);

// http://localhost:3000/charactor
router.get("/charactor", charactorController.getAllCharactors);
router.post("/charactor", charactorController.createCharactor);
router.get("/charactor/:id", charactorController.getCharactor);
router.patch("/charactor/:id", charactorController.updateCharactor);
router.delete("/charactor/:id", charactorController.deleteCharactor);













module.exports = router;

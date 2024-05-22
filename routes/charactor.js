const express = require("express");
const charactorController = require("../controllers/charactorController");

const router = express.Router();

router
  .route("/")
  .get(charactorController.getAllCharactors) // http://localhost:3000/charactor
  .post(charactorController.createCharactor); // http://localhost:3000/charactor

router
  .route("/:id")
  .get(charactorController.getCharactor) // http://localhost:3000/charactor/1
  .patch(charactorController.updateCharactor) // http://localhost:3000/charactor/1
  .delete(charactorController.deleteCharactor); // http://localhost:3000/charactor/1

// updateStatusUsedByIdCharactor
// http://localhost:3000/charactor/1/updateStatusUsed
router.patch(
  "/:id/updateStatusUsed",
  charactorController.updateStatusUsedByIdCharactor
);
 

module.exports = router;

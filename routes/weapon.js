const express = require("express");
const weaponController = require("../controllers/weaponController");
const router = express.Router();

router
  .route("/")
  .get(weaponController.getAllWeapons) // http://localhost:3000/weapon
  .post(weaponController.createWeapon); // http://localhost:3000/weapon
router
  .route("/:id")
  .get(weaponController.getWeapon) // http://localhost:3000/weapon/1
  .patch(weaponController.updateWeapon) // http://localhost:3000/weapon/1
  .delete(weaponController.deleteWeapon); // http://localhost:3000/weapon/1

// updateStatusUsedByIdWeapon
// http://localhost:3000/weapon/1/updateStatusUsed
router.patch(
  "/:id/updateStatusUsed",
  weaponController.updateStatusUsedByIdWeapon
);

// get id_weapon dựa vào id_user 
// http://localhost:3000/weapon/1/getIdWeaponByIdUser
router.get("/:id/getIdWeaponByIdUser", weaponController.getIdWeaponByIdUser);

module.exports = router;
